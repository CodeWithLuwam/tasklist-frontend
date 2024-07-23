import React from 'react';
import { Card, CardContent, Typography, IconButton, Checkbox } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
const Task = ({ id, title, description, isComplete, deleteTask, toggleIsComplete, draggable, onDragStart }) => {
  const handleMarkComplete = (event) => {
    toggleIsComplete(id);
  };

  const handleDeleteTask = () => {
    deleteTask(id);
  };

  return (
    <Card
      sx={{ marginBottom: 2, opacity: isComplete ? 0.6 : 1 }}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <CardContent>
        <Typography variant="h6" component="div" sx={{ textDecoration: isComplete ? 'line-through' : 'none' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: isComplete ? 'line-through' : 'none' }}>
          {description}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
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