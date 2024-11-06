import { TextField, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have one uppercase, one lowercase, one number, and one special character"
    ),
}).required();

export default function UserRegistration() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  
  const onSubmit = (data) => {
    const signUpUrl = "http://localhost:5125/api/v1/User/SignUp";
    axios
      .post(signUpUrl, data)
      .then((response) => {
        console.log(response, "new user");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 400) {
          const { errors } = error.response.data;
          if (errors.Name) alert(errors.Name[0]);
          if (errors.Email) alert(errors.Email[0]);
          if (errors.Password) alert(errors.Password[0]);
          if (errors.PhoneNumber) alert(errors.PhoneNumber[0]);
        }
      });
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <TextField
          id="name"
          label="Name"
          variant="standard"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* Email Field */}
        <TextField
          id="email"
          label="Email"
          variant="standard"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Phone Number Field */}
        <TextField
          id="phoneNumber"
          label="Phone Number"
          variant="standard"
          {...register("phoneNumber")}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />

        {/* Password Field */}
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button color="warning" variant="contained" type="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
}
