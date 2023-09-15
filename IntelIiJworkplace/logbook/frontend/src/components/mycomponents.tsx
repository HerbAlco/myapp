import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

interface MuiButtonsProps {
  isUserLoggedIn: boolean;
  handleLogout: () => void;
}

const MuiButtons: React.FC<MuiButtonsProps> = ({ isUserLoggedIn, handleLogout }) => {
  return (
    <ButtonGroup>
      <Button size="large" color="inherit" startIcon={<HomeIcon />}>
        <Link to={isUserLoggedIn ? '/mainroutes' : '/'} style={{ textDecoration: 'none', color: 'inherit' }}>
          Domů
        </Link>
      </Button>
      <Button size="large" color="inherit" startIcon={<MenuBookIcon />}>
        Kniha jízd
      </Button>
      <Button size="large" color="inherit" startIcon={<AccountCircleOutlinedIcon />}>
        Profil
      </Button>
      {isUserLoggedIn ? (
        <Button
          size="large"
          color="inherit"
          startIcon={<LogoutOutlinedIcon />}
          onClick={handleLogout}
        >
          Odhlásit se
      </Button>
      ) : (
        <Button size="large" color="inherit" startIcon={<LoginOutlinedIcon />}>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            Přihlásit se
          </Link>
        </Button>
      )}
    </ButtonGroup>
  );
};

export default MuiButtons;
