# import sys
# from widgets import MainApp, LightScreen
# from PySide6.QtWidgets import QApplication, QStackedWidget

# app = QApplication(sys.argv)
# stacked_widget = QStackedWidget()
# light_screen = None
# home_screen = None

# def main():
#     window = MainApp()
#     window.show()

#     # # Create the main window
#     # window = QWidget()
#     # window.setWindowTitle("Widget Positioning Example")
#     # window.setGeometry(100, 100, 400, 300)

#     # # Create a background label widget
#     # background_label = QLabel("Background Label", parent=window)
#     # background_label.setGeometry(50, 50, 200, 100)  # (x, y, width, height)
#     # background_label.setStyleSheet("background-color: lightblue;")

#     # # Create an overlay button widget
#     # overlay_button = QPushButton("Overlay Button", parent=window)
#     # overlay_button.setGeometry(100, 100, 200, 50)  # (x, y, width, height)
#     # overlay_button.setStyleSheet("background-color: rgba(255, 0, 0, 100);")
#     # overlay_button.raise_()  # Raise the button above the background label
#     # window.show()
#     sys.exit(app.exec_())

# if __name__ == "__main__":
#     main()

from flask import Flask, redirect,url_for,request,jsonify
from flask_sqlalchemy import SQLAlchemy
# from flask_marshmallow import Marshmallow
from flask_marshmallow import Marshmallow

import asyncio
from kasa import (Discover,SmartBulb)

import os

base_dir = os.path.abspath(os.path.dirname(__file__))
database_name = './database/lights.sqlite'

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(base_dir,"database/database.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

devices = {'Night Light': "on", 'Desk Light': "off",'Bed Light': "off",'Ceiling Light': "off"}

class SmartLight(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ip = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)

    def __init__(self, name, ip, state):
        self.name = name
        self.ip = ip
        self.state = state

    def __repr__(self) -> str:
        return f'<SmartLight {self.name}>'

class SmartLightSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'ip', 'state')

smart_light_schema = SmartLightSchema()
smart_lights_schema = SmartLightSchema(many=True)
        
@app.route("/test")
def hello_world():
    lights = SmartLight.query.all()
    light_list = [{'name': light.name, 'ip': light.ip, 'state': light.state} for light in lights]
    return jsonify(light_list)

@app.route("/light/<int:light_id>",methods=['GET','POST','PUT'])
def handle_request(light_id):
    if request.method == 'GET':
        light = SmartLight.query.get(light_id)
        if light is None:
            return jsonify({'message': 'Light not found'}), 404
        else:
            return jsonify({'name': light.name, 'ip': light.ip, 'state': light.state})
    elif request.method == 'POST':
        return {"Request": "POST"}
    elif request.method == 'PUT':
        light = SmartLight.query.get(light_id)
        if light is None:
            return jsonify({'message': 'Light not found'}), 404
        else:
            light.state = request.json['state']
            db.session.commit()
            return jsonify({'message': 'Light Status Updated Successfully'})

def get_light(light_id):
    light = SmartLight.query.get(light_id)
    if light is None:
        return jsonify({'message': 'Light not found'}), 404
    else:
        return jsonify({'name': light.name, 'ip': light.ip, 'state': light.state})

def set_light(light_id):
    ...

def update_light(light_id):
    light = SmartLight.query.get(light_id)
    if light is None:
        return jsonify({'message': 'Light not found'}), 404
    else:
        light.state = request.json['state']
        db.session.commit()
        return jsonify({'message': 'Light Status Updated Successfully'})

    
def discover_devices():
    devices = asyncio.run(Discover.discover())

if __name__ == "__main__":
    app.run()