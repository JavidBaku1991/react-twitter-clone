import React, { useState } from 'react';
import axios from 'axios';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post('/login', { email, password });
        localStorage.setItem('token', response.data.token);
      } else {
        const response = await axios.post('/signup', { username, email, password, password_confirmation: passwordConfirmation });
        localStorage.setItem('token', response.data.token);
      }
      // Redirect to feed
      window.location.href = '/feed';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        )}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {!isLogin && (
          <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
    </div>
  );
}

export default Auth;