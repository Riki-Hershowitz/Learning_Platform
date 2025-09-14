from fastapi import FastAPI
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from routers import users 
from routers import categories
from routers import sub_categories
from routers import prompts

load_dotenv()

app = FastAPI()
mongo_uri = os.getenv("MONGO_URI")

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# הוספת ה-router של המשתמשים
app.include_router(users.router)
app.include_router(prompts.router)
app.include_router(categories.router)
app.include_router(sub_categories.router)

try:
    client = MongoClient(mongo_uri)
    client.server_info()  # בודק אם החיבור אפשרי
    print("✅ חיבור ל-MongoDB הצליח!")
except Exception as e:
    print("❌ בעיה בחיבור ל-MongoDB:", e)

@app.get("/")
def root():
    return {"message": "Hello, FastAPI + MongoDB!"}
