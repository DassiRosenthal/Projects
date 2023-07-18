import './Header.css';
import React from 'react'
import { NavLink } from 'react-router-dom';
import Authentication from './Authentication';
import Error from './Error';

window.onscroll = ()=>{
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById('logo').style.width = '8%';
  } else {
    document.getElementById('logo').style.width = '15%';
  }
};

export default function Header({ error, setError }) {
  return (
    <header >
      <img id='logo' src='logo192.png' alt='In Other Words'></img>
      <div>
        <Authentication setError={setError} />
        <Error error={error} setError={setError} />
      </div>
      <nav>
        <NavLink className='header-button' to='/'>Home</NavLink> <NavLink className='header-button' to='/addPost'>Add Post</NavLink>
      </nav>


    </header>
  )
}
