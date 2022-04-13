import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import StyleTest from "./components/StyleTest";
import Home from "./components/Home";
import RestaurantCardsList from "./components/RestaurantCardsList";
import RestaurantCardFocus from "./components/RestaurantCardFocus";
import { RestaurantsProvider } from "./contexts/RestaurantsContext";
import Login from "./components/Login";

function App() {
  return (
    <React.Fragment>
      <RestaurantsProvider>
        <Routes>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
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
          </Route>
        </Routes>
      </RestaurantsProvider>
    </React.Fragment>
  );
}

export default App;
