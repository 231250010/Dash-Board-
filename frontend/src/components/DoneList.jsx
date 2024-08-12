import React from 'react';
import '../styles/DoneList.css';

const DoneList = ( { tasks=[], onSelect }) => {
  return (
    <div className="done-list">
      <h2> Done </h2>
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

export default DoneList;