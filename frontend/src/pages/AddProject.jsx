import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateProjectPage.css'; // 确保样式路径正确

const AddProject = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ownerId = localStorage.getItem('userId');

    try {
      const response = await axios.post('http://127.0.0.1:7001/api/createProject', {
        name,
        description,
        ownerId: parseInt(ownerId, 10)
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Project created:', response.data);
      navigate('/home'); // Redirect to home page or project list
    } catch (err) {
      console.error('Error creating project:', err);
      setError('Failed to create project. Please try again.');
    }
  };

  return (
    <div className="create-project-page">
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default AddProject;
