import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import ThemeToggle from '../components/ThemeToggle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    api
      .post('/auth/login', { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        enqueueSnackbar('Logged in', { variant: 'success' });
        navigate('/library');
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data?.message || 'Login failed', { variant: 'error' });
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
        <p className="shelf-auth-kicker">Your reading shelf</p>
        <h1 className="shelf-auth-title">Welcome back</h1>
        <div className="shelf-auth-panel">
        <input type="email" autoComplete="email" aria-label="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="shelf-auth-password">
          <input
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
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
        <button className="shelf-action-button" onClick={handleLogin}>Log in</button>
        </div>
        <p className="shelf-auth-switch">New to Book Nook? <Link to="/signup">Create an account</Link></p>
      </main>
    </div>
  );
};

export default Login;
