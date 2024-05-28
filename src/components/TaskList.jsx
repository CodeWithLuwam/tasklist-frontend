import Task from './Task';
import './TaskList.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const TaskList = ({ tasks, deleteTask, toggleIsComplete, updateTask }) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [targetSection, setTargetSection] = useState(null);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e, section) => {
    e.preventDefault();
    setTargetSection(section);
  };

  const handleDrop = () => {
    if (draggedTask && targetSection) {
      // Update the task's status based on the target section
      const updatedTask = { 
        ...draggedTask, 
        isInProgress: targetSection === 'inProgress',
        isComplete: targetSection === 'done', 
      };
      if (targetSection === 'todo') {
        updatedTask.isInProgress = false;
        updatedTask.isComplete = false;
      }
    // Call a function to update the task in your state
    if (targetSection === 'done') {
      toggleIsComplete(updatedTask.id);
    } else {
      updateTask(updatedTask);
    }    
  }
    setDraggedTask(null);
    setTargetSection(null);
  };
  const todoTasks = tasks.filter(task => !task.isInProgress && !task.isComplete);
  const inProgressTasks = tasks.filter(task => task.isInProgress && !task.isComplete);
  const doneTasks = tasks.filter(task => task.isComplete);

  return (
    <div className="task-list">
      <div className="task-section"
        onDragOver={(e) => handleDragOver(e, 'todo')}
        onDrop={handleDrop}
      >
        <div className="todo-title">To-do</div>
        <ul>
          {todoTasks.map((task) => (
            <li key={task.id} >
              <Task
                id={task.id}
                title={task.title}
                description={task.description}
                isComplete={task.isComplete}
                deleteTask={deleteTask}
                toggleIsComplete={toggleIsComplete}
                draggable 
                onDragStart={(e) => handleDragStart(e, task)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div
        className="task-section"
        onDragOver={(e) => handleDragOver(e, 'inProgress')}
        onDrop={handleDrop}
      >
        <div className="inprogress-title">In Progress</div>
        <ul>
          {inProgressTasks.map((task) => (
            <li key={task.id} draggable onDragStart={(e) => handleDragStart(e, task)}>
              <Task
                id={task.id}
                title={task.title}
                description={task.description}
                isComplete={task.isComplete}
                deleteTask={deleteTask}
                toggleIsComplete={toggleIsComplete}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div
        className="task-section"
        onDragOver={(e) => handleDragOver(e, 'done')}
        onDrop={handleDrop}
      >
        <div className="done-title">Done</div>
        <ul>
          {doneTasks.map((task) => (
            <li key={task.id} draggable onDragStart={(e) => handleDragStart(e, task)}>
              <Task
                id={task.id}
                title={task.title}
                description={task.description}
                isComplete={task.isComplete}
                deleteTask={deleteTask}
                toggleIsComplete={toggleIsComplete}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;