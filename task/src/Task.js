import React from "react";

const Task = ({ task, onToggle }) => {
  return (
    <div style={{ 
      border: "1px solid #ccc", 
      margin: "10px", 
      padding: "10px", 
      background: task.completed ? "#e0ffe0" : "#fff" 
    }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <button onClick={() => onToggle(task.id, !task.completed)}>
        {task.completed ? "Mark Incomplete" : "Mark Complete"}
      </button>
    </div>
  );
};

export default Task;
