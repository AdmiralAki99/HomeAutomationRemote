from flask import Blueprint,render_template,request,redirect,url_for

smartlights = Blueprint('smartlights',__name__)

@smartlights.route('/')
def index():
    ...