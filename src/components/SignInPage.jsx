import React, { useState } from 'react';
import GoogleSignInButton from './GoogleSignInButton';
import {
  onAuthStateChanged,
  //createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

import './styles/SignInPage.css';

const SignInPage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEmailSignIn = async () => {
    try {
      setError(null);
      console.log('Attempting email/password sign-in...');
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign-in success:', result.user);
      setUser(result.user);
    } catch (error) {
      console.error('Sign-in error:', error);
      setError(error.message);
    }
  };

  /*
  const handleEmailSignUp = async () => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (error) {
      setError(error.message);
    }
  };
  */

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  if (user) {
    // If user is already signed in, navigate to /app
    return <Navigate to="/app" />;
  }

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true"></input>
      <div className="header">
        <h1>Sign In Page</h1>
      </div>
      <div className="signup">
        {/* Your email/password sign-in form */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required=""
            placeholder="Enter email"
            value={email} onChange={handleEmailChange} />

        </div>
        <div>
          <label>Password:</label>
          <input
            placeholder='Enter password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            required=""
          />
          <button onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </button>
        </div>
        <button onClick={handleEmailSignIn}>Sign In with Email/Password</button>

        {/* Your email/password sign-up form 
        <button onClick={handleEmailSignUp}>Sign Up with Email/Password</button>
        */}

        {/* Display error message if any */}
        {error && <p className="error-message">{error}</p>}

        {/* Add other sign-in methods */}
        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default SignInPage;