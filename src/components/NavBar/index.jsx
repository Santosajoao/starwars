import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useHref } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PublicIcon from "@mui/icons-material/Public";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [state, setState] = React.useState({
    left: false,
    searchOpen: false,
  });

  const handleReloadPage = () => {
    window.location.href = "/"; // Altera a localização para a rota inicial
  };
  

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchToggle = () => {
    setState({ ...state, searchOpen: !state.searchOpen });
  };

  const handleCloseSearch = () => {
    setState({ ...state, searchOpen: false });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[{ text: "Characters", link: "/" }].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>
                {index === 0 ? <EmojiPeopleIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[{ text: "Planets", link: "/planets" }].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{index === 0 ? <PublicIcon /> : null}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[{ text: "Starships", link: "/starships" }].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>
                {index === 0 ? <RocketLaunchIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ marginTop: "FitScreen", textAlign: "center", padding: 2 }}>
        <Typography variant="caption" color="textSecondary">
          &copy; 2024 João Pedro Araujo
        </Typography>
      </Box>
    </Box>
  );

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginBottom: "1.5rem",
        position: isScrolled && isMobile ? "fixed" : "relative",
        top: 0,
        zIndex: 1000,
        width: "100%",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#1f1e1e" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <Link to={"/"} onClick={handleReloadPage}>
            <Box
              component="img"
              sx={{ width: 60, height: 60, marginRight: "1rem" }}
              src="/assets/darth-vader-18583.png"
              alt="Star Wars Logo"
            />
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", sm: "flex" } }}
          >
            The Challange SWAPI
          </Typography>
          {isMobile ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open search"
              sx={{ ml: 2 }}
              onClick={handleSearchToggle}
            >
              <SearchIcon />
            </IconButton>
          ) : (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="top" open={state.searchOpen} onClose={handleCloseSearch}>
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </Drawer>
    </Box>
  );
}
