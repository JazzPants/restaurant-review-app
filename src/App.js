import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import StyleTest from "./components/StyleTest";
import Home from "./components/Home";
import RestaurantCardsList from "./components/RestaurantCardsList";
import RestaurantCardFocus from "./components/RestaurantCardFocus";
import { RestaurantsProvider } from "./contexts/RestaurantsContext";
import Login from "./components/actions/Login";
import Register from "./components/actions/Register";
import Dashboard from "./components/Dashboard";
import { Box } from "@mui/system";

import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserProvider } from "./contexts/UserContext";

const theme = createTheme({
  palette: {
    background: {
      default: "#ffb74d",
      container: "#29b6f6",
    },
  },
});

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <RestaurantsProvider>
            <Container>
              <Routes>
                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>There's nothing here! Go back:</p>
                      <Link to="/">Home</Link>
                    </main>
                  }
                />
                <Route path="/" element={<Home />}>
                  {/* <Route path="/user/userid" element={<User />} /> */}
                  <Route path="restaurants" element={<RestaurantCardsList />} />
                  <Route
                    path="restaurant/:restaurantId"
                    element={<RestaurantCardFocus />}
                  />
                  <Route path="styletest" element={<StyleTest />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </Container>
          </RestaurantsProvider>
        </UserProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
