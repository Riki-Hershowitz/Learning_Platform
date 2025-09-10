import os
from dotenv import load_dotenv

# טוען משתנים מה-.env
load_dotenv()

class Config:
    # חיבור ל-MongoDB
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/learning_platform")

    # מפתח ל-OpenAI 
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

    # סוד להצפנה / JWT
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")

    # מצב DEBUG (ברירת מחדל False)
    # DEBUG = os.getenv("DEBUG", "False").lower() == "true"
