import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Typography,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
     
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-6 py-4 mt-0 text-white bg-gray-900 shadow-md">
      <div className="text-xl font-bold">🎓 Student Management</div>

      {user && (
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <Tooltip title="Profile">
            <IconButton onClick={handleClick} size="small">
              <Avatar sx={{ bgcolor: '#ef4444', width: 40, height: 40 }}>
                {user.username ? user.username[0].toUpperCase() : 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>

          {/*  Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 4,
              sx: {
                backgroundColor: '#1f2937',
                color: 'white',
                minWidth: 200,
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <div className="px-4 py-2">
              <Typography variant="subtitle1" className="font-bold">
                {user.username || 'User'}
              </Typography>
              <Typography variant="body2" className="text-gray-400 capitalize">
                {user.role || 'student'}
              </Typography>
            </div>

            <Divider sx={{ my: 1, backgroundColor: '#374151' }} />

            <MenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-white"
            >
              <LogoutIcon fontSize="small" />
              Logout
            </MenuItem>
          </Menu>
        </div>
      )}
    </header>
  );
}

export default Header;
