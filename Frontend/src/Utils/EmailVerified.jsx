import { Logo } from "@/Utils/Data";
import "../Styles/EmailVerified.css"
import React, { useState, useEffect } from "react";
import { desktopImage, MobileImage } from "@/Utils/Data.jsx";
import SmallFooter from "../Components/Auth/SmallFooter"
import { Button } from "@nextui-org/react";
import "../Styles/blink.css"

const EmailVerified = () => {
  const [imageSrc, setImageSrc] = useState(desktopImage);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setImageSrc(MobileImage);
    } else {
      setImageSrc(desktopImage);
    }
  };

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
                <a className="cursor-pointer">
                  <img className="w-[100px] sm:w-[130px]" src={Logo} />
                </a>
              </div>
              <div className="secondSection">
                <div className="usual">
                  <div className="leftSection">
                    <div className="same"></div>
                    <div className="same"></div>
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
            <div className="firstbox">
              <div className="firstbox1">
                <div className="firstheading">
                  <div className="mainheading">
                    <div>
                      <h1 className="h1heading font-[NetflixB]">
                      Email Verified Successfully!
                      </h1>
                      <p className="pheading font-[NetflixR]">
                      Welcome to Amigo! Start connecting and making new connection today.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="secondheading">
                  <p className="font-[Netflix] text-white text-[16px]"></p>
                  <div className="mt-4">
                  <Button
                    className="bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 font-[NetflixL]  text-white w-[150px]"
                    radius="full"
                  >
                    Congratulations
                  </Button>
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
      <div className="mt-20">
        <SmallFooter
          colorfooter={"bg-black"}
          coptextcol={"text-white"}
          acol={"text-[#888]"}
          hacol={"hover:text-[#fff]"}
        />
      </div>
    </>
  );
};

export default EmailVerified;
