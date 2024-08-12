import React from 'react';
import '../styles/DoingList.css';

const DoingList = ({ tasks=[], onSelect } ) => {
  return (
    <div className="doing-list">
      <h2> Doing </h2>
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

export default DoingList;