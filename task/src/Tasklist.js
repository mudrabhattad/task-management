import React from 'react';

function TaskList({ tasks, onDelete }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <div>
              <p className="task-desc">{task.description}</p>
              {task.priority && (
                <span className="priority-badge">
                  Priority: {task.priority}
                </span>
              )}
            </div>
            <button onClick={() => onDelete(task.id)}>❌</button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
