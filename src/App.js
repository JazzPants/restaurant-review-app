import React from "react";
import IconsGrid from "./IconsGrid";
import PersistentDrawerLeft from "./NavBar";

function App() {
  return (
    <React.Fragment>
      <div>Hello World</div>
      <PersistentDrawerLeft></PersistentDrawerLeft>

      <IconsGrid></IconsGrid>
    </React.Fragment>
  );
}

export default App;
