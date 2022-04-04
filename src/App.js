import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import StyleTest from "./StyleTest";
import Home from "./Home";
import RestaurantCardsList from "./RestaurantCardsList";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route path="/user/userid" element={<User />} /> */}
          {/* <Route path="/restaurants/category" element={<RestaurantCardsList />}> */}
          {/* <Route path="/restaurant/category/restaurant-name" element={<RestaurantCardFocus />} /> */}
          <Route path="styletest" element={<StyleTest />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
