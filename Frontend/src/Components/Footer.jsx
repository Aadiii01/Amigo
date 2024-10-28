import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import {languageStrings} from "../Utils/language.js"
import {languageLinks} from "../Utils/language.js"
import { useLanguage } from '../context/LanguageContext.jsx';
import { Logo } from '@/Utils/Data.jsx';
import "../Styles/Footer.css"

export const Listing = ({title,links,mainT,hovera}) => {
  return (
    <div>
      <h4 className={`mx-0 mt-0 mb-4 leading-5 text-[14px] ${mainT} font-[NetflixR] font-medium`}>{title}</h4>
        {links.map((link, index) => (
          <a key={index} className={`mt-0 mb-3 leading-5 text-[14px] text-[#888] ${hovera} font-[GeistL] block rounded-sm cursor-pointer`}>
            {link}
          </a>
        ))}
    </div>
  )
}

export const SocialIcon = ({ IconComponent, url, textSize }) => {
  return (
    <>
      <a className={`my-0 leading-5 ${textSize} block rounded-sm text-[#888]`} href={url}>
        {<IconComponent />}
      </a>
      <hr className='h-[19px] w-[1px] border-0 block bg-[#333]'></hr>
    </>
  );
}


const Footer = ({bkcolor,mainT,hovera,hh}) => {

  const { selectedLanguage } = useLanguage();

  const resourcesTitle = languageStrings[selectedLanguage].resourcesTitle;
  const moreTitle = languageStrings[selectedLanguage].moreTitle;
  const aboutAmigoTitle = languageStrings[selectedLanguage].aboutAmigoTitle;
  const legalTitle = languageStrings[selectedLanguage].legalTitle;
  const subscribeTitle = languageStrings[selectedLanguage].subscribeTitle;
  const subscribeDescription = languageStrings[selectedLanguage].subscribeDescription;
  const subscribeButton = languageStrings[selectedLanguage].subscribeButton;
  const copyrightText = languageStrings[selectedLanguage].copyrightText;

  const resourcesLinks = languageLinks[selectedLanguage].resourcesLinks;
  const moreLinks = languageLinks[selectedLanguage].moreLinks;
  const aboutVercelLinks = languageLinks[selectedLanguage].aboutVercelLinks;
  const legalLinks = languageLinks[selectedLanguage].legalLinks;

  return (
    <div className={`w-full my-0 mx-auto px-0 py-0 overflow-hidden footerClass ${bkcolor}`}>
      <div className='max-w-full ml-auto mr-auto width px-6'>
        <footer className={`py-9 px-0 min-h-[400px] ${hh} sm:h-auto`}>
          {/* Upper Section */}
          <div className='mobile sm:flex sm:flex-wrap sm:justify-between'>
            {/* Amigo Logo */}
            <div className='flex flex-row items-center sm:items-stretch justify-between p-0 gap-0 logo'>
              <a className='mt-[-30px] sm:mt-[-5px] h-5 cursor-pointer'>
                <img className='w-[100px]' src={Logo}/>
              </a>
              {/* Social Media Icon */}
              <div className='flex flex-row items-center justify-start p-0 gap-4 icon_class'>
                <SocialIcon IconComponent={FaGithub} textSize="text-[16px]" url="https://github.com" />
                <SocialIcon IconComponent={FaXTwitter} textSize="text-[16px]" url="https://twitter.com" />
                <SocialIcon IconComponent={FaInstagram} textSize="text-[16px]" url="https://instagram.com" />
              </div>
            </div>
            {/* Listing */}
            <Listing title={resourcesTitle} links={resourcesLinks} mainT={mainT} hovera={hovera}/>
            <Listing title={moreTitle} links={moreLinks} mainT={mainT} hovera={hovera}/>
            <Listing title={aboutAmigoTitle} links={aboutVercelLinks} mainT={mainT} hovera={hovera}/>
            <Listing title={legalTitle} links={legalLinks} mainT={mainT} hovera={hovera}/>
            {/* Input Box */}
            <div className='logo'>
              <h4 className={`mx-0 mt-0 mb-4 leading-5 text-[14px] ${mainT} font-[NetflixR] font-medium`}>{subscribeTitle}</h4>
              <p className='mt-0 leading-5 text-[14px] text-[#888] font-[NetflixR] block rounded-sm sm:max-w-[240px]'>  {subscribeDescription}</p>
              <div className='h-8 mt-3 relative'>
                <input className='border-0 w-full sm:max-w-[240px] bg-[#343434] h-full rounded-md text-[14px] py-0 pl-3 pr-[85px] 
                font-[NetflixR] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' type="email" label="Email" placeholder='you@domain.com' />
                <button className='bg-[#111] py-[2px] px-[6px] text-[12px] rounded absolute text-white font-[NetflixT] 
                right-[5px] top-[13%] hover:text-[#ffc629] borderclass'>{subscribeButton}</button>
              </div>
            </div>
          </div>
          {/* Close Upper Section */}

          {/* Lower Section */}
          <div className='flex flex-row items-center justify-between p-0 gap-0 mt-12 mb-0'>
            {/* Copyright Logo */}
            <div className='flex flex-col items-stretch justify-start p-0 gap-4'>
              <p className='m-0 leading-5 text-[14px] block rounded-sm text-[#888] font-[NetflixT] sm:ml-[500px]'>
                {copyrightText}
              </p>
              {/* Social Media icnon */}
              <div className='flex flex-row items-center justify-start p-0 gap-4 logo_class sm:ml-[580px]'>
                <SocialIcon IconComponent={FaGithub} textSize="text-[20px]" url="https://github.com" />
                <SocialIcon IconComponent={FaXTwitter} textSize="text-[20px]" url="https://twitter.com" />
                <SocialIcon IconComponent={FaInstagram} textSize="text-[20px]" url="https://instagram.com" />
              </div>
            </div>
          </div>
          {/* Closing Lower Section */}
        </footer>
      </div>
    </div>
  )
}

export default Footer