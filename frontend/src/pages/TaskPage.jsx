import React from 'react';
//import { useNavigate } from 'react-router-dom';
import '../styles/TaskPage.css';

const TaskPage = () => {
  //const navigate = useNavigate();


  return (
    <div class="task-container">
    <div class="task-header">
        <div class="task-input">
            <label for="taskName">Task Name：</label>
            <input type="text" id="taskName" name="taskName"></input>
        </div>
        <div class="task-input">
            <label for="taskDate">Deadline：</label>
            <input type="text" id="taskDate" name="taskDate"></input>
        </div>
    </div>
    <div class="task-description">
        <label for="taskDescription">Task Description：</label>
        <textarea id="taskDescription" name="taskDescription"></textarea>
    </div>
    <div class="task-status">
        <label for="status">Task State：</label>
        <select id="status" name="status">
            <option value="todo">to do</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
        </select>
    </div>
    <div class="task-comment">
        <label for="taskComment">Comments：</label>
        <textarea id="taskComment" name="taskComment"></textarea>
    </div>
    <div class="task-attachment">
        <label for="attachment">Attachments：</label>
        <input type="file" id="attachment" name="attachment"></input>
    </div>
</div>
  );
};

export default TaskPage;
