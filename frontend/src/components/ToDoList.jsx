import React, { useState } from 'react';
import '../styles/ToDoList.css';

const ToDoList = ({ tasks = [], onSelect, onAddTask, selectedProject }) => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('todo');

  const handleAddTask = () => {
    if (name && description && content && selectedProject) {
      onAddTask({ name, description, content, status, projectId: selectedProject.id, userId: localStorage.getItem('userId') });
      setName('');
      setDescription('');
      setContent('');
      setStatus('todo');
      setIsAddTaskModalOpen(false);
    }
  };

  return (
    <div className="todo-list">
      <h2>To Do</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-item"
          onClick={() => onSelect(task)}
        >
          <p>{task.name}</p>
        </div>
      ))}
      <button className="addtask-button" onClick={() => setIsAddTaskModalOpen(true)}>Add a task</button>
      {isAddTaskModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Description:
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
              Content:
              <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </label>
            <label>
              Status:
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </label>
            <button onClick={handleAddTask}>Save Task</button>
            <button onClick={() => setIsAddTaskModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
