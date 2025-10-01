import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useData } from '../context/DataContext';

export default function AddFacultyForm(){
  const { addFaculty, timeslots } = useData();
  const [name, setName] = useState('');
  const [availability, setAvailability] = useState([]);

  const toggleSlot = (id) => setAvailability(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Please enter faculty name');
    addFaculty({ name: name.trim(), availability });
    setName(''); setAvailability([]);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Add Faculty</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" value={name} onChange={e=>setName(e.target.value)} fullWidth margin="normal" />
        <Typography variant="subtitle2">Availability</Typography>
        <FormGroup>
          {timeslots.map(ts => (
            <FormControlLabel
              key={ts.id}
              control={<Checkbox checked={availability.includes(ts.id)} onChange={()=>toggleSlot(ts.id)} />}
              label={ts.label}
            />
          ))}
        </FormGroup>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Add Faculty</Button>
      </form>
    </Paper>
  );
}
