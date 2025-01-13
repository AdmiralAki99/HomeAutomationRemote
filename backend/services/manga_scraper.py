import requests
import json
import dotenv

class MangaScraper:
    
    BASE_URL = "https://api.mangadex.org"
    AUTH_URL = "https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token"
    
    def __init__(self):
        self.__load_token()
        
    def __load_token(self):
        dotenv.load_dotenv()
        self.__API_TOKEN
        
    def __get_headers(self):
        return {
            'Content-Type':'application/x-www-form-urlencoded'
        }
        
    def __authenticate(self):
        headers = self.__get_headers()
        
        