import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import toast from "react-hot-toast";
import SummaryApi, { baseUrl } from "../common/SummaryApi";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
  const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
    // console.log(data);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const isValue = Object.values(data).every((key) => key);
  //   console.log(isValue);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("password and confirm password must be same");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}${SummaryApi.register.url}`, {
        method: SummaryApi.register.method,
        headers: {
          "Content-type": "application/json", // i need to inform my server that i am sending json data
        },
        body: JSON.stringify(data), // converting Javascript object to json data
      });

      if (!response.ok) {
        toast.error("Something went wrong please try again later");
      }
      const result = await response.json();
      if (result.error) {
        toast.error(result.message);
      }
      if (result.success) {
        toast.success(result.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message || error);
      toast.error("Something went wrong please try again later");
    }
  };

  return (
    <div className="container w-full mx-auto p-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto p-7 rounded-lg">
        <form onSubmit={handleSubmit}>
          <p>Welcome to Binkeyit</p>
          <div className="grid mt-3">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="p-2 rounded-md mt-1.5 bg-blue-50 outline-none"
              value={data.name}
              onChange={handleChange}
              name="name"
            />
          </div>

          <div className="grid mt-3">
            <label htmlFor="email">Email-ID :</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your Email"
              className="p-2 rounded-md mt-1.5 bg-blue-50 outline-none"
              value={data.email}
              onChange={handleChange}
              name="email"
            />
          </div>

          <div className="grid mt-3 w-full">
            <label htmlFor="password">Password :</label>
            <div className="flex items-center gap-2 p-2 rounded-md mt-1.5 bg-blue-50 w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full outline-none bg-transparent"
                value={data.password}
                onChange={handleChange}
                name="password"
              />
              <div
                className="bg-blue-50 h-full text-center"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <LuEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <div className="grid mt-3 w-full">
            <label htmlFor="Confirm Password">Confirm Password :</label>
            <div className="flex items-center gap-2 p-2 rounded-md mt-1.5 bg-blue-50 w-full">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                id="Confirm Password"
                placeholder="Confirm your password"
                className="w-full outline-none bg-transparent"
                value={data.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
              />
              <div
                className="bg-blue-50 h-full text-center"
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              >
                {isConfirmPasswordVisible ? <LuEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <button
            disabled={!isValue}
            className={`${
              isValue ? "bg-green-800" : "bg-gray-500"
            } w-full mt-8 py-2 text-white rounded-lg font-bold`}
          >
            Register
          </button>
        </form>
        <p className="mt-4">Already have an Account? <Link to={'/login'} className="font-bold text-green-800">Login Now!</Link></p>
      </div>
    </div>
  );
};

export default Register;
