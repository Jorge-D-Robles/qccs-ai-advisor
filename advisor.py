from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return 'Welcome to QC Advisor'


@app.route('/survey')
def survey():
    return 'course rec, grad timeline, rmp, genadvice'


@app.route("/chat")
def chat():
    return "<p>You hit chat</p>"
