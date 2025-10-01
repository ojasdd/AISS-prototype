import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useData } from '../context/DataContext';

export default function AddClassroomForm(){
  const { addClassroom } = useData();
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState(30);
  const [type, setType] = useState('Lecture');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Please enter room name');
    addClassroom({ name: name.trim(), capacity: Number(capacity), type });
    setName(''); setCapacity(30); setType('Lecture');
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Add Classroom</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Room Name" value={name} onChange={e=>setName(e.target.value)} fullWidth margin="normal" />
        <TextField label="Capacity" type="number" value={capacity} onChange={e=>setCapacity(e.target.value)} fullWidth inputProps={{ min: 1 }} margin="normal" />
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Type</InputLabel>
          <Select value={type} label="Type" onChange={e=>setType(e.target.value)}>
            <MenuItem value="Lecture">Lecture</MenuItem>
            <MenuItem value="Lab">Lab</MenuItem>
            <MenuItem value="Tutorial">Tutorial</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Add Classroom</Button>
      </form>
    </Paper>
  );
}
