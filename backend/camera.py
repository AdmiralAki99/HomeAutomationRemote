from flask import Flask, render_template, Response
import cv2

class Camera:
    feed = cv2.VideoCapture(0)
    
    def __init__(self) -> None:
        pass

    def get_camera_feed(self) -> Response:
        while True:
            ret,frame = self.feed.read()

            if not ret and frame is None:
                continue
            
            ret,buffer = cv2.imencode('.jpg',frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')