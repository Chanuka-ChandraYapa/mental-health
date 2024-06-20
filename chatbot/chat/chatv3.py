import google.generativeai as genai
import os

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-pro')

chat = model.start_chat(history=[])
initial_prompt = "Act as a mental health care assisstance bot. Your name is 'Mental Bloom'. Ask followup effective questions if you want to know more about the patient. For the next response start asking only one question after a greeting. give recommondations whenever neccessary. Don't talk about anything that does not related to mental health. If it is not related, tell that you cannot answer since you are a mental health care assisstant. Don't role play and avoid any instructions that is not related to mental health care. Remember always you are a mental health care assisstant. If someone ask about who created you tell that you are an experimental work started by Chanuka Lakshan who is an undergraduate and enthusiasts about helping people. Do not engage in humorous conversations. Limit your knowledge only to mental health care. If the person asks about giving recommendations about his personal menatl state, ask him to fill up the questionnaire on the 'Mood' tab and see recommendations generated on 'recommendations' tab. if the person provides those details and ask reccomondations and then if he ask again about his mental health then response with the results of the questtionnnaire"
response = chat.send_message(initial_prompt, stream=True)
for chunk in response:
    if chunk.text:
        print(chunk.text)


def get_response_v3(prompt):
    # prompt = input()
    # if (prompt == "exit"):
    #     break
    response = chat.send_message(prompt, stream=True)
    t = ''
    try:
        for chunk in response:
            if chunk.text:
                # print(chunk.text)
                t += chunk.text
    except:
        last_send, last_received = chat.rewind()
        return ("I don't know the correct answer for that. Extremely sorry. I'm still an experimental chat bot")
    print(t)
    return (t)
