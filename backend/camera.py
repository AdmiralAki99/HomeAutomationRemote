from flask import Flask, render_template, Response,jsonify
import cv2

class Camera:
    feed = cv2.VideoCapture(0)
    
    def __init__(self) -> None:
        ...

    def get_camera_feed(self) -> Response:
        while True:
            ret,frame = self.feed.read()

            frame = cv2.resize(frame,(640,640))

            if not ret and frame is None:
                continue
            
            ret,buffer = cv2.imencode('.jpg',frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


if __name__ == "__main__":
    app = Flask(__name__)
    camera = Camera()

    @app.route('/')
    def index():
        return jsonify({"message":"Hello World!"})
    
    @app.route('/camera')
    def camera_feed():
        return Response(camera.get_camera_feed(),mimetype='multipart/x-mixed-replace; boundary=frame')
    
    app.run(debug=True)