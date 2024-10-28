import React from "react";
import {languageStrings} from "../../Utils/language.js"
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { Logo } from "@/Utils/Data.jsx";
import "../../Styles/Header.css";
import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";

export function SelectDemo({ onLanguageChange }) {
  return (
    <Select onValueChange={onLanguageChange}>
      <SelectTrigger className="sm:w-[124px] w-auto h-[32px] mr-[12px] text-[12px] font-[GeistL] bg-[#111] text-white focus:outline-none focus:ring-0 focus:border-transparent">
        <SelectValue placeholder="English" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        <SelectItem value="en">English</SelectItem>
          <SelectItem value="hi">Hindi</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
          <SelectItem value="fr">French</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const Header = () => {

  const { selectedLanguage, handleLanguageChange } = useLanguage();

  return (
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
                  <div className="same">
                    <SelectDemo onLanguageChange={handleLanguageChange}/>
                  </div>
                  <div className="same">
                    <Link to="/signin" className="signin hover:bg-[#e64e4e]">{languageStrings[selectedLanguage].signIn}</Link>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default Header;