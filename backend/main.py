from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import case
from database import Base, engine, SessionLocal, Task
from schemas import TaskCreate, TaskUpdate, TaskResponse
from ai import get_priority_from_llm
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/tasks", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    priority = get_priority_from_llm(task.title, task.description)
    new_task = Task(
        title=task.title,
        description=task.description,
        priority=priority,
        is_complete=False,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@app.get("/tasks", response_model=list[TaskResponse])
def get_tasks(
    priority: str = Query(None),
    sort_by: str = Query(None, regex="^(priority|created_at|updated_at)$"),
    order: str = Query("asc", regex="^(asc|desc)$"),
    db: Session = Depends(get_db)
):
    query = db.query(Task)

    if priority:
        query = query.filter(Task.priority.ilike(priority))

    if sort_by == "priority":
        priority_order = case(
            (Task.priority == "High", 1),
            (Task.priority == "Medium", 2),
            (Task.priority == "Low", 3),
            else_=4
        )
        query = query.order_by(priority_order.asc() if order == "asc" else priority_order.desc())
    elif sort_by:
        column = getattr(Task, sort_by)
        query = query.order_by(column.asc() if order == "asc" else column.desc())

    return query.all()


@app.put("/tasks/{task_id}")
def update_task_status(task_id: int, update_data: dict, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if "completed" in update_data:
        task.completed = update_data["completed"]
        if task.completed:
            task.status = "Task Completed"
        else:
            task.status = "Not Completed"

    db.commit()
    db.refresh(task)
    return task


    db.commit()
    db.refresh(db_task)
    return db_task


@app.delete("/tasks/{task_id}")
def delete_task(task_id: str, db: Session = Depends(get_db)):
    db.query(Task).filter(Task.id == task_id).delete()
    db.commit()
    return {"message": "Deleted"}
