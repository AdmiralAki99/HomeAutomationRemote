import requests
import dotenv
import os
import io
from datetime import datetime
from urllib.request import urlretrieve
from base64 import encodebytes
from PIL import Image
import random

class Manga:

    def __init__(self) -> None:
        pass

    def __init__(self,id,title,alt_title,description,publication_demographic,status,tags,cover_art,artist,author) -> None:
        self.id = id
        self.title = title
        self.alt_title = alt_title
        self.description = description
        self.publication_demographic = publication_demographic
        self.status = status
        self.tags = tags
        self.cover_art = cover_art
        self.artist = artist
        self.author = author

    def __str__(self) -> str:
        return f"Title: {self.title}\nAlt Title: {self.alt_title}\nDescription: {self.description}\nPublication Demographic: {self.publication_demographic}\nStatus: {self.status}\nTags: {self.tags}\nCover Art: {self.cover_art}\nArtist: {self.artist}\nAuthor: {self.author}"

class MangaManager:

    access_token = None
    refresh_token = None
    expires_in = None
    refresh_expires_in = None
    local_manga_limit = 20

    creation_directory = {}
    access_directory = {}

    manga_keys = ['id','title','altTitles','description','publicationDemographic','status','tags','coverArt','artist','author']

    __url__ = {
        'base_url':'https://api.mangadex.org',
        'auth_url':'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',
        'cover_url':'https://uploads.mangadex.org/'
    }

    DIRECTORY_LIMIT = 10

    __path__ = {
        'manga_path':'./backend/mangadex'
    }

    def __init__(self) -> None:
        dotenv.load_dotenv()
        self.authenticate()

    def get_headers(self) -> dict:
        return {
            'Content-Type':'application/x-www-form-urlencoded',
        }
    
    def verify_token(self) -> bool:
        if self.expires_in > datetime.now().timestamp():
            return True
        else:
            return False

    def authenticate(self) -> str:

        headers = self.get_headers()
        
        query = {
            'grant_type':'password',
            'username': os.getenv('MANGADEX_API_USERNAME'),
            'password': os.getenv('MANGADEX_API_PASSWORD'),
            'client_id': os.getenv('MANGADEX_API_PERSONAL_ClIENT_ID'),
            'client_secret': os.getenv('MANGADEX_API_PERSONAL_SECRET')
        }

        resp = requests.post(self.__url__['auth_url'], data=query,headers=headers)

        if resp.status_code == 200:
            self.access_token = resp.json()['access_token']
            self.refresh_token = resp.json()['refresh_token']
            self.expires_in = datetime.now().timestamp() + resp.json()['expires_in']
            self.refresh_expires_in = resp.json()['refresh_expires_in']
            return {"Message":"Authenticated"}
        else:
            return {"Error":resp.text}
        

    def token_refresh(self) -> str:
        headers = self.get_headers()

        query = {
            'grant_type':'refresh_token',
            'refresh_token': self.refresh_token,
            'client_id': os.getenv('MANGADEX_API_PERSONAL_ClIENT_ID'),
            'client_secret': os.getenv('MANGADEX_API_PERSONAL_SECRET')
        }

        resp = requests.post(self.__url__['auth_url'], data=query,headers=headers)

        if resp.status_code == 200:
            self.access_token = resp.json()['access_token']
            self.refresh_token = resp.json()['refresh_token']
            self.expires_in = datetime.now().timestamp() + resp.json()['expires_in']
            self.refresh_expires_in = resp.json()['refresh_expires_in']
            return {"Message":"Token Refreshed"}
        else:
            return {"Error":resp.text}
        
    def get_storage_length(self) -> int:
        if not os.path.exists(self.__path__['manga_path']):
            os.makedirs(self.__path__['manga_path'])
            return 0
        else:
            ## Path exists
            return len(os.listdir(self.__path__['manga_path']))
        

    def create_directory(self,manga_id:str) -> str:
        if not os.path.exists(f'{self.__path__["manga_path"]}/{manga_id}'):
            time = datetime.now().strftime(f"%Y-%m-%d")
            os.makedirs(f'{self.__path__["manga_path"]}/{manga_id}')
            self.creation_directory[manga_id] = time
            return {"Message":"Directory Created"}
        else:
            return {"Error":"Directory Exists"}
    
    def delete_directory(self,manga_id:str) -> str:
        if os.path.exists(f'{self.__path__["manga_path"]}/{manga_id}'):
            os.rmdir(f'{self.__path__["manga_path"]}/{manga_id}')
            return {"Message":"Directory Deleted"}
        else:
            return {"Error":"Directory Does Not Exist"}
        
    def delete_oldest_directory(self) -> str:
        oldest_dir = min(self.creation_directory,key=self.creation_directory.get)
        self.update_local_directory_dict(oldest_dir)
        os.rmdir(f'{self.__path__["manga_path"]}/{oldest_dir}')
        return {"Message":"Oldest Directory Deleted"}
    
    def update_local_directory_dict(self,manga_id:str) -> None:
        del self.creation_directory[manga_id]

    def update_direcotry(self,manga_id:str) -> str:
        if manga_id in self.creation_directory.keys():
            self.access_directory[manga_id] = datetime.now().strftime(f"%Y-%m-%d")
            return {"Message":"Directory Updated"}
        else:
            return {"Error":"Directory Does Not Exist"}
        
    def validate_if_directory_exists(self,manga_id:str,chapter_id:str) -> bool:
        if os.path.exists(f'{self.__path__["manga_path"]}/{manga_id}/{chapter_id}'):
            return True
        else:
            return False
        
    def search(self,title:str,limit:int = 10):
        if self.verify_token() == False:
            self.authenticate()
        headers = self.get_headers()

        query = {
            'title':title,
            'limit':limit,
        }
        manga_list = []
        resp = requests.get(f'{self.__url__["base_url"]}/manga',params=query,headers=headers)

        try:
            for manga in resp.json()['data']:
                if 'en' not in manga['attributes']['title'].keys():
                    continue
                else:
                     manga_list.append({
                    'id': manga['id'],
                    'title': manga['attributes']['title']['en'],
                    'altTitles': manga['attributes']['altTitles'],
                    'description': manga['attributes']['description'] if 'en' in manga['attributes']['description'].keys() else 'None',
                    'publicationDemographic': manga['attributes']['publicationDemographic'],
                    'status': manga['attributes']['status'],
                    'tags': manga['attributes']['tags'],
                    'coverArt': f"{self.__url__['cover_url']}covers/{manga['id']}/{self.get_cover_art(manga['relationships'][2]['id'])}",
                    'artist': manga['relationships'][1]['id'],
                    'author': manga['relationships'][0]['id'],
                })
            return manga_list
        except NameError as e:
            print("NameError: ",e)
            return {"error":f"NameError: {e}"}
        
    def search_with_tags(self,included:list,excluded:list,limit:int = 10):
        if self.verify_token() == False:
            self.authenticate()
        headers = self.get_headers()

        query = {
            'includedTags[]':included,
            'excludedTags[]':excluded,
            'limit':limit,
        }

        manga_list = []
        resp = requests.get(f'{self.__url__["base_url"]}/manga',params=query,headers=headers)

        try:
            for manga in resp.json()['data']:
                if 'en' not in manga['attributes']['title'].keys():
                    continue
                else:
                    manga_list.append({
                    'id': manga['id'],
                    'title': manga['attributes']['title']['en'],
                    'altTitles': manga['attributes']['altTitles'],
                    'description': manga['attributes']['description'] if 'en' in manga['attributes']['description'].keys() else 'None',
                    'publicationDemographic': manga['attributes']['publicationDemographic'],
                    'status': manga['attributes']['status'],
                    'tags': manga['attributes']['tags'],
                    'coverArt': f"{self.__url__['cover_url']}covers/{manga['id']}/{self.get_cover_art(manga['relationships'][2]['id'])}",
                    'artist': manga['relationships'][1]['id'],
                    'author': manga['relationships'][0]['id'],
                })
            return manga_list
        except NameError as e:
            print("NameError: ",e)
            return {"error":f"NameError: {e}"}
    
    def get_manga_chapters(self,manga_id):

        if self.verify_token() == False:
            self.authenticate()

        chapters = []

        headers = self.get_headers()

        query = {
            'translatedLanguage[]':['en']
        }

        resp = requests.get(f'{self.__url__["base_url"]}/manga/{manga_id}/feed',headers=headers,params=query)

        for chapter in resp.json()['data']:
            chapters.append({
                'id': chapter['id'],
                'volume': chapter['attributes']['volume'],
                'chapter': chapter['attributes']['chapter'],
                'title': chapter['attributes']['title'],
                'translatedLanguage': chapter['attributes']['translatedLanguage'],
                'externalUrl': chapter['attributes']['externalUrl'] if chapter['attributes']['externalUrl'] != None else 'None',
                'publishAt': chapter['attributes']['publishAt'],
                'readableAt': chapter['attributes']['readableAt'],
                'createdAt': chapter['attributes']['createdAt'],
                'updatedAt': chapter['attributes']['updatedAt'],
                'pages': chapter['attributes']['pages'],
                'version': chapter['attributes']['version']
            })

        return chapters
    
    def get_tag_ids(self,categories:list):

        if self.verify_token() == False:
            self.authenticate()

        headers = self.get_headers()

        resp = requests.get(f'{self.__url__["base_url"]}/manga/tag',headers=headers)
            
        tag_ids = []
        for tag in resp.json()['data']:
            if tag['attributes']['name']['en'] in categories:
                tag_ids.append(tag['id'])
        return tag_ids
    
    def get_random_tags(self):
        if self.verify_token() == False:
            self.authenticate()

        headers = self.get_headers()

        resp = requests.get(f'{self.__url__["base_url"]}/manga/tag',headers=headers)

        return random.sample([(tag['attributes']['name']['en'],tag['id']) for tag in resp.json()['data']],random.randint(1,2))



    def get_cover_art(self,cover_art_id):

        if self.verify_token() == False:
            self.authenticate()

        headers = self.get_headers()

        resp = requests.get(f'{self.__url__["base_url"]}/cover/{cover_art_id}',headers=headers)
        if resp.status_code == 200:
            if 'data' in resp.json().keys():
                if 'attributes' in resp.json()['data'].keys():
                    if 'fileName' in resp.json()['data']['attributes'].keys():
                        return resp.json()['data']['attributes']['fileName']
                    else:
                       ...
                else:
                   ...
            else:
                ...

    def encode_image(self,image_path):
        img = Image.open(image_path,mode='r')
        img_byte = io.BytesIO()
        img.save(img_byte,format='PNG')
        encoded_img = encodebytes(img_byte.getvalue()).decode('ascii')
        return encoded_img
    
    def validate_chapter_page(self,manga_id,chapter_id,page_number):
        if os.path.exists(f'./backend/mangadex/{manga_id}/{chapter_id}'):
            list_of_images = os.listdir(f'./backend/mangadex/{manga_id}/{chapter_id}')
            if f'page{page_number}.png' in list_of_images:
                return True
            else:
                return False

    def get_chapter_images(self,manga_id,chapter_id):
        if os.path.exists(f'./backend/mangadex/{manga_id}/{chapter_id}'):
            list_of_images = os.listdir(f'./backend/mangadex/{manga_id}/{chapter_id}')
            encoded_images = []
            for paths in list_of_images:
                encoded_images.append(self.encode_image(f'./backend/mangadex/{manga_id}/{chapter_id}/{paths}'))

            return {"encoded_images":encoded_images}
        else:
            return {"Error":"Chapter not downloaded"}

    def download_chapter(self,manga_id,chapter_id):
        
        if self.verify_token() == False:
            self.authenticate()

        headers = self.get_headers()

        resp = requests.get(f'{self.__url__["base_url"]}/at-home/server/{chapter_id}', headers=headers)

        chapter_info = {
            'host': resp.json()['baseUrl'],
            'hash': resp.json()['chapter']['hash'],
            'data': resp.json()['chapter']['data']
        }

        data = chapter_info['data']

        # Create directories if they don't exist
        base_path = f'./backend/mangadex/{manga_id}/{chapter_id}'
        if not os.path.exists(base_path):
            os.makedirs(base_path)

        # Download each page of the chapter
        for i, page in enumerate(data):
            page_url = f"{chapter_info['host']}/data/{chapter_info['hash']}/{page}"
            page_path = os.path.join(base_path, f'page{i}.png')

            # Download and save the page content to a file
            with open(page_path, 'wb') as page_file:
                page_resp = requests.get(page_url)
                page_file.write(page_resp.content)

        return {"Message": "Chapter Downloaded"}
        

if __name__ == "__main__":
    m = MangaManager()
    print(m.authenticate())
    # print(m.search("Campfire"))
    # print(m.get_manga_chapters("8352a9ca-22e0-4a1c-bf1f-89f23d95262a"))
    print(m.download_chapter("8352a9ca-22e0-4a1c-bf1f-89f23d95262a","2e0180cc-b4d7-426b-b473-c242fca65f24"))
    # print(m.get_cover_art("ca70ba28-8493-4c4b-bcbe-ea8e0ffc0833"))
    # print(m.search("Tempest Tyrant")[0]['coverArt'])
    # print(m.search(included=['391b0423-d847-456f-aff0-8b0cfc03066b', 'b9af3a63-f058-46de-a9a0-e0c13906197a'],excluded=[]))
    # print(m.get_chapter_images("0df86784-961a-443c-9765-8b41702c6249","50b998be-3516-4b5d-89a7-792200af7ca2"))
    # print(m.validate_chapter_page("0df86784-961a-443c-9765-8b41702c6249","50b998be-3516-4b5d-89a7-792200af7ca2","0"))

