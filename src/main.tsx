import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import LoginPage from './pages/Login'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginProvider } from './contexts/LoginContext/context'
import PrivateRoute from './components/PrivateRoute'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <Routes>
          <Route path='/' element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>}/>
        </Routes>
      </LoginProvider>
    </BrowserRouter>
    
  </StrictMode>,
)
