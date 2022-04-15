import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { useState, useRef } from "react";

export default function Register() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [register, setRegister] = useState({
    name: "",
    password: "",
    password_confirmation: "",
    registrationErrors: "",
  });

  const handleSubmit = (event) => {
    console.log("Form submitted");
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log("handle change", event);
  };
  return (
    <>
      <Typography variant="h4">Register</Typography>
      <Box
        sx={{
          minWidth: 500,
          maxWidth: 800,
          p: 2,
          border: 2,
          borderColor: "primary.main",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <div>
              <Typography>Username:</Typography>
              <TextField
                name="name"
                placeholder="Username"
                inputRef={usernameRef}
                onChange={handleChange}
                required
              ></TextField>
            </div>
            <div>
              <Typography>Password:</Typography>
              <TextField
                type="password"
                name="password"
                placeholder="Password"
                inputRef={passwordRef}
                onChange={handleChange}
                required
              ></TextField>
            </div>
            <div>
              <Typography>Password Confirmation:</Typography>
              <TextField
                type="password"
                name="password_confirmation"
                placeholder="Password confirmation"
                inputRef={passwordConfirmationRef}
                onChange={handleChange}
                required
              ></TextField>
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
