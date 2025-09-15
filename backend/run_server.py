#!/usr/bin/env python3
"""
סקריפט להרצת השרת
"""
import uvicorn
from main import app

if __name__ == "__main__":
    print("🚀 מתחיל את השרת...")
    print("📍 השרת יהיה זמין בכתובת: http://localhost:8000")
    print("📖 תיעוד API: http://localhost:8000/docs")
    print("⏹️  לעצירת השרת: Ctrl+C")
    
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=8000, 
        reload=True,  # רענון אוטומטי כשמשנים קבצים
        log_level="info"
    )