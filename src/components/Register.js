import { Box, Stack, TextField, Typography, Button } from "@mui/material";

export default function Register() {
  return (
    <>
      <Typography>Register</Typography>
      <Box sx={{ p: 2 }}>
        <form>
          <Stack spacing={2}>
            <div>
              <Typography>Username:</Typography>
              <TextField></TextField>
            </div>
            <div>
              <Typography>Password:</Typography>
              <TextField></TextField>
            </div>
            <div>
              <Typography>Password Confirmation:</Typography>
              <TextField></TextField>
            </div>
            <div>
              {" "}
              <Button variant="outlined" type="submit">
                REGISTER
              </Button>
            </div>
          </Stack>
        </form>
      </Box>
    </>
  );
}
