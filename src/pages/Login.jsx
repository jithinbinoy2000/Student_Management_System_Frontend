import React, { useState } from 'react';
import { loginAPI } from '../services/allAPIs';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginAPI(form);
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-white bg-black">
      <div
        elevation={6}
        className="w-full max-w-md p-8 border border-gray-800 shadow-xl rounded-2xl bg-black/70 backdrop-blur-xl"
      >
        <h1
          className="mb-8 text-2xl font-extrabold text-center text-white"
        >
          Student Management Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 text-white"
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ style: { color: '#cbd5e1' } }}
            InputProps={{ style: { color: '#f8fafc' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#475569' },
                '&:hover fieldset': { borderColor: '#60a5fa' },
              },
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ style: { color: '#cbd5e1' } }}
            InputProps={{ style: { color: '#f8fafc' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#475569' },
                '&:hover fieldset': { borderColor: '#60a5fa' },
              },
            }}
          />

          {error && (
            <Typography color="error" variant="body2" className="text-center">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            className="text-white transition-all duration-300 bg-red-600 hover:bg-red-700"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
