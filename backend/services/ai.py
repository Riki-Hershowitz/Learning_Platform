# from config import Config
# import openai

# openai.api_key = Config.OPENAI_API_KEY

# def generate_lesson(prompt: str) -> str:
#     response = openai.Completion.create(
#         model="text-davinci-003",
#         prompt=prompt,
#         max_tokens=500
#     )
#     return response.choices[0].text.strip()

# services/ai.py
# from config import Config
# import openai

# # הגדרת מפתח API
# openai.api_key = getattr(Config, "OPENAI_API_KEY", None)

# def generate_lesson(prompt: str) -> str:
#     """
#     שולח את הפרומפט ל-OpenAI ומחזיר את הטקסט.
#     אם יש בעיה (למשל מפתח API לא תקין) מחזיר תשובה מוקדמת.
#     """
#     if not openai.api_key:
#         # fallback למצב שבו אין מפתח API
#         return f"[MOCK] Lesson for prompt: '{prompt}'"

#     try:
#         response = openai.Completion.create(
#             model="text-davinci-003",
#             prompt=prompt,
#             max_tokens=500
#         )
#         return response.choices[0].text.strip()
#     except Exception as e:
#         print("OpenAI Error:", e)
#         return f"[ERROR] Could not generate lesson: {e}"

from openai import OpenAI
from config import Config

client = OpenAI(api_key=Config.OPENAI_API_KEY)

def generate_lesson(prompt: str) -> str:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # או דגם אחר שאת רוצה
        messages=[
            {"role": "system", "content": "You are a helpful teaching assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=500
    )
    return response.choices[0].message.content.strip()
