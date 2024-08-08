import React from 'react';
import '../styles/ToDoList.css';

const ToDoList = ({ tasks, onSelect }) => {
  return (
    <div className="todo-list">
      <h2> To Do</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-item"
          onClick={() => onSelect(task)}
        >
          <p>{task.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ToDoList;