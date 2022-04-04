import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import StyleTest from "./StyleTest";
import Home from "./Home";
import RestaurantCardsList from "./RestaurantCardsList";
import RestaurantCardFocus from "./RestaurantCardFocus";

function App() {
  return (
    <React.Fragment>
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
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
