// GoogleSignInButton.jsx
// GoogleSignInButton.jsx
import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

const GoogleSignInButton = () => {
  const signInWithGoogle = async () => {
    try {
      console.log('Trying to sign in with Google...');
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log('Google Sign-In Result:', result);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <button onClick={signInWithGoogle}>
      Sign In with Google
    </button>
  );
};

export default GoogleSignInButton;
