from fastapi import FastAPI, HTTPException, Depends, status  
from fastapi.middleware.cors import CORSMiddleware  
from fastapi.security import OAuth2PasswordRequestForm 
from sqlalchemy.orm import Session  
from typing import List  
import schemas, services, models 
from database import Base, engine, get_db  
from models import Task 
from schemas import User, UserCreate  
from services import create_user, get_users, authenticate_user  
# Initialize the FastAPI app
app = FastAPI()

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,  
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Task Endpoints

# Endpoint to update a task
@app.patch("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()  
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")  # Raise error if task not found
    for key, value in task.dict().items():
        setattr(db_task, key, value)  # Update task attributes
    db.add(db_task) 
    db.commit()  
    db.refresh(db_task) 
    return db_task  # Return the updated task

# Endpoint to read tasks with pagination
@app.get("/tasks/", response_model=List[schemas.Task])
def read_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    tasks = services.get_tasks(db, skip=skip, limit=limit) 
    print("Tasks data:", tasks)  # Debugging: log the tasks data
    return tasks  

# Endpoint to create a new task
@app.post("/tasks/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return services.create_task(db=db, task=task)  

# Endpoint to delete a task by ID
@app.delete("/tasks/{task_id}", response_model=schemas.Task)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = services.delete_task(db, task_id)  
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found") 
    return db_task  # Return the deleted task

# Endpoint to update a task by ID (PUT method)
@app.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = services.update_task(db=db, task_id=task_id, task=task)  
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")  
    return db_task  # Return the updated task

# User Endpoints

# Endpoint to read all users
@app.get("/users/", response_model=List[User], tags=["users"])
async def read_users(db: Session = Depends(get_db)):
    return get_users(db)  

# Endpoint to create a new user (signup)
@app.post("/users/signup", response_model=User, tags=["users"])
async def add_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)  

# Endpoint for user login
@app.post("/users/login", tags=["users"])
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)  # Authenticate the user
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")  
    return {"message": "Login successful", "user": user}  