import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import LoggedVerify from './components/loggedVerify'
import BubbleEffect from './components/backgroundEffect'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BubbleEffect/>
        <Routes>
          <Route path='/' element={<Navigate to='/login'/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={
            <LoggedVerify>
              <LoginPage/>
            </LoggedVerify>
            }/>
          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>}/>
        </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
