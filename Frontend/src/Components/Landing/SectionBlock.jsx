import React from "react";
import { sectionsData } from "../../Utils/Data.jsx";
import {languageStrings} from "../../Utils/language.js"
import { useLanguage } from "@/context/LanguageContext.jsx";
import "../../Styles/SectionBlock.css";

export const SectionHeading = ({ heading, description, logo }) => {
  return (
    <div className="Blocks">
      <div className="BodyBolock">
        <div className="w-full h-full relative">
          <div className="usualdiv">
            <div className="headingdiv">
              <div className="firstheadingdiv">
                <h3 className="h3Heading font-[NetflixM]">{heading}</h3>
              </div>
              <div className="firstheadingdiv">
                <p className="pheading font-[NetflixR]">{description}</p>
              </div>
              <div className="BlockLogo">{logo}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionBlock = () => {
  const { selectedLanguage } = useLanguage();

  const localizedSections = sectionsData[selectedLanguage]
  return (
    <div className="SectionBlock">
      <div className="w-full h-auto divin">
        <div className="SectionBlockStructure">
          <div className="SectionBlockFirstHeading">
            <h2 className="AmigoJoin font-[NetflixB]">
            {languageStrings[selectedLanguage].blockHeading}
            </h2>
          </div>
          <div className="wrapper">
            <div className="BlockSection">
            {localizedSections.map((section, index) => (
                <SectionHeading
                  key={index}
                  heading={section.heading}
                  description={section.description}
                  logo={section.logo}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionBlock;
