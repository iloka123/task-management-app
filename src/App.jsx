import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Deleted from './pages/Deleted';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });

  const [deletedTasks, setDeletedTasks] = useState(() => {
    const stored = localStorage.getItem('deletedTasks');
    return stored ? JSON.parse(stored) : [];
  });

  const [darkMode, setDarkMode] = useState(false);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
  }, [tasks, deletedTasks]);

  // Update <body> class for dark mode
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  // Add a new task
  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), completed: false, ...task }]);
  };

  // Remove and store deleted task
  const removeTask = (id) => {
    const taskToRemove = tasks.find((t) => t.id === id);
    if (taskToRemove) {
      setDeletedTasks([taskToRemove, ...deletedTasks]);
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  // Restore a task
  const restoreTask = (id) => {
    const taskToRestore = deletedTasks.find((t) => t.id === id);
    if (taskToRestore) {
      setTasks([taskToRestore, ...tasks]);
      setDeletedTasks(deletedTasks.filter((t) => t.id !== id));
    }
  };

  // Mark as completed/incomplete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Reorder tasks (drag and drop)
  const handleReorder = (newTasks) => {
    setTasks(newTasks);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">Task Manager</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/deleted">Deleted Tasks</Link>
          <button onClick={() => setDarkMode(!darkMode)} className="dark-toggle">
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              tasks={tasks}
              onAdd={addTask}
              onRemove={removeTask}
              onToggleComplete={toggleComplete}
              onReorder={handleReorder}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/deleted"
          element={<Deleted deletedTasks={deletedTasks} onRestore={restoreTask} />}
        />
      </Routes>
    </>
  );
}
