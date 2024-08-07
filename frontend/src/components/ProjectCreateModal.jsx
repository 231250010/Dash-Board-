import React, { useState } from 'react';

const ProjectCreatePage = ({ onCreate }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleSubmit = () => {
    // 发送创建项目请求
    onCreate(projectName, projectDescription);
  };

  return (
    <div className="project-create-page">
      <input 
        type="text" 
        placeholder="Project Name" 
        value={projectName} 
        onChange={(e) => setProjectName(e.target.value)} 
      />
      <textarea 
        placeholder="Project Description" 
        value={projectDescription} 
        onChange={(e) => setProjectDescription(e.target.value)} 
      />
      <button onClick={handleSubmit}>Add A Project</button>
    </div>
  );
};

export default ProjectCreatePage;
