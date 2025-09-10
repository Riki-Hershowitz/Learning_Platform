from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)
db = client["learning_platform"]

# שמות קולקציות
users_col = db["users"]
categories_col = db["categories"]
sub_categories_col = db["sub_categories"]
prompts_col = db["prompts"]
