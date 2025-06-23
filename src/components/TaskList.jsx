import React, { useState } from 'react';

export default function TaskList({ tasks, onRemove, onToggleComplete, onReorder }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Handle start of drag
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  // Handle drop and reorder
  const handleDrop = (index) => {
    if (draggedIndex === null) return;
    const newTasks = [...tasks];
    const [draggedItem] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(index, 0, draggedItem);
    onReorder(newTasks);
    setDraggedIndex(null);
  };

  // Display fallback if no tasks
  if (tasks.length === 0) return <p className="no-tasks">No tasks added yet.</p>;

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li
          key={task.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
          className={`task-item ${task.reminder ? 'reminder' : ''} ${task.completed ? 'completed' : ''}`}
        >
          <div className="task-content" onClick={() => onToggleComplete(task.id)}>
            <strong className="task-title">{task.title}</strong>
            {task.description && <p className="task-desc">{task.description}</p>}
          </div>
          <button onClick={() => onRemove(task.id)} className="delete-btn">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
