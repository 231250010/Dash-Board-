import React, { useState } from 'react';

const AttachmentModal = ({ onUpdate }) => {
  const [attachment, setAttachment] = useState(null);

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = () => {
    // 发送更新任务请求
    onUpdate(attachment);
  };

  return (
    <div className="attachment-modal">
      <input 
        type="file" 
        onChange={handleFileChange} 
      />
      <button onClick={handleSubmit}>Update Task</button>
    </div>
  );
};

export default AttachmentModal;
