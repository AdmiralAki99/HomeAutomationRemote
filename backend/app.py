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

from flask import Flask, redirect,url_for,request
import asyncio
from kasa import (Discover,SmartBulb)

app = Flask(__name__)

devices = {}

@app.route("/test")
def hello_world():
    return {'members': ["member1", "member2", "member3"]}

@app.route("/light",methods=['GET','POST'])
def light():
    if request.method == 'POST':
        return {'light': "off"}
    else:
        return {'Night Light': "on", 'Desk Light': "off",'Bed Light': "off",'Ceiling Light': "off"}
    
def discover_devices():
    devices = asyncio.run(Discover.discover())

if __name__ == "__main__":
    app.run()
