from flask import Flask, request, jsonify
from flask_cors import CORS
from chat.chat import get_response
from chat.chatv3 import get_response_v3
import os

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route('/chatbot', methods=['POST'])
def chatbot_api():
    user_input = request.json.get('message')
    session_id = request.json.get('sessionId')
    print(session_id, "hi")
    # response = get_response(user_input)
    # response = process_prompt(user_input)
    response = get_response_v3(user_input, session_id)
    return jsonify({'response': response})


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
