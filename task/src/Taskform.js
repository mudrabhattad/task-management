import React, { useState } from "react";

const TaskForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
