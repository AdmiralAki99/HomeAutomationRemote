import spotipy
from spotipy import SpotifyOAuth
import json
import time
from dotenv import load_dotenv
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


import requests
import base64

class SpotifyAPI:

    client_id = None
    client_secret_id = None
    redirect_uri = None
    access_token = None
    expiry_time = None
    __url__ = {
        'token_url': 'https://accounts.spotify.com/api/token',
        'base_url': 'https://api.spotify.com/v1/',
        'auth_url': 'https://accounts.spotify.com/authorize?'
    }
    __scopes__ = {
        'scope': "user-read-playback-state user-modify-playback-state user-read-playback-state user-read-private"
    }

    def __init__(self):
        super(SpotifyAPI).__init__()
        load_dotenv()
        # Loading enviornment variables for Spotify Manager
        self.client_id = os.getenv('SPOTIFY_CLIENT_ID')
        self.client_secret_id = os.getenv('SPOTIFY_CLIENT_SECRET_ID')
        self.redirect_uri = os.getenv('SPOTIFY_REDIRECT_URI')

    def get_access_token(self):

        client_credentials_auth = self.client_id + ':' + self.client_secret_id
        client_credentials_auth = client_credentials_auth.encode('utf-8')
        client_credentials_auth = base64.b64encode(client_credentials_auth)
        client_credentials_auth = str(client_credentials_auth,'utf-8')

        response = requests.post(self.__url__['token_url'],data={
            'grant_type': 'client_credentials',
        },headers={
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': f'Basic {client_credentials_auth}',
        })

        if response.status_code == 200:
            self.access_token = response.json()['access_token']
            self.expiry_time = time.time() + response.json()['expires_in']
            return self.access_token
        else:
            return None
        
    def __get_auth_header__(self,token):
        return {
            'Authorization': f'Bearer {token}'
        }
    
    def __add_scopes__(self):
        query = {
            'client_id': self.client_id,
            'response_type': 'code',
            'redirect_uri': self.redirect_uri,
            'scope': self.__scopes__['scope']
        }
        req_url = self.__url__['auth_url'] + '&'.join([f'{key}={value}' for key,value in query.items()])
        response = requests.get(req_url)

    def get_current_playback(self):
        header = self.__get_auth_header__(token=self.access_token)
        player_url = self.__url__['base_url'] + 'me/player'

        response = requests.get(player_url,headers=header)

        print(response.json())


if __name__ == "__main__":
    # SPOTIFY API TESTS
    spotify = SpotifyAPI()
    spotify.get_access_token()
    spotify.__add_scopes__()
    spotify.get_current_playback()

        

