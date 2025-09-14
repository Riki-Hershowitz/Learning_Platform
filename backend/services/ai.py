# from openai import OpenAI
# from config import Config

# client = OpenAI(api_key=Config.OPENAI_API_KEY)

# def generate_lesson(prompt: str) -> str:
#     response = client.chat.completions.create(
#         model="gpt-3.5-turbo",  # או דגם אחר שאת רוצה
#         messages=[
#             {"role": "system", "content": "You are a helpful teaching assistant."},
#             {"role": "user", "content": prompt}
#         ],
#         max_tokens=500
#     )
#     return response.choices[0].message.content.strip()


from openai import OpenAI
from config import Config

client = OpenAI(api_key=Config.OPENAI_API_KEY)

def generate_lesson(prompt: str) -> str:
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful teaching assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        # במקרה של כשל, מחזירים דמו
        print(f"AI connection failed: {e}")
        return f"[DEMO LESSON] This is a demo response for the prompt: {prompt}"
