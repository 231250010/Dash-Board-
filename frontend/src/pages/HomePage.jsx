// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopMenu from '../components/TopMenu';
import ProjectList from '../components/ProjectList';
import ToDoList from '../components/ToDoList';
import DoingList from '../components/DoingList';
import DoneList from '../components/DoneList';
import TaskModal from '../components/TaskModal';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState({ todo: [], doing: [], done: [] });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const ownerId = localStorage.getItem('userId');
        const response = await axios.get(
          `http://127.0.0.1:7001/api/getProjectsByOwner?ownerId=${ownerId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (selectedProject) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:7001/api/getTasksByProject?projectId=${selectedProject.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          const tasksData = response.data;
          setTasks({
            todo: tasksData.filter(task => task.status === 'todo'),
            doing: tasksData.filter(task => task.status === 'doing'),
            done: tasksData.filter(task => task.status === 'done'),
          });
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }
    };

    fetchTasks();
  }, [selectedProject]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    
    if (storedUserId && storedUsername) {
      setUser({ id: storedUserId, username: storedUsername });
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      setUser(null);
    }
  }, []);
  

  const handleLogin = () => {
    navigate('/login');

  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTask = async (updatedTask) => {
    try {
      await axios.put(
        `http://127.0.0.1:7001/api/updateTask/${updatedTask.id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTasks((prevTasks) => ({
        ...prevTasks,
        [updatedTask.status]: prevTasks[updatedTask.status].map(task =>
          task.id === updatedTask.id ? updatedTask : task
        ),
      }));
      handleCloseModal();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      await axios.post(
        'http://127.0.0.1:7001/api/createTask',
        newTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTasks((prevTasks) => ({
        ...prevTasks,
        [newTask.status]: [...prevTasks[newTask.status], newTask],
      }));
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="app">
      <TopMenu user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <div className="main-content">
        <ProjectList
          projects={projects}
          onSelect={handleSelectProject}
          selectedProject={selectedProject}
        />
        {selectedProject && (
          <>
            <ToDoList
              tasks={tasks.todo}
              onSelect={handleSelectTask}
              onAddTask={handleAddTask}
              selectedProject={selectedProject}
            />
            <DoingList tasks={tasks.doing} onSelect={handleSelectTask} />
            <DoneList tasks={tasks.done} onSelect={handleSelectTask} />
          </>
        )}
        {isModalOpen && (
          <TaskModal
            task={selectedTask}
            onClose={handleCloseModal}
            onSave={handleSaveTask}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
