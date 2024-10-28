import React, { useState } from "react";
import { faqs } from "../../Utils/Data.jsx";
import {languageStrings} from "../../Utils/language.js"
import { useLanguage } from "@/context/LanguageContext.jsx";
import "../../Styles/SectionFAQ.css";

export const FAQList = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ul className="ulFAQ">
      {faqs.map((faq, index) => (
        <li className="liFAQ" key={index}>
          <h3 className={openIndex === index ? "h3listFAQOpen" : "h3listFAQ"}>
            <button aria-expanded={openIndex === index} onClick={() => toggleFAQ(index)} className="buttonFAQ font-[NetflixR]">
              {faq.question}
                <svg 
                xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 36 36" width="36" height="36" data-icon="PlusLarge" aria-hidden="true" className={openIndex === index ? "svgnew" : "svg"}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z" fill="currentColor"></path>
                </svg>
                <svg 
                xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="PlusStandard" aria-hidden="true" className={openIndex === index ? "svg2new" : "svg2"}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path>
                </svg>
            </button>
          </h3>
          <div className={openIndex === index ? "AnaswerFAQOpen" : "AnaswerFAQ"}>
            <p className="spananswer font-[NetflixR]">{faq.answer}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

const SectionFAQ = () => {
  const { selectedLanguage } = useLanguage();

  const localizedfaqs = faqs[selectedLanguage]
  return (
    <div className="SectionBlock SectionFAQ1">
      <div className="w-full h-auto divin">
        <div className="FAQSectionBlock">
          <div className="FAQBlock">
            <h2 className="h2Faq font-[NetflixM]">{languageStrings[selectedLanguage].BHeading}</h2>
          </div>
          <div className="FAQBlock">
            <FAQList faqs={localizedfaqs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionFAQ;
