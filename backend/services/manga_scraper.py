import requests
import json
import time
import os
import threading
import base64
import dotenv

class MangaScraper:
    
    __BASE_URL = "https://api.mangadex.org"
    __AUTH_URL = "https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token"
    __COVER_ART_URL = "https://uploads.mangadex.org/covers"
    __AT_HOME_URL = "https://api.mangadex.org/at-home/server"
    __IMAGE_URL = "https://uploads.mangadex.org/data"
    
    __EXCLUDED_TAG_IDS = ['b13b2a48-c720-44a9-9c77-39c9979373fb']
    __RELATIONSHIP_INCLUDES = ['manga','author','artist','cover_art']
    
    def __init__(self):
        self.__load_token()
        
    def __load_token(self):
        dotenv.load_dotenv()
        self.__API_TOKEN = os.getenv('MANGADEX_PERSONAL_CLIENT_SECRET')
        
    def __get_headers(self):
        return {
            'Content-Type':'application/x-www-form-urlencoded'
        }
        
    def __authenticate(self):
        headers = self.__get_headers()
        
        
    async def search_manga(self,title,**kwargs):
        # Search for manga by title
        
        start_time = time.time()
        
        url = f'{self.__BASE_URL}/manga'
        # Parameters for the search
        params = {
            'title':title,
            "excludedTags[]":self.__EXCLUDED_TAG_IDS,
            "excludedTagsMode":"AND",
            "includes[]":self.__RELATIONSHIP_INCLUDES, 
            "limit":10
        }
        
        response = requests.get(url,params=params,headers=self.__get_headers())
        
        if response.status_code == 200:
            threads = []
            mangas = []
            for manga in response.json()['data']:
                thread = threading.Thread(target=self.__parse_manga_info,args=(manga,mangas))
                threads.append(thread)
                thread.start()
                
            for t in threads:
                t.join()
                
            print(f"Time taken: {time.time()-start_time}")
            return mangas
        
        return None
    
    def __parse_manga_info(self,response,mangas : list):
        # Parse the manga information from the response
        tags = []
        id = response['id']
        type = response['type']
        title = response['attributes']['title']['en']
        alt_titles = self.__parse_manga_alt_titles(response['attributes']['altTitles'])
        description = self.__parse_manga_descriptions(response['attributes']['description'])
        status = response['attributes']['status']
        year = response['attributes']['year']
        publicationDemographic = response['attributes']['publicationDemographic']
        tags = self.__parse_manga_tags(response['attributes']['tags'])    
        relationships = self.__parse_manga_relationships(response['relationships'])
        cover_art = self.__get_cover_art(id,relationships['cover_art'])
        
        
        mangas.append({
            'id':id,
            'type':type,
            'title':title,
            'alt_titles':alt_titles,
            'description':description,
            'status':status,
            'year':year,
            'publicationDemographic':publicationDemographic,
            'tags':tags,
            'relationships':relationships,
            'cover_art':cover_art
        })
        
    def __parse_manga_tags(self,tags_response):
        # Parse the tags of the manga
        tags = []
        for tag in tags_response:
            tags.append({
                'id':tag['id'],
                'name':tag['attributes']['name']['en']
            })
            
        return tags
        
    def __parse_manga_descriptions(self,description):
        # Parse the description of the manga
        # Check if the en is a key in the dictionary
        if description is None or 'en' not in description:
            return None
        
        return description['en']
    
    def __parse_manga_alt_titles(self,alt_titles):
        # Parse the alternative titles of the manga
        # Parsing the alternative titles to keep very selective amount of alternate titles
        # Keeping the japanese
        for alt_title in alt_titles:
            if "ja" in alt_title:
                return {
                    'ja':alt_title['ja']
                }
                
    def __parse_manga_relationships(self,relationships):
        # Parse the relationships of the manga
        relationship_dict = {}
        for relationship in relationships:
            if relationship['type'] == 'author':
                relationship_dict['author'] = relationship['attributes']['name']
                
            if relationship['type'] == 'artist':
                relationship_dict['artist'] = relationship['attributes']['name']
                
            if relationship['type'] == 'cover_art':
                relationship_dict['cover_art'] = relationship['attributes']['fileName']
                
        return relationship_dict
    
    def __get_cover_art(self,manga_id,cover_art_file,image_size=512):
        # Get the cover art of the manga
        url = f'{self.__COVER_ART_URL}/{manga_id}/{cover_art_file}.{image_size}.jpg'
        response = requests.get(url,headers=self.__get_headers(),stream=True)

        if response.status_code == 200:
            return base64.b64encode(response.content).decode('utf-8')
        
        return None
    
    def get_chapter_list(self,manga_id):
        start_time = time.time()
        url = f'{self.__BASE_URL}/manga/{manga_id}/feed'
        
        params = {
            "contentRating[]": ["safe"],
            "order[chapter]":"desc",
        }
        
        response = requests.get(url,params=params,headers=self.__get_headers())
        
        if response.status_code == 200:
            chapters = []
            for chapter in response.json()['data']:
                chapters.append(self.__parse_chapter_info(chapter))
                
            print(f"Time taken: {time.time()-start_time}")
            return chapters
        
        return None
    
    def __parse_chapter_info(self,chapter):
        # Parse the chapter information
        return {
            "id": chapter['id'],
            "volume": chapter['attributes']['volume'],
            "chapter": chapter['attributes']['chapter'],
            "title": "" if chapter['attributes']['title'] is None else chapter['attributes']['title'],
            "translatedLanguage": "" if chapter['attributes']['translatedLanguage'] is None else chapter['attributes']['translatedLanguage'],
            "publishedDate": chapter['attributes']['publishAt'],
            "pageCount": chapter['attributes']['pages']
        }
        
    async def get_chapter_pages(self,chapter_id,data_saver=False):
        # Get the pages of the chapter
        start_time = time.time()
        
        url = f'{self.__AT_HOME_URL}/{chapter_id}'
        
        response = requests.get(url,headers=self.__get_headers())
        
        if response.status_code == 200:
            
            hash_id = response.json()['chapter']['hash']
            if data_saver:
                images = response.json()['chapter']['dataSaver']
            else:
                images = response.json()['chapter']['data']
                
            pages = []
            threads = []
            for image in images:
                thread = threading.Thread(target=self.__parse_chapter_pages,args=(hash_id,image,pages))
                threads.append(thread)
                thread.start()
                
            for t in threads:
                t.join()
                
            print(f"Time taken: {time.time()-start_time}")
            return pages
        
        return None
    
    def __parse_chapter_pages(self,hash_id,page_link,pages: list):
        # Parse the chapter pages
        url = f'{self.__IMAGE_URL}/{hash_id}/{page_link}'
        
        response = requests.get(url,headers=self.__get_headers())
        
        if response.status_code == 200:
            pages.append(base64.b64encode(response.content).decode('utf-8'))
        
        return None
            
            
        
    
if __name__ == '__main__':
    ms = MangaScraper()
    # print(json.dumps(ms.search_manga('one piece'),indent=4))
    # print(ms.search_manga('Giant Killing'))
    # print(ms.get_chapter_list('3b6c3a0b-8752-41fc-9d3e-1310f6f28252'))
    print(ms.get_chapter_pages('192996e2-ddc5-4802-8a34-c206820e3a32'))
        
        