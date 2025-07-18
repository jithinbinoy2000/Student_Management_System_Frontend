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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
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
      <div elevation={4} className="w-full max-w-sm p-8 text-white">
        <Typography variant="h5" className="mb-10 font-extrabold text-center text-white">
          Student Management Login
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-5 p-5 space-y-5 border-2 border-white/10 rounded-xl">
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
            className='border-2 border-blue-700'
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
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="text-white bg-red-600 hover:bg-red-700"
            disabled={loading}
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
