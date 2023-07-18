import React from 'react'

export default function LogOut({ username, setUsername, setError }) {
  async function logout() {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setUsername();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className='current-user-display'>
      <span >Welcome {username}!</span>
      <button className='header-button' onClick={logout}>Logout</button>
    </div>
  )
}
