import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { TextField } from "@mui/material";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function UserLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  function onChangeHandlerEmailLogin(event) {
    setUserLogin({ ...userLogin, email: event.target.value });
  }
  function onChangeHandlerPasswordLogin(event) {
    setUserLogin({ ...userLogin, password: event.target.value });
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  function loginUser() {
    const loginUrl = "http://localhost:5125/api/v1/User/LogIn";
    axios
      .post(loginUrl, userLogin)
      .then((response) => {
        console.log(response, "logged in user");
        localStorage.setItem("token", response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 400) {
          if (error.response.data.errors.Email) {
            alert(error.response.data.errors.Email[0]);
            return;
          }
          if (error.response.data.errors.Password) {
            alert(error.response.data.errors.Password[0]);
            return;
          }
        }
      });
  }

  return (
    <div>
      <h1>User Login</h1>
      <TextField
        id="email"
        label="Email"
        variant="standard"
        onChange={onChangeHandlerEmailLogin}
      />
      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={onChangeHandlerPasswordLogin}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button color="warning" variant="contained" onClick={loginUser}>
        Login
      </Button>
    </div>
  );
}
