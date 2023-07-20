import './Header.css';
import React from 'react'
import { NavLink } from 'react-router-dom';
import Authentication from './Authentication';
import Error from './Error';

window.onscroll = ()=>{
  var checkScreenSize = window.matchMedia("(max-width: 750px)")
  let largeLogo;
  let smallLogo;
  if(checkScreenSize.matches){
    largeLogo = '20%';
    smallLogo = '15%';
  }
  else{
    largeLogo = '15%';
    smallLogo = '8%';
  }
  if (document.body.scrollTop > 45 || document.documentElement.scrollTop > 45) {
    document.getElementById('logo').style.width = smallLogo;
  } else {
    document.getElementById('logo').style.width = largeLogo;
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
