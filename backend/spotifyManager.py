import spotipy
from spotipy import SpotifyOAuth
import requests
import datetime
# import json
# import time
from dotenv import load_dotenv
import urllib.parse
import base64
# import webbrowser
import os

class SpotifyManager:

    # Spotify Scopes
    scope = "user-read-playback-state,user-modify-playback-state,user-read-playback-state,user-read-private,user-read-email,user-top-read"

    def __init__(self):
        super(SpotifyManager).__init__()
        # Load environment variables
        load_dotenv()

        # Loading enviornment variables for Spotify Manager
        self.client_id = os.getenv('SPOTIFY_CLIENT_ID')
        self.client_secret_id = os.getenv('SPOTIFY_CLIENT_SECRET_ID')
        self.redirect_uri = os.getenv('SPOTIFY_REDIRECT_URI')

        # Creating Spotify OAuth object
        self.auth = SpotifyOAuth(self.client_id,self.client_secret_id,self.redirect_uri,scope=self.scope)
        self.token_dict = self.auth.get_access_token()
        self.access_token = self.token_dict['access_token'] # Keeping a copy of the token for easier access
        # Creating and storing object for later use
        self.sp = spotipy.Spotify(auth=self.access_token)
        self.user = self.sp.current_user()

    # def __init__(self,cache_handler):
    #     super(SpotifyManager).__init__()

    #     load_dotenv()

    #     self.client_id = os.getenv('SPOTIFY_CLIENT_ID')
    #     self.client_secret_id = os.getenv('SPOTIFY_CLIENT_SECRET_ID')
    #     self.redirect_uri = os.getenv('SPOTIFY_REDIRECT_URI')

    #     self.auth = SpotifyOAuth(self.client_id,self.client_secret_id,self.redirect_uri,scope=self.scope,cache_handler=cache_handler)
    #     self.token_dict = self.auth.get_access_token()
    #     self.access_token = self.token_dict['access_token']

    #     self.sp = spotipy.Spotify(auth_manager=self.auth)

    
    # def __init__(self,auth_manager):
    #     super(SpotifyManager).__init__()

    #     load_dotenv()

    #     self.client_id = os.getenv('SPOTIFY_CLIENT_ID')
    #     self.client_secret_id = os.getenv('SPOTIFY_CLIENT_SECRET_ID')
    #     self.redirect_uri = os.getenv('SPOTIFY_REDIRECT_URI')

    #     self.sp = spotipy.Spotify(auth_manager=auth_manager)


    def play_song(self, song_uri):
        """
        Plays Song on Spotify Device

        Args:
            song_uri (_type_): Song URI to be played
        """
        self.sp.start_playback(uris=[song_uri])

    def get_current_playback(self):
        """
        Gets the current playback of the user

        Returns:
            _type_: Playback Info of current device
        """
        return self.sp.current_user_playing_track()
    
    def get_current_playback_device(self):
        """
        Gets the current playback device of the user

        Returns:
            _type_: Playback Info of current device
        """
        return self.sp.current_playback()
    
    def get_current_song(self):
        playback = self.get_current_playback()
        device = self.get_current_playback_device()

        if playback is None:
            return {'message': 'No Song Playing'}

        details = {"album":{
            "album_type": playback['item']['album']['album_type'],
            "artists": playback['item']['album']['artists'],
            "external_urls": playback['item']['album']['external_urls'],
            "href": playback['item']['album']['href'],
            "id": playback['item']['album']['id'],
            "images": playback['item']['album']['images'],
            "name": playback['item']['album']['name'],
        },
        "artists":{
            "external_urls": playback['item']['artists'][0]['external_urls'],
            "name": playback['item']['artists'][0]['name'],
        },
        "device":{
            "id": device['device']['id'],
            "is_playing": device['is_playing'],
            "name": device['device']['name'],
            'type': device['device']['type'],
            "volume_percent": device['device']['volume_percent'],
        },
        "duration_ms": playback['item']['duration_ms'],
        "explicit": playback['item']['explicit'],
        "external_urls": playback['item']['external_urls'],
        "name": playback['item']['name'],
        }
        return details
        
    
    def pause_song(self)-> None:
        """
        Pause Currently Playing Song
        """
        self.sp.pause_playback()

    def resume_song(self):
        """
        Resume Currently Paused Song        
        """
        self.sp.start_playback()

    def skip_song(self):
        """
        Skip Current Song
        """
        self.sp.next_track()
    
    def rewind_song(self):
        """
        Rewind Current Song
        """
        self.sp.previous_track()

    def set_cache_handler(self,cache_handler):
        self.sp.cache_handler = cache_handler

    def get_cache_handler(self):
        return self.sp.cache_handler
    
    def set_auth(self,auth):
        self.auth = auth

    def get_auth(self):
        return self.auth
    
    def set_new_manager(self):
        self.sp = spotipy.Spotify(auth_manager=self.auth)
    


    # def refresh_token(self):
    #   print("Refreshing Token")
    #   self.auth.refresh_access_token(self.token_dict['refresh_token'])
    #   self.token_dict = self.auth.get_access_token()
    #   self.access_token = self.token_dict['access_token']

class SpotifyAPI:

    client_id = None
    client_secret_id = None
    redirect_uri = None
    access_token = None
    expiry_time = None
    refresh_token = None
    auth_code = None
    __is_logged_in__ = False

    __url__ = {
        'token_url': 'https://accounts.spotify.com/api/token',
        'base_url': 'https://api.spotify.com/v1/',
        'auth_url': 'https://accounts.spotify.com/authorize'
    }
    __scopes__ = ['user-read-playback-state','user-modify-playback-state','user-read-private','user-read-email','user-top-read']

    def __init__(self):
        super(SpotifyAPI).__init__()
        load_dotenv()
        # Loading enviornment variables for Spotify Manager
        self.client_id = os.getenv('SPOTIFY_CLIENT_ID')
        self.client_secret_id = os.getenv('SPOTIFY_CLIENT_SECRET_ID')
        self.redirect_uri = os.getenv('SPOTIFY_REDIRECT_URI')

    def get_auth_url(self):

        scopes = '%20'.join(self.__scopes__)

        auth_request= f'{self.__url__["auth_url"]}?client_id={self.client_id}&redirect_uri={self.redirect_uri}&response_type=code&scope={scopes}'

        return auth_request

    def __get_auth_header__(self,token):
        return {
            'Authorization': f'Bearer {token}'
        }
    
    def __get_login_header__(self):
        client_credentials_auth = self.client_id + ':' + self.client_secret_id
        client_credentials_auth = client_credentials_auth.encode('utf-8')
        client_credentials_auth = base64.b64encode(client_credentials_auth)
        client_credentials_auth = str(client_credentials_auth,'utf-8')

        return {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': f'Basic {client_credentials_auth}'
        }
    
    def login(self):
        # Auth Code is already is set
        if self.auth_code is None:
            return {'message': 'No Auth Code Set'}
        
        # Get Access Token
        query = {
            'code' :self.auth_code,
            'redirect_uri': self.redirect_uri,
            'grant_type': 'authorization_code',
        }

        header = self.__get_login_header__()

        resp = requests.post(self.__url__['token_url'],data=query,headers=header)

        # Save Token Info and Expiry time

        self.access_token = resp.json()['access_token']
        self.expiry_time = datetime.datetime.now().timestamp() + resp.json()['expires_in']
        self.refresh_token = resp.json()['refresh_token']
        self.__is_logged_in__ = True

    def set_auth_code(self,auth_code):
        self.auth_code = auth_code
    
    # def __add_scopes__(self):
    #     query = {
    #         'client_id': self.client_id,
    #         'response_type': 'code',
    #         'redirect_uri': self.redirect_uri,
    #         'scope': self.__scopes__['scope']
    #     }
        
    def get_current_playback_device(self):
        header = self.__get_auth_header__(token=self.access_token)
        player_url = self.__url__['base_url'] + 'me/player'

        response = requests.get(player_url,headers=header)

        return response.json()

    def get_current_playback(self):
        header = self.__get_auth_header__(token=self.access_token)
        player_url = self.__url__['base_url'] + 'me/player/currently-playing'

        response = requests.get(player_url,headers=header)

        playback = response.json()

        details = {"album":{
            "album_type": playback['item']['album']['album_type'],
            "artists": playback['item']['album']['artists'],
            "external_urls": playback['item']['album']['external_urls'],
            "href": playback['item']['album']['href'],
            "id": playback['item']['album']['id'],
            "images": playback['item']['album']['images'],
            "name": playback['item']['album']['name'],
        },
        "artists":{
            "external_urls": playback['item']['artists'][0]['external_urls'],
            "name": playback['item']['artists'][0]['name'],
        },
        "device":{
            "id": playback['device']['id'],
            "is_playing": playback['is_active'],
            "name": playback['device']['name'],
            'type': playback['device']['type'],
            "volume_percent": playback['device']['volume_percent'],
        },
        "duration_ms": playback['item']['duration_ms'],
        "explicit": playback['item']['explicit'],
        "external_urls": playback['item']['external_urls'],
        "name": playback['item']['name'],
        }

        return details

    def is_user_logged_in(self):
        return self.__is_logged_in__

    def play_song(self, song_uri):
        header = self.__get_auth_header__(token=self.access_token)
        player_url = self.__url__['base_url'] + 'me/player/play'

        response = requests.put(player_url,headers=header,json={
            'uris': [song_uri]
        })

        print(response.json())

    def pause_song(self):
        header = self.__get_auth_header__(token=self.access_token)
        player_url = self.__url__['base_url'] + 'me/player/pause'

        response = requests.put(player_url,headers=header)

        print(response.json())

    def skip_to_next(self):
        header = self.__get_auth_header__(token=self.access_token)
        player_url = self.__url__['base_url'] + 'me/player/next'

        response = requests.post(player_url,headers=header)

        print(response.json())

    def refresh_token(self):

        client_credentials_auth = self.client_id + ':' + self.client_secret_id
        client_credentials_auth = client_credentials_auth.encode('utf-8')
        client_credentials_auth = base64.b64encode(client_credentials_auth)
        client_credentials_auth = str(client_credentials_auth,'utf-8')

        response = requests.post(self.__url__['token_url'],data={
            'grant_type': 'refresh_token',
            'refresh_token': self.access_token
        },headers={
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': f'Basic {client_credentials_auth}',
        })

        print(response.json())

if __name__ == "__main__":
    # SPOTIFY API TESTS
    spotify = SpotifyAPI()
    print(spotify.get_auth_url())

#     from flask import Flask, request

#     app = Flask(__name__)

#     @app.route('/callback')
#     def callback():
#         authorization_code = request.args.get('code')
#         # Handle the authorization code as needed
#         return f'Authorization Code: {authorization_code}'

#     app.run(port=5000)



# from flask import Flask, redirect, request
# import dotenv
# import os

# dotenv.load_dotenv()

# app = Flask(__name__)

# # Spotify API credentials
# CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
# CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET_ID')
# REDIRECT_URI = os.getenv('SPOTIFY_REDIRECT_URI')
# SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize'
# SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'

# @app.route('/')
# def login():
#     # Redirect the user to Spotify's authorization page
#     authorize_url = f'{SPOTIFY_AUTHORIZE_URL}?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&response_type=code&scope=user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state&show_dialog=true'
#     return redirect(authorize_url)

# @app.route("/spotify/callback/")
# def callback():

#     print("Query: "+request.args.get('code'))

#     return {'message': 'Success'}


# if __name__ == '__main__':
#     app.run(port=5000,debug=True)


        

