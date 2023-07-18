import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className='route page-not-found'>
      <h2>404 Page not found.  <Link to='/'>Go To Home Page</Link></h2>
    </div>
  )
}
