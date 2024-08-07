// src/components/ProjectList.jsx
import React from 'react';
import './ProjectList.css';

const ProjectList = ({ projects, onSelect }) => {
  return (
    <div className="project-list">
      <h2>Project List</h2>
      {projects.map((project) => (
        <div
          key={project.id}
          className="project-item"
          onClick={() => onSelect(project)}
        >
          <p>{project.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
