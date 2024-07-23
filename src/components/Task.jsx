import React from 'react';
import { Card, CardContent, Typography, IconButton, Checkbox, Button } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const Task = ({ id, title, description, isComplete, isInProgress, deleteTask, toggleIsComplete, moveToInProgress, moveToPaused, draggable, onDragStart }) => {
  // Handler for marking a task as complete
  const handleMarkComplete = (event) => {
    toggleIsComplete(id);
  };

  const handleDeleteTask = () => {
    deleteTask(id);
  };

  // Handler for moving a task to "In Progress" state
  const handleMoveToInProgress = () => {
    moveToInProgress(id);
  };

  // Handler for moving a task from "Complete" to "In Progress" state
  const handleMoveToPaused = () => {
    moveToPaused(id);
  };

  return (
    <Card
      sx={{ 
        marginBottom: 2, 
        opacity: isComplete ? 0.6 : 1, // Reduce opacity for completed tasks
        cursor: draggable ? 'grab' : 'default', // Change cursor for draggable tasks
        '&:active': {
          cursor: 'grabbing' // Change cursor when dragging
        }
      }}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <CardContent>
        {/* Task title */}
        <Typography variant="h6" component="div" sx={{ textDecoration: isComplete ? 'line-through' : 'none' }}>
          {title}
        </Typography>
        {/* Task description */}
        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: isComplete ? 'line-through' : 'none' }}>
          {description}
        </Typography>
        {/* Task action buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          {/* Checkbox for marking task as complete */}
          <Checkbox
            checked={isComplete}
            onChange={handleMarkComplete}
            color="primary"
          />
          {/* "Start" button for tasks not in progress and not complete */}
          {!isInProgress && !isComplete && (
            <Button
              startIcon={<PlayArrowIcon />}
              onClick={handleMoveToInProgress}
              size="small"
              variant="outlined"
            >
              Start
            </Button>
          )}
          {/* "Pause" button for completed tasks */}
          {isComplete && (
            <Button
              startIcon={<PauseIcon />}
              onClick={handleMoveToPaused}
              size="small"
              variant="outlined"
            >
              Pause
            </Button>
          )}
          {/* Delete button */}
          <IconButton aria-label="delete" onClick={handleDeleteTask} size="small">
            <DeleteForeverOutlinedIcon/>
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;