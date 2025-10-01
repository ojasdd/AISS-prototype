import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { useData } from '../context/DataContext';

export default function DataPreview(){
  const navigate = useNavigate();
  const { faculties, courses, classrooms, timeslots, sendAllToBackend } = useData();

  const lookupSlot = (id) => timeslots.find(t => t.id === id)?.label ?? id;

  const handleSubmit = async () => {
    await sendAllToBackend(navigate);
  };

  return (
    <div>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Faculties</Typography>
        <Table size="small">
          <TableHead>
            <TableRow><TableCell>Name</TableCell><TableCell>Availability</TableCell></TableRow>
          </TableHead>
          <TableBody>
            {faculties.map(f => (
              <TableRow key={f.id}>
                <TableCell>{f.name}</TableCell>
                <TableCell>{f.availability.map(lookupSlot).join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Courses</Typography>
        <Table size="small">
          <TableHead><TableRow><TableCell>Name</TableCell><TableCell>Required Slots</TableCell></TableRow></TableHead>
          <TableBody>
            {courses.map(c => (
              <TableRow key={c.id}><TableCell>{c.name}</TableCell><TableCell>{c.requiredSlots}</TableCell></TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Classrooms</Typography>
        <Table size="small">
          <TableHead><TableRow><TableCell>Name</TableCell><TableCell>Capacity</TableCell><TableCell>Type</TableCell></TableRow></TableHead>
          <TableBody>
            {classrooms.map(r => (
              <TableRow key={r.id}><TableCell>{r.name}</TableCell><TableCell>{r.capacity}</TableCell><TableCell>{r.type}</TableCell></TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Button variant="contained" onClick={handleSubmit}>Send dataset to backend</Button>
    </div>
  );
}