from sqlalchemy import create_engine 
from sqlalchemy.ext.declarative import declarative_base  
from sqlalchemy.orm import sessionmaker 

# Define the URL for connecting to the MySQL database
SQLALCHEMY_DATABASE_URL = "mysql://root:thota@localhost/todo_list"

# Create an engine instance to manage the connection pool and database interactions
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create a configured "Session" class bound to the engine, with autocommit and autoflush disabled
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for declarative class definitions
Base = declarative_base()

# Dependency to get a database session. This will be used in the application to interact with the database.
def get_db():
    db = SessionLocal() 
    try:
        yield db 
    finally:
        db.close()  
