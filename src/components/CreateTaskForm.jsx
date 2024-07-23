import React, { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function CreateTaskForm({ addTask }) {
  // State to manage form data (title and description)
  const [formData, setFormData] = useState({ title: '', description: '' });
  // State to track form validity
  const [isValid, setIsValid] = useState(true);

  // Handle input changes in form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setIsValid(true); // Reset validity on input change
  };

  // Handle form submission
  const handleAddTask = (event) => {
    event.preventDefault();
    // Check if title or description is empty
    if (formData.title.trim().length === 0 || formData.description.trim().length === 0) {
      setIsValid(false);
      return;
    }
    addTask(formData); // Add the new task
    setFormData({ title: '', description: '' }); // Reset form after submission
  };

  // Custom styles for TextField components
  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.3)', // Darker border color
        borderWidth: 3, // Border thickness
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.5)', // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.7)', // Border color when focused
      },
    },
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4, backgroundColor: '#f8f8f8' }}>
       {/* Form container */}
      <Box component="form" onSubmit={handleAddTask}>
        {/* TextField for task title */}
        <TextField
          fullWidth
          name="title"
          label="Enter The Task Title"
          value={formData.title}
          onChange={handleInputChange}
          margin="normal"
          error={!isValid}
          variant="outlined"
          sx={textFieldSx}
        />
        {/* TextField for task description */}
        <TextField
          fullWidth
          name="description"
          label="Enter The Task Description"
          value={formData.description}
          onChange={handleInputChange}
          margin="normal"
          multiline
          rows={3}
          error={!isValid}
          variant="outlined"
          sx={textFieldSx}
        />
        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ marginTop: 2 }}
        >
          Add Task
        </Button>
      </Box>
    </Paper>
  );
}

export default CreateTaskForm;