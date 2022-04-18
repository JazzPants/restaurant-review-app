import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { useState, useRef } from "react";
import { useUser } from "../contexts/UserContext";

export default function Login() {
  //handlesubmit

  //useEffect -> preventdefault,handleLogin

  //fetch POST callback
  //handleLogin

  const { handleSuccessfulAuth } = useUser();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [login, setLogin] = useState({
    name: "",
    password: "",
    loginErrors: "",
  });

  const handleSubmit = (event) => {
    console.log("Form submitted");

    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        user: {
          name: login.name,
          password: login.password,
        },
      }),
    })
      .then((response) => {
        console.log("login response", response);
        console.log("user object", login);
        return response.json();
      })
      .then((data) => {
        if (data.logged_in === true) {
          handleSuccessfulAuth(data.user);
        }
        console.log("session", data);
      })
      .catch((error) => console.log("login error", error));
    event.preventDefault();
  };

  const handleChange = (event) => {
    // console.log("handle change", event);
    // console.log(event.target.name);
    // console.log(event.target.value);
    setLogin((previousState) => {
      return { ...previousState, [event.target.name]: event.target.value };
    });
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
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
