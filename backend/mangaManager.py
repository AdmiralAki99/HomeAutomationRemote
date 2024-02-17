import requests
import dotenv
import os
from datetime import datetime
import json

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

    manga_keys = ['id','title','altTitles','description','publicationDemographic','status','tags','coverArt','artist','author']

    __url__ = {
        'base_url':'https://api.mangadex.org',
        'auth_url':'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',

    }

    def __init__(self) -> None:
        dotenv.load_dotenv()

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
            return "Authenticated"
        else:
            return resp.text
        

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
            return "Token Refreshed"
        else:
            return resp.text
        
    def search(self,title:str):
        if self.verify_token() == False:
            self.authenticate()
        headers = self.get_headers()

        query = {
            'title':title
        }

        resp = requests.get(f'{self.__url__["base_url"]}/manga',params=query,headers=headers)

        # if resp.status_code == 200:
        #     for values in resp.json()['data']:
        #        # Check if all keys exist in manga_keys
               

        

if __name__ == "__main__":
    m = MangaManager()
    print(m.authenticate())
    print(m.search("one piece"))