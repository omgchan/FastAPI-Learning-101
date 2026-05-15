from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()
db_url = f"postgresql://{os.getenv('db_user')}:{os.getenv('db_password')}@{os.getenv('host')}:{os.getenv('port')}/{os.getenv('db_name')}"
engine = create_engine(db_url)
session = sessionmaker(autocommit=False, autoflush=False, bind=engine)