import React from 'react';

export default function ReminderToggle({ value, onToggle }) {
  return (
    <label className="reminder-toggle">
      <input type="checkbox" checked={value} onChange={onToggle} />
      <span>Set Reminder</span>
    </label>
  );
}
