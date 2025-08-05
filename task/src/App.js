import React, { useState, useEffect } from "react";
import {
  fetchTasks,
  addTask,
  updateTaskStatus,
  deleteTask,
} from "./Api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const handleAddTask = async () => {
    const newTask = {
      title,
      description,
      completed: false,
      priority: "Medium", // Default priority
      due_date: new Date().toISOString().split("T")[0], // Default today
    };
    const createdTask = await addTask(newTask);
    setTasks([...tasks, createdTask]);
    setTitle("");
    setDescription("");
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCheckboxChange = async (taskId, checked) => {
    await updateTaskStatus(taskId, checked);
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: checked } : task
      )
    );
  };

  const handleAIReorder = async () => {
    try {
      const response = await fetch("http://localhost:8000/tasks/ai-prioritize");
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("AI Prioritization failed:", err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "completed") return task.completed;
    if (filterStatus === "pending") return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      return new Date(a.due_date) - new Date(b.due_date);
    }
    if (sortBy === "priority") {
      const priorities = { High: 3, Medium: 2, Low: 1 };
      return priorities[b.priority] - priorities[a.priority];
    }
    return 0;
  });

  return (
    <div className="app-container">
      <h1>Smart Task Manager</h1>

      <div className="input-container">
        <input
          placeholder="Enter Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Describe the task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddTask}>➕ Add Task</button>
      </div>

      <div className="controls">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="none">Sort By</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>

        <button onClick={handleAIReorder}>✨ AI Prioritize</button>
      </div>

      <div className="task-list">
        {sortedTasks.map((task) => (
          <div
            className={`task-card ${task.completed ? "completed" : ""}`}
            key={task.id}
          >
            <div className="task-header">
              <h3>{task.title}</h3>
              <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                ❌
              </button>
            </div>
            <p>{task.description}</p>
            <span className="priority-badge">Priority: {task.priority}</span>
            <span className="due-date">Due: {task.due_date}</span>

            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) =>
                    handleCheckboxChange(task.id, e.target.checked)
                  }
                />
                Mark as Completed
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
