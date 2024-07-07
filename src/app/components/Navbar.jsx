import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home" component={Link} href="/">
          <HomeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
