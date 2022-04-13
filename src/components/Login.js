import { Box, Stack, TextField, Typography, Button } from "@mui/material";

export default function Login() {
  //handlesubmit

  //useEffect -> preventdefault,handleLogin

  //fetch POST callback
  //handleLogin
  return (
    <>
      <Box sx={{ p: 2 }}>
        <form>
          <Stack spacing={2}>
            <div>
              <Typography>Username:</Typography>
              <TextField></TextField>
            </div>
            <div>
              <Typography>Password</Typography>
              <TextField></TextField>
            </div>
            <div>
              {" "}
              <Button variant="outlined" type="submit">
                LOGIN
              </Button>
            </div>
          </Stack>
        </form>
      </Box>
    </>
  );
}
