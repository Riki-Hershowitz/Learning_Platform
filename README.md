# AI-Driven Learning Platform

<p align="center">
  <img src="./demo.gif" alt="Demo" width="600"/>
</p>
פלטפורמת למידה חכמה מבוססת AI – מערכת מודרנית, מאובטחת, רספונסיבית ומודולרית.  
מאפשרת לכל משתמש לבחור תחום עניין, לשאול שאלות ל־AI, לקבל שיעורים מותאמים אישית, לשמור היסטוריית למידה, ולמנהל – לנהל את כל המשתמשים והפעילות.

---

## מה מיוחד בפרויקט?
- למידה מותאמת אישית – כל משתמש בוחר קטגוריה ותת־קטגוריה, שולח שאלה ומקבל שיעור שנוצר ע"י AI (OpenAI GPT).
- היסטוריית למידה – כל שיעור נשמר, ניתן לחזור ולעיין בו בכל רגע.
- לוח מנהל מתקדם – צפייה בכל המשתמשים, כל הפרומפטים, כולל חיפוש, מיון ודפדוף.
- אבטחה מלאה – כל פעולה דורשת JWT Token, כולל הרשאות מנהל.
- UI מודרני ונגיש – RTL, רספונסיבי, עם חוויית משתמש נעימה.
- קוד מודולרי – הפרדה מלאה בין שכבות (API, שירותים, מודלים, תצורה).
- תיעוד מלא – קבצי .env לדוגמה, ולידציה, ניהול שגיאות, Best Practices.

---

## פיצ'רים עיקריים
- רישום משתמש חדש (כולל אימות טלפון, שמירת שם, קבלת JWT).
- בחירת קטגוריה ותת־קטגוריה מתוך רשימה דינמית.
- שליחת prompt ל־AI וקבלת שיעור מותאם אישית.
- היסטוריית למידה – גישה לכל השיעורים שנוצרו.
- לוח מנהל – ניהול משתמשים וצפייה בפרומפטים עם חיפוש ודפדוף.
- אימות משתמשים עם JWT – כל קריאה ל־API מוגנת.
- ניהול שגיאות, ולידציה, והודעות ברורות למשתמש.

---

## טכנולוגיות עיקריות

Frontend: React, TypeScript, Vite, TailwindCSS  
Backend: Python 3.11+, FastAPI, PyMongo, python-jose (JWT), dotenv  
Database: MongoDB Atlas (ענן)  
AI Integration: OpenAI GPT API (או Mock)  
Authentication: JWT Authentication  
תיעוד: Swagger (אוטומטי ב־FastAPI)  


---

## התקנה והרצה

### 1. הגדרת MongoDB Atlas
- צרו חשבון ב־MongoDB Atlas.  
- צרו Cluster, Database ו־Collection.  
- העתיקו את ה־Connection String.  

### 2. התקנת ה־Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate # ב-Windows: venv\Scripts\activate
pip install -r requirements.txt
```

עדכנו קובץ `.env` לפי `.env.example`:
```bash
MONGO_URI=your_mongo_atlas_uri
OPENAI_API_KEY=your_openai_api_key
SECRET_KEY=your_super_secret_key
```

הרצת השרת:
```bash
uvicorn main:app --reload
```

### 3. התקנת ה־Frontend
```bash
cd frontend
npm install
```

עדכנו קובץ `.env` לפי `.env.example` (כתובת ה־API אם צריך).  

הרצת הפרונט:
```bash
npm run dev
```

---

## JWT Authentication
כל משתמש שנרשם מקבל JWT Token מהשרת.  
כל קריאה ל־API (שליחת prompt, היסטוריה, לוח מנהל) דורשת Header:

```bash
Authorization: Bearer <token>
```

השרת בודק את ה־Token ומאפשר גישה רק למורשים.

---

## דוגמת Use Case
1. ישראל נרשם עם שם וטלפון.  
2. בוחר קטגוריה: "מדע" ותת־קטגוריה: "אסטרונומיה".  
3. שולח prompt: "Teach me about black holes".  
4. ה־AI מחזיר שיעור מותאם אישית.  
5. ישראל צופה בשיעור וכל ההיסטוריה נשמרת.  
6. המנהל רואה את כל המשתמשים והפרומפטים בלוח הבקרה.  

---

## Best Practices
- קוד מודולרי, קריא, עם הפרדה בין שכבות.  
- כל קוד רגיש נשמר בקובץ .env.  
- כל קריאה ל־API מוגנת ב־JWT.  
- ולידציה ובדיקות שגיאות בכל שכבה.  
- תיעוד אוטומטי ב־/docs (Swagger).  

---

## בדיקות
- כל הפיצ'רים נבדקו מקצה לקצה.  
- ניתן להוסיף בדיקות אוטומטיות עם pytest (Backend) ו־jest (Frontend).  

---


## פלטפורמת הלמידה החכמה – העתיד של הלמידה כבר כאן 
## © רבקה הרשוביץ
