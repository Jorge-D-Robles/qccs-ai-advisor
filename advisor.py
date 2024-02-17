from flask import Flask
from flask import render_template, request, jsonify

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


@app.route('/receive_data', methods=['POST'])
def receive_data():
    data_from_js = request.json  # Assuming the data sent is in JSON format
    print("Received data from JavaScript:", data_from_js)

    # Process the data or perform any required actions here
    # Iterate over how to extract and put it in a string
    print("Parse and send")

    return jsonify({'message': 'Data received successfully'})
