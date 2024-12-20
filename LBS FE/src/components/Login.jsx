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

function Login() {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const selectedRole = watch("role");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [result, setResult] = useState({});
  const loginFunc = async (data) => {
    const role = data?.role;
    const userData = {
      username: data.emailOrName,
      password: data.password,
      email: data.emailOrName,
    };
    const methods = {
      link:
        role === "user"
          ? "http://localhost:3000/api/v1/user/login"
          : "http://localhost:3000/api/v1/admin/login",
      body: JSON.stringify(userData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result1 = await fetchReq(methods);
    if (result1.data !== null) {
      // console.log(result1.data.user)
      dispatch(login(result1.data.user));
      setResult(result1);
      navigate("/");
    }
    // console.log(result1);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
      <Card className="w-full max-w-md p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-orange-400">
            Login
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Please enter your credentials to log in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(loginFunc)} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-300">Select Role</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="userRole"
                    checked={selectedRole === "user"}
                    onCheckedChange={(checked) => {
                      setValue("role", checked ? "user" : "");
                      trigger("role"); // Trigger validation on change
                    }}
                    {...register("role", { required: "Role is required" })}
                  />
                  <Label htmlFor="userRole" className="text-gray-300">
                    User
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="adminRole"
                    checked={selectedRole === "admin"}
                    onCheckedChange={(checked) => {
                      setValue("role", checked ? "admin" : "");
                      trigger("role"); // Trigger validation on change
                    }}
                    {...register("role", { required: "Role is required" })}
                  />
                  <Label htmlFor="adminRole" className="text-gray-300">
                    Admin
                  </Label>
                </div>
              </div>
              {errors.role && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Username or Email Field */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="emailOrName" className="text-gray-300">
                Email or Username
              </Label>
              <Input
                type="text"
                id="emailOrName"
                placeholder="email or username"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                {...register("emailOrName", {
                  required: "Email or username is required",
                })}
              />
              {errors.emailOrName && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.emailOrName.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="password"
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
            >
              Login
            </Button>
          </form>
          {result?.error && (
            <p className="text-sm text-red-400 mt-1">
              Invalid user credentials
            </p>
          )}
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-400 hover:text-orange-500 underline transition"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
