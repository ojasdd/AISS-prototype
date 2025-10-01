import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, CircularProgress, Alert, Paper, Box } from '@mui/material';
import axios from 'axios';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleGenerateTimetable = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('https://aiss-prototype-backend.onrender.com/timetable/generate');
      console.log(response.data);
      setSuccess(true);
      
      // Redirect to /timetable after 2 seconds
      setTimeout(() => {
        navigate('/timetable');
      }, 2000);
    } catch (err) {
      console.error('Error generating timetable:', err);
      setError(err.response?.data?.detail || 'Failed to generate timetable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom color="success.main">
          ✓ Data Sent Successfully!
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          Your dataset has been uploaded. Click the button below to generate the timetable.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Timetable generated successfully! Redirecting...
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateTimetable}
            disabled={loading || success}
            size="large"
          >
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                Generating...
              </>
            ) : success ? (
              'Generated ✓'
            ) : (
              'Generate Timetable'
            )}
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate('/AdminDashboard')}
            disabled={loading}
            size="large"
          >
            Back to Dashboard
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SuccessPage;