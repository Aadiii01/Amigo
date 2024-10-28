import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { languageStrings } from "../../Utils/language.js";
import { Link } from "react-router-dom";
import { desktop_url, mobile_url } from "@/Utils/Data.jsx";
import { useLanguage } from "@/context/LanguageContext.jsx";
import "../../Styles/SectionImage.css";

const SectionImage = () => {
  const { selectedLanguage } = useLanguage();

  const [imageSrc, setImageSrc] = useState(desktop_url);

  // Function to handle the image based on screen size
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setImageSrc(mobile_url);
    } else {
      setImageSrc(desktop_url);
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
                      {languageStrings[selectedLanguage].mainHeading}
                    </h1>
                    <p className="pheading font-[NetflixR]">
                      {languageStrings[selectedLanguage].subHeading}
                    </p>
                  </div>
                </div>
              </div>
              <div className="secondheading">
                <p className="font-[NetflixR] text-white text-[16px]">
                  {languageStrings[selectedLanguage].welcomeText}
                </p>
                <div className="mt-4">
                  <Link to="/auth">
                    <Button className="bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 font-[NetflixB] text-white 
                    w-[150px] rounded-[30px]">
                      {languageStrings[selectedLanguage].createAccount}
                    </Button>
                  </Link>
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
  );
};

export default SectionImage;
