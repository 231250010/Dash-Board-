import React, { useState } from 'react';
import '../styles/TaskModal.css'; // Make sure to create this CSS file for styling

const TaskModal = ({ task, onClose, onSave }) => {
  const [editedTask, setEditedTask] = useState({
    ...task,
    attachments: task.attachments || [],
    comments: task.comments || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve({
            name: file.name,
            base64Content: reader.result.split(',')[1], // Save the base64 content
          });
        };
      });
    });

    Promise.all(newAttachments).then((attachments) => {
      setEditedTask((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...attachments],
      }));
    });
  };

  const handleDownload = (attachment) => {
    const link = document.createElement('a');
    link.href = `data:application/octet-stream;base64,${attachment.base64Content}`;
    link.download = attachment.name;
    link.click();
  };

  const handleSave = () => {
    onSave(editedTask);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Task Details</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={editedTask.content}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={editedTask.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label>Attachments:</label>
          <input
            type="file"
            name="attachments"
            multiple
            onChange={handleFileUpload}
          />
          <ul>
            {editedTask.attachments.map((attachment, index) => (
              <li key={index}>
                {attachment.name}
                <button onClick={() => handleDownload(attachment)}>
                  Download
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label>Comments:</label>
          <textarea
            name="comments"
            value={editedTask.comments}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskModal;
