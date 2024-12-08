import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import OAuth from "./OAuth";
import googleIcon from "../assets/googleIcon.png";

function SignUp() {
    const [showPassword , setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

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

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      toast.success("Account successfully created");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with registration");
    }
  };

  return (
    <div>
      <div className="w-full pt-10">
        <form
          onSubmit={onSubmit}
          action=""
          className="w-[60%] h-[500px] mx-auto flex flex-col p-6 pt-[70px] bg-[#fff] shadow-2xl rounded-xl"
        >
          <div className="flex flex-col pl-10 ">
            <input
              className="mb-4 focus:border-b-3 focus:border-[#5a5959] focus:outline-none border-b-2 p-2 "
              type="name"
              value={name}
              id="name"
              placeholder="Name"
              onChange={onChange}
            />
            <input
              className="mb-4 focus:border-b-3 focus:border-[#5a5959] focus:outline-none  border-b-2 p-2 "
              type="email"
              value={email}
              id="email"
              placeholder="Email"
              onChange={onChange}
            />
            {/* Password Input Div  */}
            <div className="focus:border-b-3 focus:border-[#5a5959] focus:outline-none mb-6 border-b-2 p-2 relative ">
              <input
                className="  focus:outline-none z-[1]  lg:pr-[70%]"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Password"
                id="password"
                onChange={onChange}
              />

              <img
                src={visibilityIcon}
                alt=""
                className="  absolute z-[2] right-0 top-2 cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
          </div>

          {/* Sign Up */}
          <div className="flex w-full  h-[100px] items-center justify-center">
            <div
              onClick={onSubmit}
              className="bg-[#7065F0] text-[#fff] cursor-pointer flex justify-center items-center w-[250px] h-[50px] rounded-md mx-auto"
            >
              Sign Up
            </div>
          </div>

          {/* Google SignUp */}
          <div className="w-full flex justify-center">
            <OAuth />
          </div>

          {/* Sign In */}
          <div className=" max-w-[250px] h-[50px] mx-auto flex justify-center items-center ">
            <Link to="/sign-in">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
