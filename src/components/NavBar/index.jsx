import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

export default function NavBar({ }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "1.5rem" }}>
      <AppBar position="static" sx={{ backgroundColor: "#1f1e1e" }}>
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
            <MenuItem
              onClick={handleMenuClose}
              sx={{ "&:hover": { backgroundColor: "#b3b2b1" } }}
            >
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                People
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenuClose}
              sx={{ "&:hover": { backgroundColor: "#b3b2b1" } }}
            >
              <Link
                to={"/planets"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Planets
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenuClose}
              sx={{ "&:hover": { backgroundColor: "#b3b2b1" } }}
            >
              <Link
                to={"/starships"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Starships
              </Link>
            </MenuItem>
          </Menu>
          <Link to={"/"}>
            <Box
              component="img"
              sx={{ width: 80, height: 70, marginRight: "1rem" }}
              src="/assets/logo.svg"
              alt="Star Wars Logo"
            />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            The Challange SWAPI
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
