import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import Login from './pages/Login/index'
import Register from './pages/Register/index'
import Bookmarked from './pages/Bookmarked/index'
import Home from './pages/Home/index'
import Movies from './pages/Movies/index'
import Series from './pages/Series/index'
import About from './pages/About/index'
import './App.css'

function ProtectedRoute({ children, redirectTo = './login', isAuthenticated }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return isAuthenticated ? children : null;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUserInfos = JSON.parse(localStorage.getItem('userInfos')) || [];
    setIsAuthenticated(storedUserInfos.length > 0);
  }, []);

  return (
    <>
      <Routes>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
        <Route path="/bookmarked" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Bookmarked /></ProtectedRoute>} />
        <Route path="/movies" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Movies /></ProtectedRoute>} />
        <Route path="/series" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Series /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute isAuthenticated={isAuthenticated}><About /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
