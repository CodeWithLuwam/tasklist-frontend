import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function CreateTaskForm({ addTask }) {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setIsValid(true);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (formData.title.trim().length === 0 || formData.description.trim().length === 0) {
      setIsValid(false);
      return;
    }
    addTask(formData);
    setFormData({ title: '', description: '' });
  };

  return (
    <Box component="form" onSubmit={handleAddTask} sx={{ marginBottom: 4 }}>
      <TextField
        fullWidth
        name="title"
        label="Task Title"
        value={formData.title}
        onChange={handleInputChange}
        margin="normal"
        error={!isValid}
      />
      <TextField
        fullWidth
        name="description"
        label="Task Description"
        value={formData.description}
        onChange={handleInputChange}
        margin="normal"
        multiline
        rows={3}
        error={!isValid}
      />
      <Button
        type="submit"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ marginTop: 2 }}
      >
        Add Task
      </Button>
    </Box>
  );
}

export default CreateTaskForm;