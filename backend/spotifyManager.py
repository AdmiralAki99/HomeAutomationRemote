import spotipy
from spotipy import SpotifyOAuth
import json
import time
from dotenv import load_dotenv
import os

class SpotifyManager():

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
        self.refresh_token()


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

    def refresh_token(self):
      self.auth.refresh_access_token(self.token_dict['refresh_token'])
      self.token_dict = self.auth.get_access_token()
      self.access_token = self.token_dict['access_token']
