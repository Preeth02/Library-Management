import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import fetchReq from "@/utilityFunctions/fetchReq";
import { login } from "@/store/authSlice";
import { toast } from "sonner";

function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [result, setResult] = useState({});
  const loginFunc = async (data) => {
    const formData = new FormData();
    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }
    for (const [key, value] of Object.entries(data)) {
      if (key !== "avatar") {
        formData.append(key, value);
      }
    }
    const methods = {
      link: "http://localhost:3000/api/v1/user/register",
      body: formData,
      method: "POST",
    };
    const result1 = await fetchReq(methods);
    setResult(result1);
    // if (result1.data !== null) {
    //   dispatch(login(result1.data));
    //   navigate("/");
    // }
    if (result1.data) {
      toast("You have been registered successfully. Please login.");
      navigate("/login");
    }
    console.log(result1);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 px-4">
      <Card className="w-full max-w-sm p-2 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-orange-400">
            Sign-Up
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Please enter your credentials to register
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(loginFunc)} className="space-y-3">
            {/* Email Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="email"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Username Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="username" className="text-gray-300">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                placeholder="Username"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            {/* Full Name Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="fullName" className="text-gray-300">
                Full Name
              </Label>
              <Input
                type="text"
                id="fullName"
                placeholder="Full Name"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("fullName", {
                  required: "Full Name is required",
                })}
              />
              {errors.fullName && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            {/* Password Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Avatar Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="avatar" className="text-gray-300">
                Avatar
              </Label>
              <Input
                type="file"
                id="avatar"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("avatar", {
                  required: "Avatar is required",
                })}
              />
              {errors.avatar && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.avatar.message}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
            >
              Sign Up
            </Button>
          </form>
          {result?.error && (
            <p className="text-sm text-red-400 mt-1">
              User with the following email or username exists
            </p>
          )}
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-400 hover:text-orange-500 underline transition"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
