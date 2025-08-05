from sqlalchemy import create_engine, Column, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import uuid
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Use MySQL instead of SQLite
# Format: mysql+mysqlconnector://user:password@host/dbname
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+mysqlconnector://root:yourpassword@localhost/smart_tasks")

Base = declarative_base()

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Task(Base):
    __tablename__ = "tasks"
    id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255))
    description = Column(String(1000))
    priority = Column(String(10))
    is_complete = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
