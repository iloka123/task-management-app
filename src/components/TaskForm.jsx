import React, { useState } from 'react';
import ReminderToggle from './ReminderToggle';

export default function TaskForm({ onAdd }) {
  // Local state for input fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reminder, setReminder] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Pass task data to parent
    onAdd({ title, description, reminder });

    // Reset input fields
    setTitle('');
    setDescription('');
    setReminder(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* Task title input */}
      <input
        type="text"
        placeholder="Enter task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-input"
        required
      />

      {/* Task description input */}
      <textarea
        placeholder="Optional description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="task-textarea"
        rows="3"
      />

      {/* Reminder toggle */}
      <ReminderToggle value={reminder} onToggle={() => setReminder(!reminder)} />

      {/* Add Task button */}
      <button type="submit" className="add-btn">
        Add Task
      </button>
    </form>
  );
}
