import React, { useState } from 'react';
import Task from './Task';
import './TaskList.css';
import PropTypes from 'prop-types';
import { Paper, Typography, Grid } from '@mui/material';

// TaskList component manages the display and interaction of all tasks
//destructred from App.jsx
const TaskList = ({ tasks, deleteTask, toggleIsComplete, updateTask }) => {
  // State for drag and drop functionality
  const [draggedTask, setDraggedTask] = useState(null);
  const [targetSection, setTargetSection] = useState(null);

  // Handler for when a drag operation starts
  const handleDragStart = (e, task) => {
    setDraggedTask(task);
  };

  // Handler for when a dragged item is over a drop target
  const handleDragOver = (e, section) => {
    e.preventDefault();
    setTargetSection(section);
  };

  // Handler for when a dragged item is dropped
  const handleDrop = () => {
    if (draggedTask && targetSection) {
      const updatedTask = { 
        ...draggedTask, 
        isInProgress: targetSection === 'inProgress',
        isComplete: targetSection === 'done', 
      };
      if (targetSection === 'todo') {
        updatedTask.isInProgress = false;
        updatedTask.isComplete = false;
      }
      updateTask(updatedTask);
    }
    // Reset drag and drop state
    setDraggedTask(null);
    setTargetSection(null);
  };

  // Function to move a task to "In Progress" state
  const moveToInProgress = (taskId) => {
    // Find the task with the given taskId in the tasks array
    const taskToUpdate = tasks.find(task => task.id === taskId);

    // If a task with the given id is found
    if (taskToUpdate) {
      // ...taskToUpdate creates a shallow copy of the original task
      // isInProgress is set to true to move it to "In Progress"
      // isComplete is set to false in case it was previously completed
      // Create a new task object called updatedTask with updated properties
      const updatedTask = { ...taskToUpdate, isInProgress: true, isComplete: false };

      // Call the updateTask function (passed in as a prop from App.jsx) with the newly created updatedTask
      // This will update the task in the parent component's state
      updateTask(updatedTask);
    }
  };

  // Function to move a task from "Complete" to "In Progress" state by pressing 'Pause'
  const moveToPaused = (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, isInProgress: true, isComplete: false };
      updateTask(updatedTask);
    }
  };

  // Filter tasks into appropriate categories
  // These filtered arrays are used in the render method (renderTaskSection( 'To-do', todoTasks, 'todo'))
  // Tasks that are neither in progress nor complete
  const todoTasks = tasks.filter(task => !task.isInProgress && !task.isComplete);
  //Tasks that are in progress but not complete
  const inProgressTasks = tasks.filter(task => task.isInProgress && !task.isComplete);
  // doneTasks: Tasks that are marked as complete
  const doneTasks = tasks.filter(task => task.isComplete);
 
  // title: The title of the section (e.g., "To-do", "In Progress", "Done")
  // taskList: An array of task objects to be displayed in this section
  // sectionName: A string identifier for the section (e.g., "todo", "inProgress", "done")
  const renderTaskSection = (title, taskList, sectionName) => (
    // from Materiaal-UI xs={12}: Takes full width on extra small screens
    // md={4}: Takes 1/3 width on medium and larger screens
    <Grid item xs={12} md={4}>
      {/* Paper component for distinct surface for the task section */}
      <Paper 
        className="task-section" 
        elevation={3} // Adds a shadow effect
        // Event handler for when a dragged item is over this section
        onDragOver={(e) => handleDragOver(e, sectionName)}
        // Event handler for when a dragged item is dropped in this section
        onDrop={handleDrop}
      >
        {/* Typography component for the section title */}
        <Typography variant="h6" className={`${sectionName}-title`}>{title}</Typography>
        {/* Unordered list to contain the tasks */}
        <ul>
          {/* Map over the taskList array to render each task */}
          {taskList.map((task) => (
            // List item for each task, with a unique key for React's reconciliation process
            <li key={task.id}>
              {/* Task component to render individual task details */}
              <Task
                id={task.id}
                title={task.title}
                description={task.description}
                isComplete={task.isComplete}
                isInProgress={task.isInProgress}
                deleteTask={deleteTask}
                toggleIsComplete={toggleIsComplete}
                moveToInProgress={moveToInProgress}
                moveToPaused={moveToPaused}
                draggable // Enable dragging for this task
                // Event handler for when dragging of this task starts
                onDragStart={(e) => handleDragStart(e, task)}
              />
            </li>
          ))}
        </ul>
      </Paper>
    </Grid>
  );

  // Render the entire task list with all sections
  return (
    <div className="task-list">
      {/* Material-UI Grid container to create a responsive layout */}
      <Grid container spacing={2}>
        {/* Render the "To-do" section */}
        {/* 'To-do' is the title, todoTasks is the filtered array of tasks, 'todo' is the section identifier */}
        {renderTaskSection('To-do', todoTasks, 'todo')} 
        {renderTaskSection('In Progress', inProgressTasks, 'inProgress')}
        {renderTaskSection('Done', doneTasks, 'done')}
      </Grid>
    </div>
  );
};

// PropTypes for type checking
TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleIsComplete: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskList;