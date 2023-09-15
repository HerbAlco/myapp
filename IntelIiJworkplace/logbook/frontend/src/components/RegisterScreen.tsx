import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import './Comp.css';
import { useNavigate } from 'react-router-dom';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirm: string;
}

const textFieldProps = {
  variant: 'filled' as const,
  fullWidth: true,
  sx: {
    mb: 2,
    color: 'black',
    background: 'white',
    width: 'calc(100% - 2px)',
    borderRadius: '5px',
  },
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between' as const,
};

export default function RegisterScreen() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [response, setResponse] = useState<string>('');

  const navigate = useNavigate();

const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  const user: User = { firstname, lastname, email, password, confirm };
  console.log(user);

  try {
    const response = await fetch("http://10.1.1.5:8080/api/v1/auth/register", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
      if (response.status === 200) {
        const responseData = await response.json();
        setResponse(responseData.token);
        navigate('/login');
      } else if (response.status === 400) {
        console.error('Chyba při registraci:', response.statusText);
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
        maxWidth: '400px',
        border: '1px solid #ccc',
        padding: '20px',
        backgroundColor: 'hsl(210, 100%, 50%)',
        borderRadius: '10px',
      }}
      noValidate
      autoComplete="off"
    >
      <h1 style={{ color: 'black' }}><u>Registrace</u></h1>
      <TextField
        id="outlined-basic-firstname"
        label="Jméno"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        {...textFieldProps}
      />
      <TextField
        id="outlined-basic-lastname"
        label="Příjmení"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        {...textFieldProps}
      />
      <TextField
        id="outlined-basic-email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        {...textFieldProps}
      />
      <div >
        {response.includes('Email') && (
          <div style={{ color: 'red', marginBottom: '15px'}}>
            {responseDisplay}
          </div>
        )}
      </div>
      <TextField
          id="standard-password-input"
          label="Heslo"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          {...textFieldProps}
        />
      
      <TextField
        id="standard-password-input"
        label="Potvrzení hesla"
        type="password"
        autoComplete="current-password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        {...textFieldProps}
      />
      <div>
        {response.includes('Hesla') && (
          <div style={{ color: 'red', marginBottom: '15px'}}>
            {responseDisplay}
          </div>
        )}
      </div>
      <Box sx={buttonContainerStyle}>
      <Button
          href="/login"
          variant="contained"
        >
          <span>Přihlášení</span>
        </Button>
        <Button
          variant="contained"
          color="error"
          style={{ fontSize: '18px', marginLeft: '20px' }}
          onClick={handleClick}
        >
          Registrovat se
        </Button>
      </Box>

      
    </Box>
  );
}
