import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ArrowDropDownRounded, ArrowRightRounded } from "@mui/icons-material";
import { useAuth } from "../redux/store/auth-context";
import Logo from "./Logo";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    textTransform: "capitalize !important",
    color: "black !important",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nestedSecondLevel: {
    paddingLeft: theme.spacing(8),
  },
  icon: {
    minWidth: "2.5rem !important",
  },
  nestedIcon: {
    minWidth: "2.5rem !important",
    marginLeft: "1rem !important",
  },
}));

const pages = ["Help"];
const settings = ["Profile", "Logout"];
const calendarSettings = { "Add Date": "/add", "List Dates": "/list" };

const NavBar = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElCalendar, setAnchorElCalendar] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const [openSecondLevel, setOpenSecondLevel] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickSecondLevel = () => {
    setOpenSecondLevel(!openSecondLevel);
  };
  const ctx = useAuth();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenCalendarMenu = (event) => {
    setAnchorElCalendar(event.currentTarget);
  };
  const handleCloseCalendarMenu = (e, setting, value = null) => {
    switch (setting) {
      case "Add Date":
        navigate(value);
        break;
      default:
        setAnchorElCalendar(null);
        break;
    }
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e, setting) => {
    switch (setting) {
      case "Logout":
        ctx.onLogout();
        break;
      case "Add":
        navigate("add");
        break;
      default:
        setAnchorElUser(null);
        break;
    }
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "transparent",
        zIndex: 999,
        boxShadow: "none",
        marginBottom: "-5rem",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo scale="0.75" />
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <List component="nav" aria-labelledby="nested-list-subheader">
                <ListItem
                  component={Button}
                  onClick={handleClick}
                  className={`${classes.button} `}
                >
                  <ListItemIcon className={classes.icon}>
                    {open ? (
                      <ArrowDropDownRounded
                        fontSize="large"
                        sx={{ color: "secondary.main" }}
                      />
                    ) : (
                      <ArrowRightRounded
                        fontSize="large"
                        sx={{ color: "secondary.main" }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText primary="Calendar" />
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  {Object.entries(calendarSettings).map(([k, v]) => (
                    <List key={k} component="div" disablePadding>
                      <ListItem
                        component={Button}
                        href={v}
                        className={`${classes.button} ${classes.nested}`}
                        onClick={handleClickSecondLevel}
                      >
                        <ListItemIcon className={classes.nestedIcon}>
                          <ArrowRightRounded fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary={k} />
                      </ListItem>
                    </List>
                  ))}
                </Collapse>
                {pages.map((page) => (
                  <ListItem
                    key={page}
                    component={Button}
                    onClick={handleCloseNavMenu}
                    className={`${classes.button} `}
                  >
                    <ListItemIcon className={classes.icon}>
                      <ArrowRightRounded fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary={page} />
                  </ListItem>
                ))}
              </List>
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Button
              key="Calendar"
              onClick={handleOpenCalendarMenu}
              sx={{
                my: 2,
                color: "secondary.main",
                display: "block",
                fontWeight: "600 !important",
              }}
            >
              Calendar
            </Button>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElCalendar}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElCalendar)}
              onClose={handleCloseCalendarMenu}
            >
              {Object.entries(calendarSettings).map(([k, v]) => (
                <MenuItem
                  key={k}
                  component={Button}
                  href={v}
                  className={`${classes.button} `}
                >
                  <Typography textAlign="center">{k}</Typography>
                </MenuItem>
              ))}
            </Menu>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "secondary.main",
                  display: "block",
                  fontWeight: "600 !important",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {ctx.isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={(e) => handleCloseUserMenu(e, setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Login">
                <Button
                  key="login"
                  href="/login"
                  sx={{
                    my: 2,
                    fontWeight: "600 !important",
                    color: "primary.main",
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "secondary.main",
                    "&:hover": { backgroundColor: "secondary.dark" },
                  }}
                >
                  Login
                </Button>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
