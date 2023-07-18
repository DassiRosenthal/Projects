import React, { useState, useEffect } from 'react';
import LogOut from './LogOut';
import LogIn from './LogIn';

export default function Authentication({ setError }) {
  const [username, setUsername] = useState();
  useEffect(() => {
    const currentUser = document.cookie.split('; ')
      .find((row) => row.startsWith('username='))
      ?.split('=')[1];
    if (currentUser !== 'undefined') {
        setUsername(currentUser);
    }
  }, []);
  const setCurrentUser = (newUsername) => {
    setUsername(newUsername);
    document.cookie = `username = ${newUsername}; path=/`;
  }

  const content = username
    ? <LogOut username={username} setUsername={setCurrentUser} setError={setError} />
    : <LogIn setUsername={setCurrentUser} setError={setError} />;

  return (
    <div className='login-form'>
      {content}
    </div>
  );
}
