import React, { useState } from 'react';
import '../styles/AddTaskModal.css'; // 引入样式

const AddTaskModal = ({ onClose, onSave, projectId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('todo');
  const [attachments, setAttachments] = useState([]);

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newAttachments.push({
          name: file.name,
          base64Content: reader.result.split(',')[1], // Extract base64 content
        });

        // Set the attachments after all files have been processed
        if (newAttachments.length === files.length) {
          setAttachments(newAttachments);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    if (name && description && content) {
      onSave({ name, description, content, status, projectId, attachments });
      onClose();
    }
  };

  return (
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
        <label>
          Attachments:
          <input type="file" multiple onChange={handleAttachmentChange} />
        </label>
        <button onClick={handleSubmit}>Save Task</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTaskModal;
