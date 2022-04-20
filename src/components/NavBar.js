import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Outlet, Link } from "react-router-dom";

import Button from "@mui/material/Button";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";

const drawerWidth = 250;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { userStatus } = useUser();
  const { loggedInStatus, user } = userStatus;
  const { checkLoginStatus } = useUser();
  const { handleLogout } = useUser();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);
  // const { name } = user;

  const handleLogoutClick = () => {
    fetch("http://localhost:3000/api/v1/logout", {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        console.log("log out api response", response);
      })
      .then((data) => {
        console.log("data response", data);
        handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", border: 2, borderColor: "secondary.main" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ background: "orange" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            HungryNow
          </Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            clipRule="evenodd"
            viewBox="0 0 513 513"
          >
            <g transform="translate(-1171 -614)">
              <g transform="matrix(1.35364 0 0 .67016 600.09 112.116)">
                <path
                  fill="none"
                  d="M421.762 748.988H800V1512.982H421.762z"
                ></path>
                <path
                  fill="#FFEDA9"
                  d="M1533.11 1503.34c2.63-61.53 90.47-65.24 101.6-64.01 35.76 3.96 21.67 38.07 20.73 45.17-3.61 27.22-53.87 89.06-34.73 83.8 90-24.73-84.62 114.9-98.39 86.01-13.35-28.02 31.47-122.4 50.15-112.6l.04-.03c14.45-7.55-40.35-16.1-39.4-38.34z"
                  transform="matrix(2.15328 -.0102 .00286 2.4611 -2802.14 -2651.51)"
                ></path>
                <path
                  fill="#500000"
                  d="M767.196 2849.35c9.548-2.05 56.515-4.03 69.359-4.96 38.45-2.79 73.204 7.35 89.066 10.01 14.569 2.45 36.826 10.13 13.044 15.52-16.702 3.79-50.307 10.85-77.388 14.12-11.67 1.4-37.851 1.26-49.898-1.15-22.282-4.44-74.186-18.36-74.186-18.36-14.848-5.71 4.581-10.53 30.003-15.18z"
                  transform="matrix(.71103 0 0 1.35506 26.052 -2428.43)"
                ></path>
                <path
                  fill="#CA3B3B"
                  d="M718.988 2585.64l42.251 271.05c39.327 25.03 119.54 30.84 186.869 5.03l26.424-273.54s-106.488-63.53-255.544-2.54z"
                  transform="matrix(.64451 0 0 1.35506 71.649 -2433.39)"
                ></path>
                <path
                  fill="#fff"
                  d="M707.883 2617.6s-3.781-27.81-1.676-36.73c2.105-8.93 24.505-11.73 24.505-11.73l19.485-58.71s134.587-26.46 202.694.36c10.342 4.07 21.835 61.77 21.835 61.77l18.898 2.99s-3.521 36.87-4.038 42.56c-.518 5.7-126.727 65.17-281.703-.51z"
                  transform="matrix(.60218 0 0 1.19214 106.268 -2026.6)"
                ></path>
                <path
                  fill="#8B3232"
                  d="M751.562 2666.83c.112 0 63.604 16.92 113.662 17.26 15.433.1 69.794-11.31 69.794-11.31 3.985-.52-2.411 34.57-4.983 35.23-15.359 3.97-132.413-12.3-178.249-26.12-3.815-1.15-8.342-15.28-.224-15.06z"
                  transform="matrix(.83737 0 0 1.69138 -86.151 -3412.4)"
                ></path>
                <path
                  fill="#F15B30"
                  d="M1405.57 1037.31c-3.81.61-24.33 1.25-33.14-.99-26.81-6.83-13.97-3.52-14.6-5.03-1.55-3.73-14.35-38.259-8.73-37.558 25.59 3.198 37.12 7.608 58.73 19.358.66.36-2.68-3.07-3.47-3.68-3.05-2.38-5.91-4.86-9.03-7.17-9.16-6.792-17.49-14.665-24.32-23.138-4.46-5.526-7.27-12.617-10.55-18.618-9.97-18.22.36-59.097 6.01-54.856 17.41 13.07 29.42 21.869 38.65 39.886 6.15 12.02 9.28 23.463 12.45 36.081 1.15 4.575 1.06 9.226 1.38 13.847.02.292 1.07 6.128 1.62 4.958 3.87-8.135 4.1-17.399 7.77-25.77 6.42-14.669 16.03-29.299 25.36-42.916 5.19-7.579 10.35-14.723 20.18-18.405 1.41-.528 4.87-2.338 6.48-2.136.89.11 1.6 3.94 1.66 4.362.77 4.998.25 10.047 1.31 15.046 4.14 19.543 3.83 40.062-8.12 58.442-5.59 8.613-30.78 29.017-30.59 29.347.91 1.67 20.85-5.11 25.52-6.64 16.32-5.33 23.79-7.08 39.31-6.7 2.25.05-1.68 23.84-8.16 26.26-18.93 7.09-15.19 4.8-35.65 3.53-6-.38-12.81.23-9.14.31 12.85.29 24.18 3.54 35.68 8.22 4.28 1.74 12.24 4.48 10.49 9.84-.79 2.45-8.71 3.98-10.92 4.68-12.69 4.05-30.03-.89-40.71-6.44-2.82-1.47-4.83-2.27-6.89-3.37l18.68 37.59-13.69 2.94-10.27-39.21c-1.06 7.11-2.8 21.73-8.19 29.08-3.35 4.58-9.46 16.13-14.08 14.6-9.6-3.19-8.33-15.37-8.57-18.1-.2-2.23.71-8.14 2.09-11.72.17-.44 1.58-6.03 1.98-7.3.06-.11.1-.18.1-.22.01-.1-.03-.01-.1.22-.95 1.56-8.21 9.85-10.9 12.98-8.94 10.42-28.3 18.93-28.23 18.55.88-4.94-16.22-13.1-14.14-17.75 2.4-5.34 9.16-12.81 14.14-16.76 10.8-8.58 29.06-14.62 32.6-15.65.24-.04.41-.07.51-.11.23-.09.03-.05-.51.11z"
                  transform="matrix(.73875 0 0 1.49218 -443.314 -167.296)"
                ></path>
                <g>
                  <path
                    fill="#500000"
                    d="M764.513 2518.17c.159.03 72.376 7.44 84.719 8.5 23.959 2.07 41.332 1.41 60.087-1.46 15.086-2.31 30.228-5.06 44.276-10.12 3.192-1.15 3.009.68 1.881 1.25-19.176 9.55-50.631 14.87-67.575 16.73-44.009 4.82-87.254-6.49-123.464-12.98-1.922-.3-2.069-2.25.076-1.92z"
                    transform="matrix(.57968 0 0 1.35506 119.569 -2434.88)"
                  ></path>
                  <path
                    fill="#500000"
                    d="M949.224 2553.7c-17.432 17.02-63.682 25.82-140.241 18.66-23.987-2.24-60.691-8.89-72.749-11.03-.599-.1-1.097-1.86.403-1.78 36.584 2.02 72.847 8.27 109.372 9.19 26.554.67 53.584 1.45 79.265-5.45 8.292-2.22 16.394-5.48 22.686-10.69 1.447-.88 2.904-.28 1.264 1.1z"
                    transform="matrix(.5927 0 0 1.35506 114.795 -2433.39)"
                  ></path>
                  <path
                    fill="#500000"
                    d="M807.002 2466.22c2.951-1.7 3.83 1.02 2.342 1.9-12.621 8.52-22.399 22.13-19.349 32.82 0 0 8.915 2.38 15.48 3.95 12.66 3.05 25.969 6.17 35.557 15.26 11.678 11.08 7.531 31.26 4.347 45.46-1.947 8.69-4.381 17.69-11.363 24.71-3.558 3.58-9.497 5.91-15.073 4.03-2.248-.76-1.449-2.27.663-2.26 6.725.01 11.818-4.68 13.945-9.79 4.451-10.69 4.918-22.4 4.578-33.65-.3-9.93.18-20.11-11.128-26.69-.799-.47-1.613-.91-2.44-1.34-11.34-5.92-24.936-8.13-36.943-12.87-2.267-.9-4.292-1.7-4.978-4.26-2.522-9.89 4.135-20.07 11.409-27.29 3.801-3.78 8.084-7.23 12.953-9.98z"
                    transform="matrix(.56891 0 0 1.36085 152.487 -2561.05)"
                  ></path>
                  <path
                    fill="#500000"
                    d="M786.066 2489.37c15.239-6.08 32.544-9.25 47.358-5.68 12.779 3.08 20.865 12.53 24.802 23.88.58 1.65 5.542 16.27 6.343 18.55l.073.21c4.349 14.87 13.303 29.53-1.133 43.24 0 0-2.546 3.46-4.066 2.6-.388-.22-.324-1.12-.172-1.7 7.734-29.38-2.672-35.33-8.959-50.18-3.196-7.54-3.759-16.15-11.042-23.04-10.298-9.76-30.465-9.17-45.921-5.77-5.003 1.11-10.465 1.93-14.481 4.7-3.118 2.16-4.765-.01-3.06-1.3 2.428-2.54 6.514-4 10.258-5.51z"
                    transform="matrix(.47917 .50323 -.2287 1.24604 809.279 -2669.14)"
                  ></path>
                  <path
                    fill="#500000"
                    d="M799.693 2587.44c2.097-.2 3.404.14 4.622.46 2.278.59 5.373 5.3.372 6.83-1.104.34-3.931.48-5.15.32-5.734-.78-6.634-3.81-6.171-4.58.665-1.12 1.312-2.55 6.327-3.03z"
                    transform="matrix(.83737 0 0 1.13032 -89.11 -1954.19)"
                  ></path>
                  <path
                    fill="#500000"
                    d="M859.439 2484.22c.125-.02 7.936-1.21 19.421 9.56 6.841 6.42 12.517 13.86 12.758 24.58.012.56.012 1.11.001 1.67-.122 6.48-1.929 12.84-4.433 18.88-4.869 11.61-12.734 21.93-21.272 30.93-1.593 2.24-3.057.87-1.651-1.11 8.918-13.27 16.784-27.44 18.968-43.16 1.408-10.14-1.499-19.66-9.893-28.37-4.152-4.31-7.787-8.5-11.44-9.75-1.919-.65-3.166-.41-4.154 2.56-.46 1.38-2.202 5.81-2.792 3.92-.582-3.67.152-8.58 4.487-9.71z"
                    transform="matrix(.56016 .23782 -.08146 1.09789 332.211 -2059.03)"
                  ></path>
                  <path
                    fill="#500000"
                    d="M1325.07 851.406c-2.86-1.15-8.82.078-8.24-8.524.14-1.987.54-24.961.54-25.432.14-8.874 3.46-9.514 8.29-11.57 3.82-1.621 8.59-4.496 10.27-4.795 0 0 11.96-41.414 18.18-46.629 4.29-3.604 39.52-11.076 109.34-10.309 14.99.165 51.05 5.709 61.86 9.28 5.09 1.681 15.88 39.507 16.25 49.103l12.32 6.023c3.44 1.985 2.93 2.102 3.24 4.876 1.44 12.978.87 22.251 1.11 33.896.08 3.44-6.37 4.624-7.26 4.799-4.28 27.348-14.36 167.546-26.72 227.986 0 0-22.2 11.73-31.4 13.09-31.89 4.69-64.49 11.31-95.83 3.32-13.4-3.42-26.16-9.29-37.81-17.06 0 0-23.88-153.88-34.14-228.054zm10.55 1.29v-.001l29.62 220.225c15.12 9.47 32.18 15.35 49.83 17.02 26.13 2.49 75.46-7.6 100.16-17.19l27.45-217.764c-34.7 11.065-65.34 17.284-115.76 14.479-28.56-1.588-64.63-7.783-91.3-16.769zm213.57-37.218c.33 14.506-102.51 25.923-145.49 19.942-30.58-4.257-55.18-8.333-78.56-18.87-1.37 5.056-1.15 17.008-.79 25.286 0 0 73.95 28.57 158.75 19.42 20.9-2.256 65.64-15.072 67.49-15.618l-1.4-30.16zm-.33-.609c-2.8-1.452-12.61-5.844-13.09-7.582-.28-1.012-11.66-44.116-16.42-45.629-18.39-5.835-48.81-7.665-68.1-7.881-31.3-.35-89.75 5.699-91.65 8.648-9.07 14.039-18.27 48.007-19.56 48.162-.94.112-9.84.531-13.82 3.793-.11.088-.21.2-.31.335 21.61 7.227 44.37 12.714 74.09 16.285 95.94 11.53 144.16-16.464 149.15-15.983l-.29-.148z"
                    transform="matrix(.73875 0 0 1.49218 -443.314 -167.296)"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            background: "orange",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Link to="restaurants" style={{ textDecoration: "none" }}>
              Random Restaurants
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              User Dashboard
            </Link>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography variant="h1">Hungry now?</Typography>
        {loggedInStatus === "LOGGED_IN" ? (
          <Typography>Welcome, {userStatus.user?.name}</Typography>
        ) : (
          <Typography>Welcome, Guest</Typography>
        )}{" "}
        <Link to="/restaurants">Random Restaurants</Link> <Outlet />
        {userStatus.loggedInStatus === "NOT_LOGGED_IN" ? (
          <Button sx={{ m: 1 }} type="Button" variant="outlined" disabled>
            Logout
          </Button>
        ) : (
          <Button sx={{ m: 1 }} variant="outlined" onClick={handleLogoutClick}>
            Logout
          </Button>
        )}
      </Main>
    </Box>
  );
}
