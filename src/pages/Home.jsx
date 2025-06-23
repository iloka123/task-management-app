import React, { useState } from 'react';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home({ tasks, onAdd, onRemove, onToggleComplete, onReorder }) {
  // Search/filter input state
  const [searchTerm, setSearchTerm] = useState('');

  // Filter tasks based on search input
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* Page header */}
      <Header />

      {/* Task input form */}
      <TaskForm onAdd={onAdd} />

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="task-input"
        style={{ marginBottom: '20px' }}
      />

      {/* Task list with filtering, remove, toggle, and reordering */}
      <TaskList
        tasks={filteredTasks}
        onRemove={onRemove}
        onToggleComplete={onToggleComplete}
        onReorder={onReorder}
      />
    </div>
  );
}
