import Logo from "../assets/Logo.png";
import Button from "./Button";
import { Link, useParams } from "react-router-dom";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router-dom";
import Spinner from "./Spinner/Spinner";

const Navbar = () => {
  const auth = getAuth();
  const params = useParams();
  const location = useLocation();
  const { loggedIn, checkingStatus, user } = useAuthStatus();



 

  const onSignOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    
    <nav className="w-full flex justify-between items-center shadow px-6 h-[70px]">
    <Link to="/">
      <div className="flex items-center ">
        <img src={Logo} alt="" />
        <p className="text-black text-bold text-[20px] pt-1 ">Estatery</p>
      </div>
    </Link>


    {loggedIn  ? (
      <div className="flex justify-center items-center">
       {loggedIn && location.pathname == "/" ? (    
        <div className="mr-10 hover:font-bold">
          <Link to="/profile">Profile</Link>
        </div>)
        : null }


        {loggedIn && location.pathname == "/profile" ? (
               <div className="flex justify-center items-center">
               <div className="mr-10 hover:font-bold">
                 <Link className="" to="/profile"> {user.displayName}</Link>
               </div>
               </div>
        ) : null}
      </div>
    ) : (
      <div className="flex justify-center items-center  ">
        <Link to="/sign-in">
          <Button style={`mr-[30px] h-[10px]`}>Sign In</Button>
        </Link>


        <Button style={`h-[10px] text-[#fff]`} bgColor={`#7065F0`}>
          <Link to="/sign-up">Sign up</Link>
        </Button>
      </div>
    )}
  </nav>


   
  );
};

export default Navbar;
