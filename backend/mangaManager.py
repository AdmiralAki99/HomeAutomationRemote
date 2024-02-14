import requests
import dotenv
import os



class MangaManager:

    access_token = None
    refresh_token = None
    expires_in = None
    refresh_expires_in = None

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
            self.access_token = resp.json()['access_token']
            self.refresh_token = resp.json()['refresh_token']
            self.expires_in = resp.json()['expires_in']
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
            self.expires_in = resp.json()['expires_in']
            self.refresh_expires_in = resp.json()['refresh_expires_in']
            return "Token Refreshed"
        else:
            return resp.text

        

if __name__ == "__main__":
    m = MangaManager()
    print(m.authenticate())
    print(m.token_refresh())

