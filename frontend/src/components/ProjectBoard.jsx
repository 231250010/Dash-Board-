import React from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../styles/ProjectBoard.css";

const ProjectBoard = ({ tasks, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="project-board">
        <Droppable droppableId="todo">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
              <h3>TODO</h3>
              {tasks.todo.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {task.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="done">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
              <h3>DONE</h3>
              {tasks.done.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {task.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default ProjectBoard;
