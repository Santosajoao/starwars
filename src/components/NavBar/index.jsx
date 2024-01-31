import * as React from 'react';
import { useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({ characterFilter }) {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '1.5rem' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1f1e1e' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#b3b2b1' } }}>
              <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>Pessoas</Link>
            </MenuItem>

            <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#b3b2b1' } }}>
              <Link to={"/planets"} target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>Planets</Link>
            </MenuItem>

            <MenuItem onClick={handleMenuClose} sx={{ '&:hover': { backgroundColor: '#b3b2b1' } }}>
              <Link to={"/starships"} target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>Starships</Link>
            </MenuItem>

          </Menu>
          <Link to={"/"}>
            <Box
              component="img"
              sx={{ width: 80, height: 70, marginRight: '1rem' }}
              src="/assets/logo.svg"
              alt="Star Wars Logo"
            />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
          >
            The Challange SWAPI
          </Typography>
          <Search characterFilter={characterFilter} onChange={(e) => characterFilter(e.target.value)}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
