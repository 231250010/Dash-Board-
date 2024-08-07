import React, { useState } from 'react';

const TaskAddModal = ({ onAdd }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = () => {
    // 发送添加任务请求
    onAdd(taskName, taskDescription, attachment);
  };

  return (
    <div className="task-add-modal">
      <input 
        type="text" 
        placeholder="Task Name" 
        value={taskName} 
        onChange={(e) => setTaskName(e.target.value)} 
      />
      <textarea 
        placeholder="Task Description" 
        value={taskDescription} 
        onChange={(e) => setTaskDescription(e.target.value)} 
      />
      <input 
        type="file" 
        onChange={handleFileChange} 
      />
      <button onClick={handleSubmit}>Add A Task</button>
    </div>
  );
};

export default TaskAddModal;
