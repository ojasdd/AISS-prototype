import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';
import { useData } from '../context/DataContext';

export default function AddCourseForm(){
  const { addCourse } = useData();
  const [name, setName] = useState('');
  const [requiredSlots, setRequiredSlots] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Please enter course name');
    addCourse({ name: name.trim(), requiredSlots: Number(requiredSlots) });
    setName(''); setRequiredSlots(1);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Add Course</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Course Name" value={name} onChange={e=>setName(e.target.value)} fullWidth margin="normal" />
        <TextField label="Required Slots" type="number" value={requiredSlots} onChange={e=>setRequiredSlots(e.target.value)} fullWidth inputProps={{ min: 1 }} margin="normal" />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Add Course</Button>
      </form>
    </Paper>
  );
}
