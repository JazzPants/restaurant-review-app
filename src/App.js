import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import StyleTest from "./components/StyleTest";
import Home from "./components/Home";
import RestaurantCardsList from "./components/RestaurantCardsList";
import RestaurantCardFocus from "./components/RestaurantCardFocus";
import { RestaurantsProvider } from "./contexts/RestaurantsContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

import { UserProvider } from "./contexts/UserContext";

function App() {
  // const someObj = { loggedInStatus: "NOT_LOGGED_IN", user: {} };
  return (
    <React.Fragment>
      <UserProvider>
        <RestaurantsProvider>
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
        </RestaurantsProvider>
      </UserProvider>
    </React.Fragment>
  );
}

export default App;
