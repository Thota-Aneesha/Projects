from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Base schema for a Task
class TaskBase(BaseModel):
    title: str
    description: str
    due_date: Optional[datetime]

# Schema for creating a new Task, inherits from TaskBase
class TaskCreate(TaskBase):
    pass

# Schema for updating an existing Task
class TaskUpdate(BaseModel):
    completed: Optional[bool]

class Task(TaskBase):
    id: int
    created_at: datetime
    completed: bool

    class Config:
        orm_mode = True

# Base schema for a User
class UserBase(BaseModel):
    name: str
    email: str
    password: str

# Schema for creating a new User, inherits from UserBase
class UserCreate(UserBase):
    pass

# Schema for a User, inherits from UserBase and adds additional fields
class User(UserBase):
    id: int
    class Config:
        orm_mode = True
