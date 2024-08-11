from flask import Flask, request, jsonify
from flask_cors import CORS
from chat.chat import get_response
from chat.chatv3 import get_response_v3
import os
import jwt
from middleware.auth import token_required
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

app.config['JWT_SECRET'] = os.getenv('JWT_SECRET')


@app.route('/chatbot', methods=['POST'])
@token_required
def chatbot_api():
    user_input = request.json.get('message')
    # session_id = request.json.get('sessionId')
    session_id = request.user.get('user').get('id')
    print(session_id, "hi")
    # response = get_response(user_input)
    # response = process_prompt(user_input)

    if not user_input:
        return jsonify({'error': 'Missing required parameters'}), 400

    # if request.user.get('user').get('id') != session_id:
    #     return jsonify({'error': 'Session ID does not match user ID'}), 403

    response = get_response_v3(user_input, session_id)

    if isinstance(response, tuple) and response[1] == 429:
        return response

    if isinstance(response, tuple) and response[1] >= 400:
        # If it's a tuple with an error status, return it directly
        return jsonify({'error': response[0]}), response[1]
    return jsonify({'response': response})


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
