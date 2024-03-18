import React, { useState } from "react";
import authService from "../appwrite/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError("");
    try {
      let  userData = await authService.createAccount(data);

      if (userData) {
        userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  return (
    <>
      <div>
        <div>
          <span>Logo</span>
        </div>
        <div>
          <Link to="/login">Sign Up</Link>
        </div>
        <br />
        <br />
        <h2>Signup</h2>
        {error && <p style={{ 'color': 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit(signup)} style={{ 'margin': '5px' }}>
          <Input
            label="Name :"
            type="text"
            placeholder="Enter your full name"
            {...register("name", {
              required: true,
            })}
          />

          <Input
            label="Email :"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <Input
            label="Password :"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />

          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
      </div>
    </>
  );
}
