import re
from nltk.chat.util import Chat, reflections

# Define patterns and responses
patterns = [
    (r'hi|hello|hey', ['Hello!', 'Hi there!', 'How can I help you today?']),
    (r'how are you', [
     'I am just a bot, but I am doing well, thank you! How about you?']),
    (r'(.*) your name',
     ['I am a mental health chatbot. You can call me MH Bot.']),
    (r'(.*) help (.*)',
     ['I am here to help with your mental health concerns. Please tell me more.']),
    (r'(.*) (sad|down|depressed)',
     ['I am sorry to hear that you are feeling {1}. Can you tell me more about what’s been going on?']),
    (r'(.*) (happy|joyful|excited)',
     ['That’s great to hear! What has been making you feel {1}?']),
    (r'I feel (.*)', ['Why do you feel {0}?', 'What makes you feel {0}?']),
    (r'why (.*)', ['Why do you think {0}?', 'Can you explain more why {0}?']),
    (r'(.*) stress (.*)',
     ['Stress can be tough to manage. What has been causing your stress?']),
    (r'(.*) anxiety (.*)',
     ['Anxiety can be overwhelming. What triggers your anxiety?']),
    (r'(.*) therapy (.*)',
     ['Therapy can be very helpful. Are you considering seeing a therapist?']),
    (r'(.*) recommend (.*)',
     ['I recommend practicing mindfulness and speaking to a professional if you feel overwhelmed.']),
    (r'thank you|thanks', ['You’re welcome!', 'No problem!']),
    (r'bye|goodbye|quit', ['Goodbye! Take care!', 'See you later!']),
    (r'(.*) support group',
     ['Support groups can be very beneficial. Would you like help finding one?']),
    (r'(.*) coping mechanisms',
     ['Some effective coping mechanisms include deep breathing, exercise, and talking to someone you trust.']),
    (r'(.*) crisis',
     ['If you are in crisis, please reach out to a crisis hotline or seek immediate help from a professional.']),
    (r'(.*) resources',
     ['You can find mental health resources through local organizations, online platforms, and professional therapists.']),
    (r'(.*)', ['I am here to listen. Please tell me more.',
     'Can you elaborate on that?', 'How does that make you feel?']),
]

# Create the chatbot
chatbot = Chat(patterns, reflections)


def format_response(response, match):
    for i, group in enumerate(match.groups()):
        response = response.replace(f'{{{i}}}', group)
    return response


def get_response(user_input):
    for pattern, responses in patterns:
        match = re.match(pattern, user_input)
        if match:
            response = chatbot.respond(user_input)
            return format_response(response, match)
    return "I'm sorry, I don't understand. Can you please rephrase?"
