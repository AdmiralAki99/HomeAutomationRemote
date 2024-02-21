import requests
import dotenv
import os
from datetime import datetime
from urllib.request import urlretrieve
import json

class MBTA_MANAGER:

    api_key = None
    base_url = None

    def __init__(self) -> None:
        dotenv.load_dotenv()
        self.api_key = os.getenv('MBTA_API_KEY')
        self.base_url = 'https://api-v3.mbta.com'

    def get_routes(self) -> str:
        pass

    def get_schedule(self,route_id:str) -> str:
        pass

    def get_live_location(self,route_id:str) -> str:
        pass

    def get_stops(self,route_id:str) -> str:
        pass

    def get_predictions(self,stop_id:str) -> str:
        pass

    def get_lines(self) -> str:
        pass

    def get_alerts(self) -> str:
        pass

    def authenticate(self) -> str:
        pass

    def get_trip_info(self,trip_id:str) -> str:
        pass