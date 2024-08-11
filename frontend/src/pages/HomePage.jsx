// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import ProjectList from '../components/ProjectList';
import ProjectBoard from '../components/ProjectBoard';
import ToDoList from '../components/ToDoList';
import DoingList from '../components/DoingList';
import DoneList from '../components/DoneList';
import '../styles/HomePage.css'; // 确保样式路径正确

const HomePage = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
  ]);
  const [selectedProject, setSelectedProject] = useState(null);

  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState(
    [{ id: '1', name: 'Task 1' },
     { id: '2', name: 'Task 2' }],
  );


  
  const handleLogin = () => {
    navigate('/login');
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };
//
  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };


  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceTasks = Array.from(tasks[source.droppableId]);
    const [movedTask] = sourceTasks.splice(source.index, 1);
    const destinationTasks = Array.from(tasks[destination.droppableId]);
    destinationTasks.splice(destination.index, 0, movedTask);

    setTasks((prevTasks) => ({
      ...prevTasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destinationTasks,
    }));
  };

  return (
    <div className="app">
      <TopMenu onLogin={handleLogin} />
      <div className="main-content">
        <ProjectList projects={projects} onSelect={handleSelectProject} />
        <ToDoList tasks={tasks} onSelect={handleSelectTask} />
        <DoingList  />
        <DoneList  />
           {loggedIn && selectedProject && (
          <ProjectBoard tasks={tasks} onDragEnd={handleDragEnd} />
        )}

      </div>
    </div>
  );
};

export default HomePage;
