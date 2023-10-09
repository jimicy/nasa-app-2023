import os
from flask_cors import CORS
from flask import Flask, current_app, jsonify, request

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

app = Flask(__name__, static_url_path='', static_folder='frontend/build')

if os.environ.get("ENV") == "development":
  CORS(app, supports_credentials=True)
  print("Running in development. CORS enabled", "ENV", os.environ.get("ENV"))
else:
  print("Running in production. CORS disabled", "ENV", os.environ.get("ENV"))

@app.route('/')
def index():
  return current_app.send_static_file('index.html')

@app.route('/api/test')
def test():
  return jsonify({"message": "Hello World"})

@app.route('/api/generate', methods=['POST'])
def generate():
  print("=====/api/generate called=====")
  print(request.json)
  return jsonify({"message": "success"})