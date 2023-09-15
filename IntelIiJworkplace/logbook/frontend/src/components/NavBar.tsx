import React, { useState } from 'react';
import { Box, AppBar, Toolbar } from '@mui/material';
import MuiButtons from './mycomponents';
import { Routes, Route, useNavigate } from 'react-router-dom';
import RegisterScreen from './RegisterScreen';
import MainRoutes from '../userroutes/MainRoutes';
import LoginScreen from './LoginScreen';

export default function NavBar() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (isLoggedIn: boolean) => {
    setIsUserLoggedIn(isLoggedIn);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsUserLoggedIn(false);
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1, paddingTop: '25px' }}>
      <AppBar>
        <Toolbar>
          <MuiButtons isUserLoggedIn={isUserLoggedIn} handleLogout={handleLogout} />
        </Toolbar>
      </AppBar>
      <Routes>
        <Route
          path='/login'
          element={
            <LoginScreen
              onLogin={handleLogin}
              onLogout={handleLogout}
              setAuthToken={(token: string | null) => {
              }}
              setIsUserLoggedIn={(isLoggedIn: boolean) => {
                setIsUserLoggedIn(isLoggedIn); // Předání hodnoty isUserLoggedIn do MainRoutes
              }}
            />
          }
        />
        <Route path='/registration' element={<RegisterScreen />} />
        <Route
          path='/mainroutes'
          element={<MainRoutes isUserLoggedIn={isUserLoggedIn} />} // Předání hodnoty isUserLoggedIn
        />
      </Routes>
    </Box>
  );
}
