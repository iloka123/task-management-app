import React from 'react';

export default function Deleted({ deletedTasks, onRestore }) {
  return (
    <div className="container">
      {/* Page title */}
      <h2 className="about-title">Deleted Tasks</h2>

      {/* Show message if nothing is deleted */}
      {deletedTasks.length === 0 ? (
        <p className="no-tasks">No deleted tasks yet.</p>
      ) : (
        <ul className="task-list">
          {/* Loop through deleted tasks and show restore button */}
          {deletedTasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{task.title}</span>
              <button className="add-btn" onClick={() => onRestore(task.id)}>
                Restore
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
