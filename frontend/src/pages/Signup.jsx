import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import ThemeToggle from '../components/ThemeToggle';

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
    <div className="shelf-auth-page">
      <header className="shelf-auth-nav">
        <Link className="shelf-auth-brand" to="/">
          <span className="shelf-auth-brand-mark"><PiBookOpenTextLight /></span>
          Book Nook
        </Link>
        <ThemeToggle />
      </header>
      <main className="shelf-auth-main">
        <p className="shelf-auth-kicker">Start your collection</p>
        <h1 className="shelf-auth-title">Make a little room.</h1>
        <div className="shelf-auth-panel">
        <input aria-label="Name" autoComplete="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input aria-label="Email" autoComplete="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="shelf-auth-password">
          <input
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            aria-label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        <button className="shelf-action-button" onClick={handleSignup}>Create account</button>
        </div>
        <p className="shelf-auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
      </main>
    </div>
  );
};

export default Signup;
  