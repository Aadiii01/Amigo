import React,{useState,useEffect} from "react";
import Header from "../Landing/Header.jsx";
import Footer from "../Footer.jsx"
import SectionImage from "./SectionImage.jsx";
import SectionTop from "./SectionTop.jsx";
import SectionBlock from "./SectionBlock.jsx";
import SectionFAQ from "./SectionFAQ.jsx";
import SectionFooterEmail from "./SectionFooterEmail.jsx";
import Button from "./Button.jsx";
import { useLanguage } from "@/context/LanguageContext.jsx";
import "../../Styles/Landing.css"


const Landing = () => {
  const { selectedLanguage } = useLanguage();
  const [buttonClass, setButtonClass] = useState('floating-cta-enter-active');

  const handleScroll = () => {
    const sectionBlock = document.querySelector('.SectionBlock');
    const sectionFAQ = document.querySelector('.SectionFAQ1');
    const sectionFooterEmail = document.querySelector('.SectionFooterEmail');
    const footer = document.querySelector('.footerClass'); // Footer element
  
    if (sectionBlock && sectionFAQ && sectionFooterEmail && footer) {
      const blockRect = sectionBlock.getBoundingClientRect();
      const faqRect = sectionFAQ.getBoundingClientRect();
      const footerEmailRect = sectionFooterEmail.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
  
      const isBlockInView = blockRect.top <= window.innerHeight && blockRect.bottom >= 0;
      const isFAQInView = faqRect.top <= window.innerHeight && faqRect.bottom >= 0;
  
      // Check if SectionFooterEmail is starting to show (just 1 inch)
      const isFooterEmailVisible = footerEmailRect.top < window.innerHeight && footerEmailRect.bottom > 0;
  
      // Check if SectionFooterEmail is completely gone from view
      const isFooterEmailGone = footerEmailRect.bottom <= 0;
  
      // Check if Footer is visible
      const isFooterInView = footerRect.top <= window.innerHeight && footerRect.bottom >= 0;
  
      // Hide button when SectionFooterEmail is visible
      if (isFooterEmailVisible) {
        setButtonClass('floating-cta-enter-active'); // Hide button
      } 
      // Re-show button when SectionFooterEmail is fully off-screen and Footer is in view
      else if (isFooterEmailGone && isFooterInView) {
        setButtonClass('floating-cta-enter-done');
      } 
      // Default condition for other sections (show button)
      else if (isBlockInView || isFAQInView) {
        setButtonClass('floating-cta-enter-done');
      } else {
        setButtonClass('floating-cta-enter-active');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <SectionImage />
      <div className={`landingpage bg-black`}>
        <Button className={buttonClass}/>
        <div className="landingpageflex">
          <SectionTop />
          <SectionBlock />
          <SectionFAQ />
          <SectionFooterEmail/>
        </div>
      </div>
      <Footer bkcolor={"bg-black"} mainT={"text-white"} hovera={"hover:text-[#fff]"} hh={"h-[870px]"}/>
    </>
  );
};

export default Landing;
