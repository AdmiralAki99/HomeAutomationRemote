import requests
import dotenv
import os



class MangaManager:

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
            return resp.json()
        else:
            return resp.text
        

if __name__ == "__main__":
    m = MangaManager()
    print(m.authenticate())

