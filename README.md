# 🧠 Smart Task Manager – AI-Powered Productivity Web App

Smart Task Manager is a full-stack, AI-powered task management app that intelligently prioritizes your tasks using OpenAI's GPT. It uses MySQL for scalable storage and a FastAPI backend with a sleek React frontend.

---

## 🔗 Features

- ✅ Add tasks with title & description
- 🧠 Auto-prioritize using OpenAI GPT-3.5 (High / Medium / Low)
- 🔁 Sort by priority, created time, or updated time
- 🗂️ Filter tasks by completion status (Completed / Pending)
- ✅ Mark tasks as complete using checkbox
- 📦 Full CRUD operations
- ⚡ Powered by FastAPI, MySQL, React, and OpenAI

---

## 🧱 Tech Stack

| Layer        | Tech                                  |
|--------------|----------------------------------------|
| Frontend     | React, JavaScript, CSS                 |
| Backend      | FastAPI                                |
| AI Service   | OpenAI GPT-3.5                         |
| Database     | MySQL                                  |
| ORM          | SQLAlchemy                             |
| API Client   | Fetch API                              |
| Styling      | Custom CSS                             |

---

## 📁 Folder Structure

```
smart-task-manager/
├── backend/
│   ├── main.py              # FastAPI routes
│   ├── ai.py                # OpenAI API logic
│   ├── database.py          # DB and SQLAlchemy models
│   ├── schemas.py           # Pydantic models
│   └── .env                 # Env vars (OpenAI, MySQL)
├── ```
├──frontend/
├── public/
│  │   └── index.html         # Root HTML file
│  ├── src/
│  ├── App.js             # Main React component, contains logic and UI for task management
│  ├── Api.js             # All API calls to the FastAPI backend
│  ├── index.js           # React app entry point
│  ├── App.css            # Global CSS styles
│  ├── TaskForm.js        # Component for adding tasks
│  ├── TaskList.js        # Component for listing all tasks
│  └── Task.js            # (optional) Reusable task item component
└── package.json           # NPM dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Node.js & npm
- MySQL installed
- OpenAI API key

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/taskmanagement.git
cd taskmanagement
```

### 2. Setup Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate         # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file:

```
OPENAI_API_KEY=your_openai_key_here
DATABASE_URL=mysql+mysqlconnector://root:yourpassword$@localhost/smart_tasks   #connect to mysql db and create a table smart_tasks,also put yout pw 
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_HOST=localhost
MYSQL_DB=smart_tasks
```

Create database:

```sql
CREATE DATABASE smart_tasks;
```

Then run:

```bash
uvicorn main:app --reload
```

### 3. Setup Frontend (React)

```bash
cd frontend
npm install
npm start
```

App should be available at `http://localhost:3000`
Ensure your FastAPI backend is running at `http://localhost:8000` or update the `BASE_URL` in `Api.js` accordingly.
---

## 🔌 Backend API Endpoints

- `POST /tasks` – Create a new task (auto-prioritized)
- `GET /tasks` – Get all tasks (filter/sort support)
- `PUT /tasks/{task_id}` – Update task (completion or content)
- `DELETE /tasks/{task_id}` – Delete task

---

## 💡 AI Prompt Used

> "You are a task assistant. Classify the task as High / Medium / Low priority. Only respond with the priority."

---

## 📦 Dependencies

### Backend

```
fastapi
uvicorn
sqlalchemy
openai
python-dotenv
mysql-connector-python
pydantic
```
Install with:

```bash
pip install -r requirements.txt
```

### Frontend

```bash
npm install
```

---

## 📄 License

MIT License – use, modify, and distribute freely.

---

## 🙌 Author

Developed by [Mudra Bhattad](https://github.com/mudrabhattad)

---

## 🌟 Show Your Support

If you like this project, give it a ⭐ on GitHub!


