import requests
from isodate import parse_duration

from flask import Flask, Blueprint, render_template, current_app, request, redirect

main = Blueprint('main', __name__)

@main.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@main.route('/result')
def show_result():
    return render_template('result.html')

@main.route('/insight')
def show_insight():
    return render_template('insight.html')

