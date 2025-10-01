import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import AddFacultyForm from '../components/AddFacultyForm';
import AddCourseForm from '../components/AddCourseForm';
import AddClassroomForm from '../components/AddClassroomForm';
import DataPreview from '../components/DataPreview';


export default function AdminDashboard(){
  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}><AddFacultyForm /></Grid>
        <Grid item xs={12} md={4}><AddCourseForm /></Grid>
        <Grid item xs={12} md={4}><AddClassroomForm /></Grid>
        <Grid item xs={12}><DataPreview /></Grid>
      </Grid>
    </Container>
  );
}
