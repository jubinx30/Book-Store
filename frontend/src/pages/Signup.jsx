import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useSnackbar } from 'notistack';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignup = () => {
    api
      .post('/auth/signup', { email, password, name })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        enqueueSnackbar('Account created', { variant: 'success' });
        navigate('/');
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data?.message || 'Signup failed', { variant: 'error' });
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Signup</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <input className="m-2 p-2 text-black dark:text-dark placeholder:text-slate-900" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="m-2 p-2 text-black dark:text-dark placeholder:text-slate-900" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="relative m-2">
          <input
            className="w-full p-2 pr-10 text-black dark:text-dark placeholder:text-slate-900"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center text-gray-600"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        <button className="p-2 bg-sky-300 m-2 text-2xl font-bold text-blue-800" onClick={handleSignup}>Create account</button>
      </div>
    </div>
  );
};

export default Signup;
  