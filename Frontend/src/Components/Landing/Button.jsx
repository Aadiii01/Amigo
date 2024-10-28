import React from "react";
import "../../Styles/Button.css";
import { languageStrings } from "../../Utils/language.js";
import { useLanguage } from "@/context/LanguageContext.jsx";
import { Link } from "react-router-dom";

const Button = ({ className }) => {
  const { selectedLanguage } = useLanguage();

  return (
    <Link to="auth">
      <div className={`buttondivdiv ${className}`}>
        <button className="btnappear">
          {languageStrings[selectedLanguage].emailbutton}
        </button>
      </div>
    </Link>
  );
};

export default Button;
