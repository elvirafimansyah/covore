"use client"
import { useState, useEffect } from "react";
import Logo from "./logo";
import NavigationBar from "./navigation-bar";

const Navbar  = () => {
  const [navbar, setNavbar] = useState(false)
  const scrollNavbar = () => {
    if(window.scrollY >= 1) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollNavbar)
    return() => {
      window.addEventListener("scroll", scrollNavbar)
    }
  })
  return ( 
    <div className={navbar ? "fixed w-full border-b bg-background z-50" : "border-b "}>
      <div className="flex justify-between items-center py-4 mx-auto px-4 sm:px-6 md:px-8 xl:px-0 max-w-6xl ">
        <Logo />
        <NavigationBar />
      </div>
    </div>
  );
}

export default Navbar ;