import { TextField } from "@mui/material";
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegistration() {
  const [userInformation, setUserInformation] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();

  function onChangeHandlerName(event) {
    setUserInformation({ ...userInformation, name: event.target.value });
  }
  function onChangeHandlerEmail(event) {
    setUserInformation({ ...userInformation, email: event.target.value });
  }
  function onChangeHandlerPhoneNumber(event) {
    setUserInformation({ ...userInformation, phoneNumber: event.target.value });
  }
  function onChangeHandlerPassword(event) {
    setUserInformation({ ...userInformation, password: event.target.value });
  }

  //   console.log(userInformation, "user");

  function registerNewUser() {
    const signUpUrl = "http://localhost:5125/api/v1/User/SignUp";
    axios
      .post(signUpUrl, userInformation)
      .then((response) => {
        console.log(response, "new user");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 400) {
          if (error.response.data.errors.Name) {
            alert(error.response.data.errors.Name[0]);
            return;
          }
          if (error.response.data.errors.Email) {
            alert(error.response.data.errors.Email[0]);
            return;
          }
          if (error.response.data.errors.Password) {
            alert(error.response.data.errors.Password[0]);
            return;
          }
          if (error.response.data.errors.PhoneNumber) {
            alert(error.response.data.errors.PhoneNumber[0]);
            return;
          }
        }
      });
  }

  return (
    <div>
      <h1>User Registration</h1>
      <TextField
        id="name"
        label="Name"
        variant="standard"
        onChange={onChangeHandlerName}
      />
      <TextField
        id="email"
        label="Email"
        variant="standard"
        onChange={onChangeHandlerEmail}
      />
      <TextField
        id="phoneNumber"
        label="Phone Number"
        variant="standard"
        onChange={onChangeHandlerPhoneNumber}
      />
      <TextField
        id="password"
        label="Password"
        variant="standard"
        onChange={onChangeHandlerPassword}
      />

      <Button color="warning" variant="contained" onClick={registerNewUser}>
        Sign up
      </Button>
    </div>
  );
}
