from flask import Flask, redirect,url_for,request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///light.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
# ma = Marshmallow(app)

class SmartLight(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ip = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<SmartLight {self.name}>'


if __name__ == '__main__':
    db.create_all()