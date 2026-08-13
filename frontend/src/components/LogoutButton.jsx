import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <button className="p-2 bg-red-400 text-white rounded" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
