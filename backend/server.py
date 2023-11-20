import os

from flask import Flask, redirect,url_for,request,jsonify,session
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from spotifyManager import SpotifyManager
import spotipy

base_dir = os.path.abspath(os.path.dirname(__file__))

class Server:

    spotify_manager = SpotifyManager()

    def __init__(self) -> None:
        self.app = Flask(__name__)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(base_dir,"database/database.db")}'
        self.app.config['SQLALCHEMY_BINDS'] = {
            'calendar': f'sqlite:///{os.path.join(base_dir,"database/calendar.db")}'
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
            id = self.db.Column(self.db.Integer, primary_key=True)
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
            id = self.db.Column(self.db.Integer, primary_key=True)
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

     
            def __init__(self,id,title,start_date_day,start_date_month,start_date_year,end_date_day,end_date_month,end_date_year,start_time_hour,start_time_minute,end_time_hour,end_time_minute,all_day,description,calendar,status,colour) -> None:
                super().__init__()
                self.id = id
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
            
        self.smart_light_schema = SmartLightSchema(many=True)
        self.calendar_event_schema = CalendarEventSchema(many=True)

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
                
            """ Spotify Routes """

        @self.app.route("/spotify/get/current",methods=['GET'])
        def get_current_playback():
            return jsonify(self.spotify_manager.get_current_song())
            
        @self.app.route("/spotify/pause",methods=['GET'])
        def pause_playback():
            self.spotify_manager.pause_song()
            return jsonify({'message': 'Playback Paused'})
            
        @self.app.route("/spotify/play",methods=['GET'])
        def play_playback():
            self.spotify_manager.resume_song()
            return jsonify({'message': 'Playback Resumed'})

        @self.app.route("/spotify/next",methods=['POST'])
        def skip_playback():
            self.spotify_manager.skip_song()
            return jsonify({'message': 'Playback Skipped'})

        @self.app.route("/spotify/prev",methods=['POST'])
        def prev_playback():
            self.spotify_manager.rewind_song()
            return jsonify({'message': 'Playback Previous'})
        
        """ Calendar Routes """

        @self.app.route("/calendar/get/all",methods=['GET'])
        def get_all_events():
            print("All Calendar Events")
            return jsonify({'message': 'All Calendar Events'})

        @self.app.route("/calendar/get/<selected_date>",methods=['GET'])
        def get_event_at_date(selected_date):
            return jsonify({
                "appointments": [
                    {
                        "id": 1,
                        "title": "Meeting with Client",
                        "description": "Discuss project requirements and timelines",
                        "start_date": "2023-11-20T10:00:00",
                        "end_date": "2023-11-20T11:30:00",
                        "location": "123 Main St, City",
                        "Calendar": "Work",
                        "Color": "#FF0000",
                        "attendees": [
                            {
                                "name": "John Doe",
                                "email": "john@example.com"
                            }
                        ]
                    }
                ]
            })
        @self.app.route("/calendar/get/month/<month_id>",methods=['GET'])
        def get_event_month(month_id):
            ...
        @self.app.route("/calendar/add/",methods=['POST'])
        def add_event():
            calendar_keys = ['id', 'title','start_date_day','start_date_month','start_date_year','start_time_hour','start_time_minute','end_date_day','end_date_month','end_date_year','end_time_hour','end_time_minute','all_day', 'description', 'calendar', 'status','colour']
            if not all(key in request.json for key in calendar_keys):
                return jsonify({'error': 'Some elements are missing'}), 400
            event = CalendarEvent(request.json['id'],request.json['title'],request.json['start_date_day'],request.json['start_date_month'],request.json['start_date_year'],request.json['start_time_hour'],request.json['start_time_minute'],request.json['end_date_day'],request.json['end_date_month'],request.json['end_date_year'],request.json['end_time_hour'],request.json['end_time_minute'],request.json['all_day'],request.json['description'],request.json['calendar'],request.json['status'],request.json['colour'])
            self.db.session.add(event)
            self.db.session.commit()
            return jsonify({'message': 'Event Added Successfully'})
            
   
    def run(self):
        self.app.run()


if __name__ == "__main__":
    server = Server()
    server.run()
    
