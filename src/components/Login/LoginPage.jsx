import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';

function LoginPage() {
  const [loading, setLoading] = useState(false); // mock loading
  const [error, setError] = useState(null);      // mock error

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setError('Login failed: Invalid credentials');
    }, 1500);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 10, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Welcome Back 👋
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            required
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Box mt={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ py: 1.2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;
