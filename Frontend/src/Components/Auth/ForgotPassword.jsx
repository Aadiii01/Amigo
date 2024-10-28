import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SmallFooter from "./SmallFooter";
import ForgotForm from "./ForgotForm";
import { desktopImage,MobileImage,Logo } from "@/Utils/Data";

const ForgotPassword = () => {

  const [imageSrc, setImageSrc] = useState(desktopImage);

  // Function to handle the image based on screen size
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setImageSrc(MobileImage);
    } else {
      setImageSrc(desktopImage);
    }
  };

  // On component mount, check the initial screen size
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="bg">
        <div className="layout">
          <div className="headerlayout">
            <header className="header">
              <div className="firstSection">
                <Link to="/" className="cursor-pointer">
                  <img className="w-[100px] sm:w-[130px]" src={Logo} />
                </Link>
              </div>
              <div className="secondSection">
                <div className="usual">
                  <div className="leftSection">
                    <div className="same"></div>
                    <div className="same">
                      <Link to="/signin" className="signin hover:bg-[#e64e4e]">
                        Sign In
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </div>
        </div>
      </div>

      <div className="mainsection">
        <div className="first">
          <div className="imgpage">
            <div className="imgpage1">
              <div>
                <div className="bg1"></div>
                <img src={imageSrc} className="image" />
              </div>
            </div>
          </div>

          <div className="second">
            <div className="firstbox ">
              <div className="firstbox1">
                <div className="simpleContainer">
                  <div className="centerContainer">
                    <ForgotForm/>
                  </div>
                </div>
              </div>
            </div>

            <div className="texturemain">
              <div>
                <div className="texturefirst"></div>
              </div>
              <div className="texturelast"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 lg:mt-20">
        <SmallFooter colorfooter={"bg-black"} coptextcol={"text-white"} acol={"text-[#888]"} hacol={"hover:text-[#fff]"}/>
      </div>
    </>
  );
};

export default ForgotPassword;
