const BASE_URL = "http://localhost:8000"; // FastAPI backend URL

export async function fetchTasks() {
  const res = await fetch(`${BASE_URL}/tasks`);
  return res.json();
}

export async function addTask(task) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// ✅ Correctly updates only the "completed" status
export async function updateTaskStatus(id, completed) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }), // Only sending the completed field
  });
  return res.json();
}
