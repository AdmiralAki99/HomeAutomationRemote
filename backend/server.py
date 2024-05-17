import os

from flask import Flask,request,jsonify,session,Response,redirect,make_response,send_file
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from datetime import date
import datetime

from spotifyManager import SpotifyAPI
from GutenbergScraper import GutenbergAPI
from mangaManager import MangaManager
from scanner import NetworkScanner
from camera import Camera
from lights import Light
from kasa import Discover,Credentials,SmartBulb
import requests
import asyncio
from dotenv import load_dotenv

load_dotenv()
base_dir = os.path.abspath(os.path.dirname(__file__))

class Server:

    network_scanner = NetworkScanner()
    camera_manager = Camera()
    sp_manager = SpotifyAPI()
    ebook_manager = GutenbergAPI()
    manga_manager = MangaManager()

    def __init__(self) -> None:
        self.app = Flask(__name__)
        self.app.secret_key = os.getenv('SECRET_KEY')
        self.app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(base_dir,"database/database.db")}'
        self.app.config['SQLALCHEMY_BINDS'] = {
            'calendar': f'sqlite:///{os.path.join(base_dir,"database/calendar.db")}',
            'network': f'sqlite:///{os.path.join(base_dir,"database/network.db")}',
            'camera': f'sqlite:///{os.path.join(base_dir,"database/camera.db")}'
        }
        self.app.config['SESSION_TYPE'] = 'filesystem'
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.app.config['SESSION_FILE_DIR'] = './.flask_session/'
        self.db = SQLAlchemy(self.app)
        self.ma = Marshmallow(self.app)
        self.session = Session(self.app)

        # self.cache_handler = spotipy.FlaskSessionCacheHandler(session)
        # self.spotify_manager = SpotifyManager(self.cache_handler)

        class SmartLight(self.db.Model):
            id = self.db.Column(self.db.Integer, primary_key=True,autoincrement=True)
            name = self.db.Column(self.db.String(100), nullable=False)
            ip = self.db.Column(self.db.String(100), nullable=False)
            state = self.db.Column(self.db.String(100), nullable=False)

            def __init__(self, name, ip, state):
                self.name = name
                self.ip = ip
                self.state = state

            def __repr__(self) -> str:
                return f'<SmartLight {self.name}>'
            
        class SmartLightSchema(self.ma.Schema):
            class Meta:
                fields = ('id', 'name', 'ip', 'state')

        class CalendarEvent(self.db.Model):
            __bind_key__ = 'calendar'
            id = self.db.Column(self.db.Integer, primary_key=True,autoincrement=True)
            title = self.db.Column(self.db.String(100), nullable=False)
            start_date_day = self.db.Column(self.db.Integer, nullable=False)
            start_date_month = self.db.Column(self.db.Integer, nullable=False)
            start_date_year = self.db.Column(self.db.Integer, nullable=False)
            start_time_hour = self.db.Column(self.db.Integer, nullable=False)
            start_time_minute = self.db.Column(self.db.Integer, nullable=False)
            end_date_day = self.db.Column(self.db.Integer, nullable=False)
            end_date_month = self.db.Column(self.db.Integer, nullable=False)
            end_date_year = self.db.Column(self.db.Integer, nullable=False)
            end_time_hour = self.db.Column(self.db.Integer, nullable=False)
            end_time_minute = self.db.Column(self.db.Integer, nullable=False)
            all_day = self.db.Column(self.db.Boolean, nullable=False)
            description = self.db.Column(self.db.String(100), nullable=False)
            calendar = self.db.Column(self.db.String(100), nullable=False)
            status = self.db.Column(self.db.Boolean, nullable=False)
            colour = self.db.Column(self.db.String(10), nullable=False)

     
            def __init__(self,title,start_date_day,start_date_month,start_date_year,end_date_day,end_date_month,end_date_year,start_time_hour,start_time_minute,end_time_hour,end_time_minute,all_day,description,calendar,status,colour) -> None:
                super().__init__()
                self.title = title
                self.start_date_day = start_date_day
                self.start_date_month = start_date_month
                self.start_date_year = start_date_year
                self.start_time_hour = start_time_hour
                self.start_time_minute = start_time_minute
                self.end_date_day = end_date_day
                self.end_date_month = end_date_month
                self.end_date_year = end_date_year
                self.end_time_hour = end_time_hour
                self.end_time_minute = end_time_minute
                self.all_day = all_day
                self.description = description
                self.calendar = calendar
                self.status = status
                self.colour = colour


            def __repr__(self) -> str:
                return f'<CalendarEvent {self.title}>'
    
        class CalendarEventSchema(self.ma.Schema):
            class Meta:
                fields = ('id', 'title', 'start_date_day', 'start_day_month','start_date_year','start_time_hour','start_time_minute','end_date_day','end_date_month','end_date_year','end_time_hour','end_time_minute','all_day', 'description', 'calendar', 'status')

        class NetworkDevice(self.db.Model):
            __bind_key__ = 'network'
            id = self.db.Column(self.db.Integer, primary_key=True,autoincrement=True)
            name = self.db.Column(self.db.String(100), nullable=False)
            ip = self.db.Column(self.db.String(100), nullable=False)
            mac = self.db.Column(self.db.String(100), nullable=False)
            support = self.db.Column(self.db.Boolean, nullable=False)
            state = self.db.Column(self.db.String(100), nullable=False)

            def __init__(self, name, ip, mac,support,state):
                self.name = name
                self.ip = ip
                self.mac = mac
                self.support = support
                self.state = state

            def __repr__(self) -> str:
                return f'<NetworkDevice {self.name}>'

        
            
        self.smart_light_schema = SmartLightSchema(many=True)
        self.calendar_event_schema = CalendarEventSchema(many=True)

        class CameraDevice(self.db.Model):
            __bind_key__ = 'camera'
            id = self.db.Column(self.db.Integer, primary_key=True,autoincrement=True)
            name = self.db.Column(self.db.String(100), nullable=False)
            ip = self.db.Column(self.db.String(100), nullable=False)
            mac = self.db.Column(self.db.String(100), nullable=False)
            active = self.db.Column(self.db.Boolean, nullable=False)

            def __init__(self, name, ip, mac,active):
                self.name = name
                self.ip = ip
                self.mac = mac
                self.active = active

            def __repr__(self) -> str:
                return f'<CameraDevice {self.name}>'

        
       
        
        @self.app.route("/test")
        def hello_world():
            lights = SmartLight.query.all()
            light_list = [{'name': light.name, 'ip': light.ip, 'state': light.state} for light in lights]
            return jsonify(light_list)
        
        """ Smart Light Routes """

        @self.app.route("/light/all",methods=['GET'])
        def get_all_lights():
            lights = SmartLight.query.all()
            if lights is None:
                pass
            else:
                light_list = [{'name':light.name, 'ip':light.ip, 'state':light.state,'id':light.id} for light in lights]
                return jsonify(light_list)
        
        @self.app.route("/light/<int:light_id>",methods=['GET','POST','PUT','DELETE'])
        def handle_request(light_id):
            if request.method == 'GET':
                light = SmartLight.query.get(light_id)
                if light is None:
                    return jsonify({'message': 'Light not found'}), 404
                else:
                    return jsonify({'name': light.name, 'ip': light.ip, 'state': light.state})
                
            elif request.method == 'POST':
                light_keys = ['name', 'ip', 'state']
                if not all(key in request.json for key in light_keys):
                    return jsonify({'error': 'Some elements are missing'}), 400
        
                light = SmartLight(request.json['name'],request.json['ip'],request.json['state'])
                self.db.session.add(light)
                self.db.session.commit()
                return jsonify({'message': 'Light Added Successfully'})
            
            elif request.method == 'PUT':
                light = SmartLight.query.get(light_id)
                if light is None:
                    return jsonify({'message': 'Light not found'})
                else:
                    light.state = request.json['state']
                    self.db.session.commit()
                    return jsonify({'message': 'Light Status Updated Successfully'})
                    # return jsonify({'message': 'PUT request received'})

            elif request.method == 'DELETE':
                light = SmartLight.query.get(light_id)
                if light is None:
                    return jsonify({'message': 'Light not found'}), 404
                else:
                    self.db.session.delete(light)
                    self.db.session.commit()
                    return jsonify({'message': 'Light Deleted Successfully'})
                
        @self.app.route("/light/scan",methods=['GET'])
        def scan_lights():
            lights = asyncio.run(self.discover_smart_lights())
            lights = [{'id': idx + 1, **device} for idx, device in enumerate(lights)]
            return jsonify({'lights': lights})
            
        @self.app.route("/light/turn/on",methods=['POST'])
        def turn_on_light():
            body = request.get_json()
            id = body['id']
            light = SmartLight.query.get(id)
            if light is None:
                return jsonify({'message': 'Light not found'})
            else:
                if asyncio.run(self.__turn_on_light__(light.ip)):
                    light.state = 'on'
                    self.db.session.commit()
                    return(jsonify({'message': 'Light Switched On Successfully'}))
                else:
                    return(jsonify({'message': 'Light Switched On Failed'}))
                
        @self.app.route("/light/turn/off",methods=['POST'])
        def turn_off_light():
            body = request.get_json()
            id = body['id']
            light = SmartLight.query.get(id)
            if light is None:
                return jsonify({'message': 'Light not found'})
            else:
                if asyncio.run(self.__turn_off_light__(light.ip)):
                    light.state = 'off'
                    self.db.session.commit()
                    return(jsonify({'message': 'Light Switched On Successfully'}))
                else:
                    return(jsonify({'message': 'Light Switched On Failed'}))
            
        @self.app.route("/light/change/brightness",methods=['POST'])
        def set_brightness():
            body = request.get_json()
            id = body['id']
            brightness = body['brightness']

            light = SmartLight.query.get(id)
            if light is None:
                return jsonify({'message': 'Light not found'})
            elif light is not None and light.state == 'on':
                asyncio.run(self.change_brightness(light.ip,brightness))
                self.db.session.commit()
                return jsonify({'message': 'Light Brightness Changed Successfully'})

        @self.app.route("/light/change/name",methods=['POST'])  
        def change_name():
            body = request.get_json()
            id = body['id']
            name = body['name']

            light = SmartLight.query.get(id)
            if light is None:
                return jsonify({'message': 'Light not found'})
            else:
                light.name = name
                self.db.session.commit()
                return jsonify({'message': 'Light Name Changed Successfully'})

        @self.app.route("/light/add",methods=['POST'])
        def add_light():
            body = request.get_json()
            light_keys = ['name', 'ip', 'state']
            if not all(key in body for key in light_keys):
                return jsonify({'error': 'Some elements are missing'}), 400
            
            light = SmartLight(body['name'],body['ip'],body['state'])
            self.db.session.add(light)
            self.db.session.commit()
            return jsonify({'message': 'Light Added Successfully'})
        
        @self.app.route("/light/get/details",methods=['POST'])
        def get_light_details():
            body = request.get_json()
            id = body['id']
            light = SmartLight.query.get(id)
            if light is None:
                return jsonify({'message': 'Light not found'})
            else:
                return jsonify({'name': light.name, 'ip': light.ip, 'state': light.state})

        @self.app.route("/light/update/details",methods=['POST'])  
        def update_details():
            body = request.get_json()
            light = SmartLight.query.get(body['id'])
            if light is None:
                return jsonify({'message': 'Light not found'})
            
            light.name = body['name']
            light.state = body['state']
            self.db.session.commit()
            return jsonify({'message': 'Light Updated Successfully'})
        
        @self.app.route("/light/set/brightness",methods=['POST'])
        def change_brightness():
            body = request.get_json()
            id = body['id']
            brightness = body['brightness']
            light = SmartLight.query.get(id)
            if light is None:
                return jsonify({'message': 'Light not found'})
            else:
                asyncio.run(self.change_brightness(light.ip,brightness))
                return jsonify({'message': 'Brightness Changed Successfully'}) 
            
                
            """ Spotify Routes """

        @self.app.route("/spotify/get/current",methods=['GET'])
        def get_current_playback():
            if self.sp_manager.is_user_logged_in() == True:
                if datetime.datetime.now().timestamp() > self.sp_manager.get_expiry_time_stamp():
                    self.sp_manager.token_refresh()
                return jsonify(self.sp_manager.get_current_playback())
            else:
                redirect('/spotify/login')
            
        @self.app.route("/spotify/pause",methods=['GET'])
        def pause_playback():
            if self.sp_manager.is_user_logged_in():
                if datetime.datetime.now().timestamp() > self.sp_manager.get_expiry_time_stamp():
                    self.sp_manager.token_refresh()
                self.sp_manager.pause_song()
                return jsonify({'message': 'Playback Paused'})
            else:
                redirect('/spotify/login')
            
        @self.app.route("/spotify/play",methods=['GET'])
        def play_playback():
            if self.sp_manager.is_user_logged_in():
                if datetime.datetime.now().timestamp() > self.sp_manager.get_expiry_time_stamp():
                    self.sp_manager.token_refresh()
                self.sp_manager.play_song()
                return jsonify({'message': 'Playback Started'})
            else:
                redirect('/spotify/login')

        @self.app.route("/spotify/next",methods=['POST'])
        def skip_playback():
            if self.sp_manager.is_user_logged_in():
                if datetime.datetime.now().timestamp() > self.sp_manager.get_expiry_time_stamp():
                    self.sp_manager.token_refresh()
                self.sp_manager.skip_to_next()
                return jsonify({'message': 'Playback Skipped'})
            else:
                redirect('/spotify/login')

        @self.app.route("/spotify/prev",methods=['POST'])
        def prev_playback():
            if self.sp_manager.is_user_logged_in():
                if datetime.datetime.now().timestamp() > self.sp_manager.get_expiry_time_stamp():
                    self.sp_manager.refresh_token()
                self.sp_manager.skip_to_previous()
                return jsonify({'message': 'Playback Skipped'})
            else:
                redirect('/spotify/login')

        @self.app.route("/spotify/login")
        def login():
            auth_url = self.sp_manager.get_auth_url()
            return redirect(auth_url)
        
        @self.app.route("/spotify/force/refresh",methods=['POST'])
        def refresh_token():
            return self.sp_manager.token_refresh()
        
        @self.app.route("/spotify/callback/")
        def callback():
        
            if 'code' not in request.args:
                return {'message': 'No Code Found'}
            
            self.sp_manager.set_auth_code(request.args['code'])
            self.sp_manager.login()
            return {'message': 'Success'}
    
        @self.app.route("/spotify/set/volume",methods=['PUT'])
        def change_volume():
            volume = request.get_json()['volume']
            return self.sp_manager.change_volume(volume)
        
        @self.app.route("/spotify/get/volume",methods=['GET'])
        def get_current_volume():
            return {'volume': self.sp_manager.get_current_volume()}

        
        """ Calendar Routes """

        @self.app.route("/calendar/get/all",methods=['GET'])
        def get_all_events():
            print("All Calendar Events")
            return jsonify({'message': 'All Calendar Events'})

        @self.app.route("/calendar/get/<selected_date>",methods=['GET'])
        def get_event_at_date(selected_date):
            day = selected_date.split('-')[0]
            month = selected_date.split('-')[1]
            year = selected_date.split('-')[2]
            query_results = CalendarEvent.query.filter_by(start_date_day = day,start_date_month = month,start_date_year = year).all()
            if query_results is None or query_results == []:
                return jsonify({'message': 'No Events Found'})
            else:
                appointments = []
                for events in query_results:
                    appointments.append({
                        "id": events.id,
                        "title": events.title,
                        "description": events.description,
                        "start_date_day": events.start_date_day,
                        "start_date_month": events.start_date_month,
                        "start_date_year": events.start_date_year,
                        "start_time_hour": events.start_time_hour,
                        "start_time_minute": events.start_time_minute,
                        "end_date_day": events.end_date_day,
                        "end_date_month": events.end_date_month,
                        "end_date_year": events.end_date_year,
                        "end_time_hour": events.end_time_hour,
                        "end_time_minute": events.end_time_minute,
                        "all_day": events.all_day,
                        "calendar": events.calendar,
                        "status": events.status,
                        "colour": events.colour
                    })
                return jsonify({"appointments":appointments})
        @self.app.route("/calendar/get/month/<month_id>",methods=['GET'])
        def get_event_month(month_id):
            month = month_id.split('-')[0]
            year_id = month_id.split('-')[1]
            query_results = CalendarEvent.query.filter_by(start_date_month = month,start_date_year = year_id).all()
            if query_results is None or query_results == []:
                return jsonify({'message': 'No Events Found'})
            else:
                appointments = []
                event_dict = {}
                for events in query_results:
                    key = f'{events.start_date_day}-{events.start_date_month}-{events.start_date_year}'
                    if key in event_dict:
                        event_dict[key].append({
                        "id": events.id,
                        "title": events.title,
                        "description": events.description,
                        "start_date_day": events.start_date_day,
                        "start_date_month": events.start_date_month,
                        "start_date_year": events.start_date_year,
                        "start_time_hour": events.start_time_hour,
                        "start_time_minute": events.start_time_minute,
                        "end_date_day": events.end_date_day,
                        "end_date_month": events.end_date_month,
                        "end_date_year": events.end_date_year,
                        "end_time_hour": events.end_time_hour,
                        "end_time_minute": events.end_time_minute,
                        "all_day": events.all_day,
                        "calendar": events.calendar,
                        "status": events.status,
                        "colour": events.colour
                    })
                    else:
                        event_dict[key] = [{
                        "id": events.id,
                        "title": events.title,
                        "description": events.description,
                        "start_date_day": events.start_date_day,
                        "start_date_month": events.start_date_month,
                        "start_date_year": events.start_date_year,
                        "start_time_hour": events.start_time_hour,
                        "start_time_minute": events.start_time_minute,
                        "end_date_day": events.end_date_day,
                        "end_date_month": events.end_date_month,
                        "end_date_year": events.end_date_year,
                        "end_time_hour": events.end_time_hour,
                        "end_time_minute": events.end_time_minute,
                        "all_day": events.all_day,
                        "calendar": events.calendar,
                        "status": events.status,
                        "colour": events.colour
                    }]
                return jsonify(event_dict)
        
        @self.app.route("/calendar/get/today",methods=['GET'])
        def get_todays_events():
            today = date.today()
            query_results = CalendarEvent.query.filter_by(start_date_day = today.day,start_date_month = today.month,start_date_year = today.year).all()
            if query_results is None or query_results == []:
                return jsonify({'message': 'No Events Found'})
            else:
                appointments = []
                for events in query_results:
                    appointments.append({
                        "id": events.id,
                        "title": events.title,
                        "description": events.description,
                        "start_date_day": events.start_date_day,
                        "start_date_month": events.start_date_month,
                        "start_date_year": events.start_date_year,
                        "start_time_hour": events.start_time_hour,
                        "start_time_minute": events.start_time_minute,
                        "end_date_day": events.end_date_day,
                        "end_date_month": events.end_date_month,
                        "end_date_year": events.end_date_year,
                        "end_time_hour": events.end_time_hour,
                        "end_time_minute": events.end_time_minute,
                        "all_day": events.all_day,
                        "calendar": events.calendar,
                        "status": events.status,
                        "colour": events.colour
                    })
                return jsonify({"appointments":appointments})

        @self.app.route("/calendar/get/today/count",methods=['GET'])    
        def get_todays_events_count():
            today = date.today()
            query_results = CalendarEvent.query.filter_by(start_date_day = today.day,start_date_month = today.month,start_date_year = today.year).all()
            if query_results is None or query_results == []:
                return jsonify({'count':0})
            else:
                return jsonify({'count':len(query_results)})

        @self.app.route("/calendar/add/",methods=['POST'])
        def add_event():
            calendar_keys = ['title','start_date_day','start_date_month','start_date_year','start_time_hour','start_time_minute','end_date_day','end_date_month','end_date_year','end_time_hour','end_time_minute','all_day', 'description', 'calendar', 'status','colour']
            if not all(key in request.json for key in calendar_keys):
                return jsonify({'error': 'Some elements are missing'}), 400
            event = CalendarEvent(request.json['id'],request.json['title'],request.json['start_date_day'],request.json['start_date_month'],request.json['start_date_year'],request.json['start_time_hour'],request.json['start_time_minute'],request.json['end_date_day'],request.json['end_date_month'],request.json['end_date_year'],request.json['end_time_hour'],request.json['end_time_minute'],request.json['all_day'],request.json['description'],request.json['calendar'],request.json['status'],request.json['colour'])
            self.db.session.add(event)
            self.db.session.commit()
            return jsonify({'message': 'Event Added Successfully'})
        
        @self.app.route("/calendar/complete/<int:event_id>",methods=['POST'])
        def complete_event(event_id):
            event = CalendarEvent.query.get(event_id)
            if event is None:
                return jsonify({'message': 'Event not found'})
            else:
                event.status = True
                self.db.session.commit()
                return jsonify({'message': 'Event Completed Successfully'})

        @self.app.route("/calendar/change/status/<int:event_id>",methods=['POST'])   
        def change_to_ongoing(event_id):
            event = CalendarEvent.query.get(event_id)
            if event is None:
                return jsonify({'message': 'Event not found'})
            else:
                event.status = False
                self.db.session.commit()
                return jsonify({'message': 'Event Changed to Ongoing Successfully'})

        @self.app.route("/calendar/change/start/<int:event_id>",methods=['POST'])    
        def change_start_time(event_id,new_start_hour,new_start_minute):
            event = CalendarEvent.query.get(event_id)
            if event is None:
                return jsonify({'message': 'Event not found'})
            else:
                event.start_time_hour = new_start_hour
                event.start_time_minute = new_start_minute
                self.db.session.commit()
                return jsonify({'message': 'Event Start Time Changed Successfully'})
            
        @self.app.route("/calendar/change/end/<int:event_id>",methods=['POST'])
        def change_event_time(event_id,new_end_hour,new_end_minute):
            event = CalendarEvent.query.get(event_id)
            if event is None:
                return jsonify({'message': 'Event not found'})
            else:
                event.end_time_hour = new_end_hour
                event.end_time_minute = new_end_minute
                self.db.session.commit()
                return jsonify({'message': 'Event End Time Changed Successfully'})
            
        @self.app.route("/calendar/delete/date/<int:event_id>",methods=['POST'])
        def delete_event(event_id):
            event = CalendarEvent.query.get(event_id)
            if event is None:
                return jsonify({'message': 'Event not found'})
            else:
                self.db.session.delete(event)
                self.db.session.commit()
                return jsonify({'message': 'Event Deleted Successfully'})

        @self.app.route("/calendar/delete/all",methods=['POST'])
        def delete_all_events():
            events = CalendarEvent.query.all()
            if events is None:
                return jsonify({'message': 'No Events Found'})
            else:
                for event in events:
                    self.db.session.delete(event)
                self.db.session.commit()
                return jsonify({'message': 'All Events Deleted Successfully'})
            
        @self.app.route("/calendar/delete/month/<month_id>",methods=['POST'])
        def delete_month_events(month_id):
            month = month_id.split('-')[0]
            year_id = month_id.split('-')[1]
            events = CalendarEvent.query.filter_by(start_date_month = month,start_date_year = year_id).all()
            if events is None:
                return jsonify({'message': 'No Events Found'})
            else:
                for event in events:
                    self.db.session.delete(event)
                self.db.session.commit()
                return jsonify({'message': 'All Events Deleted Successfully'})
            
        """
        Network Routes
        
        """
        
        @self.app.route("/network/get/all",methods=['GET'])
        def get_network_devices():
            devices = NetworkDevice.query.all()
            if devices is None:
                pass
            else:
                device_list = [{'name':device.name, 'ip':device.ip, 'mac':device.mac,'support':device.support,'state':device.state,'id':device.id} for device in devices]
                return jsonify({'devices':device_list})
            
        @self.app.route("/network/scan",methods=['POST'])
        def scan_network():
            body = request.get_json()
            ip_addr = body['ip']
            if ip_addr is None or ip_addr == '':
                self.network_scanner.scan(ip_addr='10.0.0.1/24')
                devices = self.network_scanner.get_scanned_devices()
                devices = [{'id': idx + 1, **device} for idx, device in enumerate(devices)]
                return jsonify({'devices': devices})

            self.network_scanner.scan(ip_addr=ip_addr)
            devices = self.network_scanner.get_scanned_devices()
            devices = [{'id': idx + 1, **device} for idx, device in enumerate(devices)]
            return jsonify({'devices': devices})
            
        
        @self.app.route("/network/add/",methods=['POST'])
        def add_device():
            body = request.get_json()
            network_keys = ['name', 'ip', 'mac','support','state']
            if not all(key in body for key in network_keys):
                return jsonify({'error': 'Some elements are missing'}), 400
            device = NetworkDevice(body['name'],body['ip'],body['mac'],body['support'],body['state'])
            self.db.session.add(device)
            self.db.session.commit()
            return jsonify({'message': 'Device Added Successfully'})
            
        @self.app.route("/network/wake/<int:device_id>",methods=['POST'])
        def wake_device(device_id):
            device = NetworkDevice.query.get(device_id)
            if device is None:
                return jsonify({'message': 'Device not found'})
            else:
                return jsonify({'message': 'Device Woken Successfully'})
            
        @self.app.route("/network/delete/<int:device_id>",methods=['POST'])
        def delete_device(device_id):
            device = NetworkDevice.query.get(device_id)
            if device is None:
                return jsonify({'message': 'Device not found'})
            else:
                self.db.session.delete(device)
                self.db.session.commit()
                return jsonify({'message': 'Device Deleted Successfully'})
            
        @self.app.route("/network/delete/all",methods=['POST'])
        def delete_all_devices():
            devices = NetworkDevice.query.all()
            if devices is None:
                return jsonify({'message': 'No Devices Found'})
            else:
                for device in devices:
                    self.db.session.delete(device)
                self.db.session.commit()
                return jsonify({'message': 'All Devices Deleted Successfully'})
            
        @self.app.route("/network/change/name/<int:device_id>",methods=['POST'])
        def change_network_name(device_id):
            device = NetworkDevice.query.get(device_id)
            if device is None:
                return jsonify({'message': 'Device not found'})
            else:
                device.name = request.json['name']
                self.db.session.commit()
                return jsonify({'message': 'Device Name Changed Successfully'})
            
        
        @self.app.route("/network/ping/",methods=['POST'])
        def ping_device():
            body = request.get_json()
            ip = body['ip']
            if ip is None or ip == '':
                return jsonify({'message': 'IP Address not found'})
            else:
                if self.network_scanner.ping_device(ip):
                    return jsonify({'power': True})
                else:
                    return jsonify({'power': False})
            
        """ Camera Routes """

        @self.app.route("/camera/add")
        def add_camera():
            body = request.get_json()
            camera_keys = ['name','ip','mac','active']
            if not all(key in body for key in camera_keys):
                jsonify({"Message":"Missing Variables"})
            else:
                camera = CameraDevice(name=body['name'],ip=body['ip'],mac=body['mac'],active=body['active'])
                self.db.session.add(camera)
                self.db.session.commit()
                return jsonify({"Message":"Camera Added Successfully"})
            
        @self.app.route("/camera/delete")
        def delete_camera():
            body = request.get_json()
            camera = CameraDevice.query.get(body[id])
            if camera is None:
                return jsonify({"Message":"Camera Not Found"})
            else:
                self.db.session.delete(camera)
                self.db.session.commit()
                return jsonify({"Message":"Camera Deleted Successfully"})
            
        @self.app.route("/camera/get/feed")
        def get_camera_feed():
            return Response(self.camera_manager.get_camera_feed(),mimetype='multipart/x-mixed-replace; boundary=frame')
        
        @self.app.route("/camera/scan",methods=['POST'])
        def scan_cameras():
            return jsonify({"Message":"Camera Scan"})
        
        @self.app.route("/camera/change/name",methods=['POST'])
        def edit_camera_name():
            body = request.get_json()
            camera = CameraDevice.query.get(body[id])
            if camera is None:
                return jsonify({"Message":"Camera Not Found"})
            else:
                camera.name = body['name']
                self.db.session.commit()
                return jsonify({"Message":"Camera Name Changed Successfully"})
            
        """ Gutenberg Scraper Routes"""

        @self.app.route("/gutenberg/search",methods=['POST'])
        def search_book(self):
            body = request.get_json()
            book_title = body['title']
            return jsonify(self.ebook_manager.search_book(book_title))
        
        @self.app.route("/gutenberg/download",methods=['POST'])
        def download_ebook(self):
            request = request.get_json()
            book_id = request['id']
            book_name = request['name']
            
            self.ebook_manager.download_ebook(book_id,book_name)
            return {'message': 'Ebook Downloaded Successfully'}
        
        """ Manga Routes"""
        @self.app.route("/manga/authenticate",methods=['GET'])
        def authenticate_manga_manager():
            return self.manga_manager.authenticate()

        @self.app.route("/manga/search",methods=['POST'])
        def get_manga():
            body = request.get_json()
            manga_title = body['title']
            return jsonify(self.manga_manager.search(title=manga_title))

        @self.app.route("/manga/get/random",methods=['GET'])
        def get_random_manga():
            random_tags = self.manga_manager.get_random_tags()
            genres = [x[0] for x in random_tags]
            random_tags = [x[1] for x in random_tags]
            included_tags = self.manga_manager.get_tag_ids(categories=random_tags)
            return jsonify({
                'genres':genres[0],
                'tags':random_tags,
                'manga':self.manga_manager.search_with_tags(included=included_tags,excluded=[])
                })

        @self.app.route("/manga/get/chapters",methods=['POST'])
        def get_manga_chapters():
            # body = request.get_json()
            # manga_id = body['id']
            # return jsonify(self.manga_manager.get_manga_chapters(manga_id))
            return jsonify(self.manga_manager.get_manga_chapters(request.get_json()['id']))

        @self.app.route("/manga/get/download",methods=['POST'])
        def download_manga_chapter():
            body = request.get_json()
            chapter_id = body['chapterId']
            manga_id = body['mangaId']
            return jsonify(self.manga_manager.download_chapter(manga_id,chapter_id))

        @self.app.route("/manga/get/read",methods=['POST'])
        def read_chapter():
            body = request.get_json()
            chapter_id = body['chapterId']
            manga_id = body['mangaId']
            return jsonify({'message': 'Chapter Read Successfully'})


        @self.app.route("/manga/get/refresh",methods=['GET'])
        def manga_refresh_token():
            return self.manga_manager.token_refresh()
        
        @self.app.route("/manga/post/<mangaId>/<chapterId>/<pageNo>",methods=['GET'])
        def get_chapter_page(mangaId,chapterId,pageNo):
            
            if self.manga_manager.validate_chapter_page(mangaId,chapterId,pageNo):
                return send_file(f'mangadex/{mangaId}/{chapterId}/page{pageNo}.png')
            else:
                return jsonify({'message': 'Page Not Found'})
        
    async def discover_smart_lights(self):
        devices = await Discover.discover(
            credentials= Credentials(f'{os.getenv("KASA_USERNAME")}', f'{os.getenv("KASA_PASSWORD")}'),
            timeout=20,
        )

        lights= []
    
        for ip,device in devices.items():
            await device.update()
            lights.append({"ip": ip, "name": device.alias, "state": device.is_on})

        return lights
    
    async def switch_state(self,ip):
        bulb = SmartBulb(ip)
        await bulb.update()
        if bulb.is_on:
            await bulb.turn_off()
            await bulb.update()
            return 'off'
        else:
            await bulb.turn_on()
            await bulb.update()
            return 'on'
        
    async def __turn_off_light__(self,ip):
        bulb = SmartBulb(ip)
        await bulb.update()
        await bulb.turn_off()
        await bulb.update()
        return True
    
    async def __turn_on_light__(self,ip):
        bulb = SmartBulb(ip)
        await bulb.update()
        await bulb.turn_on()
        await bulb.update()
        return True
        
    async def change_brightness(self,ip,brightness):
        bulb = SmartBulb(ip)
        await bulb.update()
        await bulb.set_brightness(brightness)
        await bulb.update()

    def run(self):
        self.app.run(debug=True)


if __name__ == "__main__":
    server = Server()
    server.run()
    # script_path = os.path.join(os.path.dirname(__file__), "scanner.py") 
    # command = f"sudo python3 {script_path}" 
    # print(script_path)
    # try:
    #     subprocess.run(command,shell=True,check=True)
    # except Exception as e:
    #     print(e)
    
