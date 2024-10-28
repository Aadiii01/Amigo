import React from "react";
import { smallFooterlist } from "@/Utils/Data";
import "../../Styles/SmallFooter.css";

const List = ({acol,hacol}) => {
  return (
    <ul className="footer-links structural">
      {smallFooterlist.map((data,index) => (
        <li key={index} className="footer-link-item">
          <a  className={`font-[NetflixL] ${acol} ${hacol} cursor-pointer`}>{data}</a>
        </li>
      ))}
    </ul>
  );
};

const SmallFooter = ({colorfooter,coptextcol,acol,hacol}) => {
  return (
    <div className={`site-footer-wrapper centered ${colorfooter}`}>
      <div className="footer-divider"></div>
      <div className="site-footer">
        <p className={`footer-top ${coptextcol} font-[NetflixR]`}>
          Questions? Call 000-800-919-1694
        </p>
        <List acol={acol} hacol={hacol}/>
        <h3 className={`sm:mt-4 mt-2 font-[NetflixT] ${coptextcol} font-[14px] text-center`}>Copyright © 2024 Amigo Inc, All right reserved.</h3>
      </div>
    </div>
  );
};

export default SmallFooter;
