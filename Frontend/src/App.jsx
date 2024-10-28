import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "./Store/userSlice";
import { Toaster } from "@/components/ui/toaster";
import "./cursor.css"
function App() {

  const { isAuthenticated, isProfileSetup, isLoading, user } = useSelector((state) => state.userData);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkUser());
  },[dispatch])

  useEffect(() => {
    // Select the elements with the classes .cursor and .cursor2 respectively.
    const cursor = document.querySelector(".cursor");
    const cursor2 = document.querySelector(".cursor2");

    // style.cssText is used to set the CSS text of the style attribute. handleMouseMove is a function that updates the left and top CSS properties of both cursor and cursor2 to the current mouse coordinates (e.clientX and e.clientY).
    const handleMouseMove = (e) => {
      cursor.style.cssText = cursor2.style.cssText = `left: ${e.clientX}px; top: ${e.clientY}px;`;
    }

    // Cleanup Function This prevents memory leaks and ensures that no unnecessary event listeners remain when the component is no longer in use.
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      pointerElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);


  return  (
    <>
      <div className="cursor"></div>
      <div className="cursor2"></div>
      <Toaster />
      <Outlet/>
    </>
  );
}

export default App;