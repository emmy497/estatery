import React, { useState } from "react";
import googleIcon from "../assets/googleIcon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const {email, password}= formData;


  const navigate = useNavigate();
  const location = useLocation();


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      if(userCredential.user) {
        navigate("/")
      }
    }catch (error) {
      toast.error("Bad User Credentials")
    }
 
  };



  return (
    <div className="w-full h-[80%] pt-4 lg:pt-10">
      <form
      onSubmit={onSubmit}
        action=""
        className="w-[60%] relative h-full mx-auto flex flex-col p-10  bg-[#fff] shadow-2xl rounded-xl"
      >
        <div className="flex flex-col pl-10 ">
          <input
            className="mb-6 focus:border-b-3 focus:border-[#5a5959] focus:outline-none border-b-2 p-2 "
            type="email"
            value=""
            id="email"
            placeholder="Email"
            onChange={onChange}
          />
          <input
            className="  focus:border-b-3 focus:border-[#5a5959] focus:outline-none mb-6 border-b-2 p-2 "
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Password"
            id="password"
            onChange={onChange}
          />
        </div>

        <div className="flex justify-between flex-col lg:flex-row   items-center pl-10 mb-10 mt-6 lg:mt-4">
          <div className="mb-4  lg:mb-0 cursor-pointer">
            <Link to="">Forgot Password?</Link>
          </div>
          <div className="flex p-2 items-center">
            <div className="mr-2">
              <Link to="">Sign In</Link>{" "}
            </div>
            <img className="w-[30px] h-[30px]" src={googleIcon} />
          </div>
        </div>

        <div className="flex w-full  h-[100px] items-center justify-center">
          <div className="bg-[#7065F0] text-[#fff] cursor-pointer flex justify-center items-center w-[250px] h-[50px] rounded-md mx-auto">
            Login
          </div>
        </div>
        <div className="  max-w-[250px] h-[50px] mx-auto mt-4 flex justify-center items-center ">
          <Link to="/sign-up">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
