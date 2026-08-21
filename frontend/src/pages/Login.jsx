import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useSnackbar } from 'notistack';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    api
      .post('/auth/login', { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        enqueueSnackbar('Logged in', { variant: 'success' });
        navigate('/');
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data?.message || 'Login failed', { variant: 'error' });
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Login</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <input className="m-2 p-2 text-black dark:text-white" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="m-2 p-2 text-black dark:text-white" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="p-2 bg-sky-300 m-2" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
