import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  password: string;
  
}

const textFieldProps = {
  variant: 'filled' as const,
  fullWidth: true,
  sx: {
    mb: 2,
    color: 'black',
    background: 'white',
    width: 'calc(85% - 2px)',
    borderRadius: '5px',
    
  },
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between' as const,
};

interface LoginScreenProps {
  onLogin: (isLoggedIn: boolean) => void;
  onLogout: () => void; 
  setAuthToken: (token: string | null) => void;
  setIsUserLoggedIn: (isLoggedIn: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  setAuthToken,
  setIsUserLoggedIn,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
          setAuthToken(authToken);
          setIsUserLoggedIn(true);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Nastala chyba:', error.message);
        } else {
          console.error('Nastala neznámá chyba');
        }
      }
    };

    checkTokenValidity(); 

    const interval = setInterval(checkTokenValidity, 60000); 
    return () => clearInterval(interval);
  }, [setAuthToken, setIsUserLoggedIn]);

  const handleClickLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user: User = { email, password };
    console.log(user);

    try {
      const response = await fetch("http://10.1.1.5:8080/api/v1/auth/login", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        const token = responseData.token;

        // Uložení tokenu do localStorage nebo jiného úložiště
        localStorage.setItem('authToken', token);

        // Nastavení tokenu a stavu přihlášení
        setAuthToken(token);
        setIsUserLoggedIn(true);

        console.log("Přihlášení proběhlo úspěšně");
        onLogin(true);
        navigate('/mainroutes');
      } else if (response.status === 403) {
        console.error('Chyba při přihlášení:', response.statusText);
        const responseData = await response.json();
        setResponse(responseData.token);
      } else {
        console.error('Nastala neznámá chyba');
        const responseData = await response.json();
        setResponse(responseData.token);
      }
      
    } catch (error) {
      if (error instanceof Error) {
        console.error('Nastala chyba:', error.message);
      } else {
        console.error('Nastala neznámá chyba');
      }
    }
  };

  const responseDisplay = response ? <div>{response}</div> : null;

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        maxWidth: '350px',
        border: '1px solid #ccc',
        padding: '15px',
        paddingTop: '0px',
        backgroundColor: 'hsl(210, 100%, 50%)',
        borderRadius: '10px',
      }}
      noValidate
      autoComplete="off"
    >
      <h1 style={{ color:'black' }} ><u>Login</u></h1>
      <TextField
        id="outlined-basic-email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        {...textFieldProps}
      />
      <TextField
        id="outlined-basic-password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        {...textFieldProps}
      />
      <Box sx={buttonContainerStyle}>
        <Button
          variant="contained"
          color='error'
          style={{ fontSize: '18px', marginLeft: '20px', margin: '10px'}}
          onClick={ handleClickLogin }
        >
          Přihlásit se
        </Button>
        <Button 
        href="/registration" 
        variant="contained"
        color='secondary'
        style={{ fontSize: '12px', marginLeft: '20px', margin: '10px'}}
        >
          <span>Registrace</span>
        </Button>
      </Box>
      <div style={{ color: 'black', marginBottom: '15px'}}>
        {responseDisplay}
      </div>
    </Box>
  );
}

export default LoginScreen;
