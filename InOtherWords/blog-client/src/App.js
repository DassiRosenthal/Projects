import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Posts from './Posts';
import AddPost from './AddPost';
import PageNotFound from './PageNotFound';
import Header from './Header';
import { useState } from 'react';

function App() {
  const [error, setError] = useState();
  return (
    <BrowserRouter>
      <Header error={error} setError={setError} />
      <Routes id='routes'>
        <Route path='/' element={<Posts setError={setError} />} />
        <Route path='addPost' element={<AddPost setError={setError} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
