import React, { useRef, useState, useEffect } from "react";
import {imagesArray,IndianPartners,GlobalFriends,GlobalPartners} from "../../Utils/Data.jsx"
import {languageStrings} from "../../Utils/language.js"
import { useLanguage } from "@/context/LanguageContext.jsx";
import "../../Styles/SectionTop.css";
import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";

export function SelectDemo({ placeholder, options, value, onChange }) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="sm:max-w-[1200px] max-w-auto h-[32px] lg:w-[124px] mr-[px] text-[12px] font-[GeistL] bg-[#111] text-white focus:outline-none focus:ring-0 focus:border-transparent">
        <SelectValue placeholder={`${placeholder}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export const List = ({ imageUrl, rating }) => {
  return (
    <li className="listyle">
      <button className="buttonclass">
        <div className="imagediv">
          <div className="imagestyles"></div>
          <img src={imageUrl} alt={`Rating ${rating}`} className="imgclass" />
        </div>
        <span className="numbersclass font-[NetflixB]">
          <span className="relative">
            <span className="numberstyle">{rating}</span>
            <span data-content={rating} className="numstyle">
              {rating}
            </span>
          </span>
        </span>
      </button>
    </li>
  );
};

const ImageList = React.forwardRef(({ images }, ref) => {
  return (
    <ul className="ulliststyle" ref={ref}>
      {images.map((image, index) => (
        <List key={index} imageUrl={image.url} rating={image.rating} />
      ))}
    </ul>
  );
});

const SectionTop = () => {
  const { selectedLanguage } = useLanguage();


  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedPartnerType, setSelectedPartnerType] = useState("Friends");
  const [imagesToDisplay, setImagesToDisplay] = useState(imagesArray);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const listRef = useRef(null);

  // Function to handle scrolling
  const handleScroll = () => {
    const scrollLeft = listRef.current.scrollLeft;
    const maxScrollLeft = listRef.current.scrollWidth - listRef.current.clientWidth;

    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < maxScrollLeft - 1);
  };

  // Scroll to the left
  const scroll = (direction) => {
    const scrollAmount = window.innerWidth > 768 ? 1000 : 300; // 1000 for desktop, 300 for mobile
    if (direction === "right") {
      listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      listRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const listElement = listRef.current;
    listElement.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => listElement.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update images based on selected country and partner type
    const getImages = () => {
      if (selectedCountry === "India" && selectedPartnerType === "Friends") {
        return imagesArray; // Default case
      }
      if (selectedCountry === "India" && selectedPartnerType === "Partners") {
        return IndianPartners;
      }
      if (selectedCountry === "Globe" && selectedPartnerType === "Friends") {
        return GlobalFriends;
      }
      if (selectedCountry === "Globe" && selectedPartnerType === "Partners") {
        return GlobalPartners;
      }
    };

    setImagesToDisplay(getImages());
  }, [selectedCountry, selectedPartnerType]);

  return (
    <div className="toplayer">
      <div>
        <h2 className="topmainheading font-[NetflixM]">{languageStrings[selectedLanguage].topHeading}</h2>
      </div>

      <fieldset className="fieldset">
        <div className="DesktopField">
          <div className="firstselect">
            <div className="firstfield">
            <SelectDemo
                placeholder={languageStrings[selectedLanguage].placeHolder1}
                options={languageStrings[selectedLanguage].countryOptions}
                value={selectedCountry}
                onChange={setSelectedCountry}
              />
            </div>
          </div>
          <div className="firstselect">
            <div className="firstfield">
            <SelectDemo
                placeholder={languageStrings[selectedLanguage].placeHolder2}
                options={languageStrings[selectedLanguage].partnerOptions}
                value={selectedPartnerType}
                onChange={setSelectedPartnerType}
              />
            </div>
          </div>
        </div>

        <div className="MobileField">
          <div className="Mobilefirstfield">
            <div className="firstfield">
            <SelectDemo
                placeholder={languageStrings[selectedLanguage].placeHolder1}
                options={languageStrings[selectedLanguage].countryOptions}
                value={selectedCountry}
                onChange={setSelectedCountry}
              />
            </div>
          </div>
          <div className="Mobilefirstfield">
            <div className="firstfield">
            <SelectDemo
                placeholder={languageStrings[selectedLanguage].placeHolder2}
                options={languageStrings[selectedLanguage].partnerOptions}
                value={selectedPartnerType}
                onChange={setSelectedPartnerType}
              />
            </div>
          </div>
        </div>
      </fieldset>

      <div className="top10Section">
        <div className="topSection1">

          <div>

            {showLeftButton && (<div  className="leftslider">
              <button onClick={() => scroll("left")} className="leftsilderbutton">
                <svg
                  className="overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  data-icon="ChevronLeftStandard"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.41409 12L15.707 19.2928L14.2928 20.7071L6.29277 12.7071C6.10523 12.5195 5.99988 12.2652 5.99988 12C5.99988 11.7347 6.10523 11.4804 6.29277 11.2928L14.2928 3.29285L15.707 4.70706L8.41409 12Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>)}
          </div>

          <div className="structure" >
            <ImageList images={imagesToDisplay} ref={listRef}/>
          </div>

          <div>
            {showRightButton && (<div className="slider">
              <button onClick={() => scroll("right")} className="silderbutton">
                <svg
                  className="overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  data-icon="ChevronRightStandard"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>)}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SectionTop;
