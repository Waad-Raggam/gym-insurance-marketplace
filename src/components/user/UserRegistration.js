import { TextField, Button,  InputAdornment, IconButton, Input } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must have one uppercase, one lowercase, one number, and one special character"
      ),
    role: yup.string().required("Role is required"), 
  })
  .required();

export default function UserRegistration() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();


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
        <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        {/* <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          /> */}
        <TextField
          id="role"
          label="Role"
          select
          SelectProps={{
            native: true,
          }}
          {...register("role")}
          error={!!errors.role}
          helperText={errors.role?.message}
        >
          <option value="">Select Role</option>
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </TextField>

        <Button color="warning" variant="contained" type="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
}
