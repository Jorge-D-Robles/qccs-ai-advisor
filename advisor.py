from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("src/index.html")


@app.route('/survey')
def survey():
    return 'course rec, grad timeline, rmp, genadvice'


@app.route("/chat")
def chat():
    return "<p>You hit chat</p>"
