import { useState } from "react";

import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import SignIn from "./components/SignIn";
import Category from "./components/Category";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import CreateListing from "./components/CreateListing";
import Listing from "./components/Listing";
import Contact from "./components/Contact";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<PrivateRoute />}>
            <Route path="/category/:categoryName" element={<Category />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route   path="/category/:categoryName/:listingId" element={<Listing/>}/>
          <Route path="/contact/:landlordId" element={<Contact/>}/>
          <Route path="/create-listing" element={<PrivateRoute />}>
          <Route path="/create-listing" element={<CreateListing />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
