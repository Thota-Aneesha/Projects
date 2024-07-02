from sqlalchemy.orm import Session
from models import UserModel
from schemas import UserCreate
from fastapi import HTTPException
import models, schemas

# Function to get a list of tasks with pagination
def get_tasks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Task).offset(skip).limit(limit).all()

# Function to create a new task
def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(
        title=task.title,
        description=task.description,
        due_date=task.due_date
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

# Function to delete a task by ID
def delete_task(db: Session, task_id: int):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    db.delete(db_task)
    db.commit()
    return db_task




# Function to create a new user
def create_user(db: Session, user: UserCreate):
    # Create a new instance of UserModel with the data from the request
    db_user = UserModel(**user.dict())
    try:
        # Add the new user to the session, commit changes, and refresh the instance to get the updated data
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        # If an error occurs, rollback the session and raise an HTTPException
        db.rollback()
        print(f"Error creating user: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Function to get all users
def get_users(db: Session):
    return db.query(UserModel).all()

# Function to authenticate a user
def authenticate_user(db: Session, username: str, password: str):
    user = db.query(UserModel).filter(UserModel.email == username, UserModel.password== password).first()
    # if not user:
    #     return HTTPException(status_code=404, detail="User not found")
   
    return user
