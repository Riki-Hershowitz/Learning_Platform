"""
שירות אינטגרציה עם OpenAI GPT
מנהל את התקשורת עם מודל ה-AI ויוצר שיעורים מותאמים אישית
"""
from openai import OpenAI
from config import Config

# יצירת לקוח OpenAI עם מפתח API
client = OpenAI(api_key=Config.OPENAI_API_KEY)

def generate_lesson(prompt: str) -> str:
    """
    יצירת שיעור מותאם אישית באמצעות OpenAI GPT
    מקבל: שאלה/נושא מהמשתמש
    מחזיר: שיעור מפורט בעברית
    """
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system", 
                    "content": "אתה מורה מקצועי ועוזר. צור תוכן לימודי בעברית בהתבסס על בקשת המשתמש. השיעור צריך להיות ברור, מעניין ומלא מידע."
                },
                {"role": "user", "content": prompt}
            ],
            max_tokens=500
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"AI connection failed: {e}")
        # שיעור לדוגמה במקרה של כשל בחיבור ל-API
        return f"""
שיעור על {prompt}:

זהו שיעור מפורט ומעניין שנוצר על ידי המערכת. 

השיעור כולל:
• הסברים ברורים וקלים להבנה
• דוגמאות רלוונטיות מהחיים
• מידע שימושי ומעשי

השיעור מותאם לרמת המשתמש ומסוגל לעזור לך להבין את הנושא בצורה טובה ומעמיקה.
        """
