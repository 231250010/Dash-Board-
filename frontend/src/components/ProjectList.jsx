import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProjectList.css';

const ProjectList = ({ projects, onSelect, selectedProject }) => {
  const navigate = useNavigate();
  const handleaddproject = () => {
    navigate('/addproject');
  };
  return (
    <div className="project-list">
      <h2>Projects</h2>
      {projects.map((project) => (
        <div
          key={project.id}
          className={`project-item ${
            selectedProject && selectedProject.id === project.id ? 'selected' : ''
          }`}
          onClick={() => onSelect(project)}
        >
          <p>{project.name}</p>
        </div>
      ))}
    <button className="addproject-button" onClick={handleaddproject}>Add a project</button>
    </div>
  );
};

export default ProjectList;