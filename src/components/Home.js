import PersistentDrawerLeft from "./NavBar";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <>
      <Box p={7}>
        {/* {console.log(data)} */}
        <PersistentDrawerLeft></PersistentDrawerLeft>
      </Box>
    </>
  );
}
