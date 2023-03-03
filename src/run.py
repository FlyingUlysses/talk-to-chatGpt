import os
import openai

msg_list=[]

def config_chat_gpt():
    global openai
    openai.api_key = "xx"
    to_chat_gpt("hi")


def to_chat_gpt(msg):
    global openai
    if(msg_list.__len__() > 5):
        msg_list.pop(0)
    msg_list.append({"role": "user", "content": msg})
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=msg_list
    )
    print(completion.choices[0].message.content)

def get_input():
    print("\nYou:\n")
    lines = []
    while True:
        line = input()
        if line == "":
            break
        lines.append(line)
    user_input = "/n".join(lines)
    return user_input

def main():
    config_chat_gpt()
    while True:
        msg = get_input()
        if msg.startswith("!"):
            if msg == "!exit":
                break

        print("Chatbot: ")
        to_chat_gpt(msg)    


if __name__ == "__main__":
    print(
        """
        Hello welcome to voice to chatGpt
        """,
    )
    main()
    