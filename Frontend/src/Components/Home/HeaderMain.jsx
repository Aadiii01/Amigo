import React from "react";
import DropAvatar from "./DropAvatar";
import MobileHeader from "./MobileHeader";
import "../../Styles/Home.css";

const HeaderMain = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6">
      <MobileHeader />

      <div className="w-full flex-1">
        <form>
          <div className="react-autosuggest__container md:w-2/3 lg:w-2/3">
            <div className="inpclass">
              {/* <input
              disabled
                className="form-control font-[NetflixR]"
              /> */}
              {/* <p className="form-control">Hello</p> */}
              {/* <button className="search-control "></button> */}
            </div>
          </div>
        </form>
      </div>

      <DropAvatar />
    </header>
  );
};

export default HeaderMain;
