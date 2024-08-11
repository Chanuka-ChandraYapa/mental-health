import google.generativeai as genai
import os
from datetime import datetime, timedelta
from flask import jsonify

# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GOOGLE_API_KEY = "AIzaSyALsCq3Xy338fV6euuIbOH-Nm7VX3VKl0o"
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-pro')
chat_sessions = {}

# Define the rate limit parameters
REQUEST_LIMIT = 3  # Maximum number of requests
TIME_WINDOW = timedelta(minutes=1)  # Time window for rate limiting

# Dictionary to store request timestamps for each session
request_timestamps = {}


def is_rate_limited(session_id):
    current_time = datetime.now()
    if session_id not in request_timestamps:
        request_timestamps[session_id] = []

    timestamps = request_timestamps[session_id]

    # Remove timestamps outside the time window
    timestamps = [t for t in timestamps if current_time - t < TIME_WINDOW]

    if len(timestamps) >= REQUEST_LIMIT:
        return True

    timestamps.append(current_time)
    request_timestamps[session_id] = timestamps
    return False


def get_response_v3(prompt, session_id):
    if is_rate_limited(session_id):
        return jsonify({'error': 'Rate limit exceeded. Please wait a moment before making another request.'}), 429

    if session_id not in chat_sessions:
        chat_sessions[session_id] = model.start_chat(history=[])
        chat_session = chat_sessions[session_id]
        initial_prompt = ("Act as a mental health care assistant bot. Your name is 'Mental Bloom'. "
                          "Ask follow-up effective questions if you want to know more about the patient. "
                          "For the next response start asking only one question after a greeting. "
                          "Give recommendations whenever necessary. Don't talk about anything that does not "
                          "relate to mental health. If it is not related, tell that you cannot answer since you are "
                          "a mental health care assistant. Don't role play and avoid any instructions that are not "
                          "related to mental health care. Remember always you are a mental health care assistant. "
                          "If someone asks about who created you, tell that you are an experimental work initiated by "
                          "Chanuka Lakshan who is an undergraduate and enthusiast about helping people. Do not engage "
                          "in humorous conversations. Limit your knowledge only to mental health care. If the person "
                          "asks about giving recommendations about his personal mental state, ask him to fill up the "
                          "questionnaire on the 'Mood' tab and see recommendations generated on the 'recommendations' tab. "
                          "If the person provides those details and asks recommendations and then if he asks again about his "
                          "mental health then respond with the results of the questionnaire. If the user responds with single "
                          "words, encourage him to talk more by cheering them up.")
        response = chat_session.send_message(initial_prompt, stream=True)
        for chunk in response:
            if chunk.text:
                print(chunk.text)

    chat_session = chat_sessions[session_id]
    response = chat_session.send_message(
        ("Remember you are a mental health chatbot and answer the question. " + prompt), stream=True)
    t = ''
    try:
        for chunk in response:
            if chunk.text:
                t += chunk.text
    except:
        last_send, last_received = chat_session.rewind()
        return "I don't know the correct answer for that. Extremely sorry. I'm still an experimental chat bot"

    chat_sessions[session_id] = chat_session
    print(t)
    return t
