from flask import Flask, request, jsonify
from flask_cors import CORS
from chat.chat import get_response
from chat.chatv2 import process_prompt

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route('/chatbot', methods=['POST'])
def chatbot_api():
    user_input = request.json.get('message')
    # response = get_response(user_input)
    response = process_prompt(user_input)
    return jsonify({'response': response})


if __name__ == '__main__':
    app.run(debug=True)
