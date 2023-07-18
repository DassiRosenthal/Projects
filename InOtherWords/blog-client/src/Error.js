import React, { useEffect } from 'react'

export default function Error({error, setError}) {
  useEffect(() => {
    setTimeout(() => setError(), 5000);
  }, [error, setError]);

  return (
    <div className='error'>{error}</div>
  )
}
