import spotipy
from spotipy import SpotifyOAuth
import json
from dotenv import load_dotenv
import os

class SpotifyManager():

    scope = "user-read-playback-state,user-modify-playback-state,user-read-playback-state,user-read-private,user-read-email,user-top-read"

    def __init__(self):
        super(SpotifyManager).__init__()
        load_dotenv()

        self.client_id = os.getenv('SPOTIFY_CLIENT_ID')
        self.client_secret_id = os.getenv('SPOTIFY_CLIENT_SECRET_ID')
        self.redirect_uri = os.getenv('SPOTIFY_REDIRECT_URI')

        self.auth = SpotifyOAuth(self.client_id,self.client_secret_id,self.redirect_uri,scope=self.scope)
        self.token_dict = self.auth.get_access_token()
        self.access_token = self.token_dict['access_token']

        self.sp = spotipy.Spotify(auth=self.access_token)
        self.user = self.sp.current_user()

        print(json.dumps(self.user,sort_keys=True, indent=4))

    def play_song(self, song_uri):
        self.sp.start_playback(uris=[song_uri])

    def get_current_playback(self):
        return self.sp.current_user_playing_track()
    
    def pause_song(self):
        self.sp.pause_playback()

    def resume_song(self):
        self.sp.start_playback()

    def skip_song(self):
        self.sp.next_track()
    
    def rewind_song(self):
        self.sp.previous_track()