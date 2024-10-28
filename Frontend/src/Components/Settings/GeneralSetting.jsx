import React from "react";
import { settingimg } from "@/Utils/Data";
import { Image } from "@nextui-org/react";
import { useSelector } from "react-redux";


const GeneralSetting = () => {
  const { user } = useSelector((state) => state.userData);

  const fullName = user?.data?.user?.fullName || user?.data?.fullName || "Your name"

  return (
    <div className="flex items-start sm:items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full lg:w-[60%] mt-4">
        <h3 className="text-xl sm:text-2xl font-[NetflixM] tracking-tight text-center">
          {`Welcome ${fullName} to `}
          <span className="font-[BeStrong] bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 bg-clip-text text-transparent">
            Amigo
          </span>
        </h3>
        <Image
          src={settingimg}
          className="w-auto h-auto sm:w-[420px] sm:h-[360px] object-cover mb-4"
        />
        <p className="text-xs sm:text-sm font-[NetflixL] text-muted-foreground tracking-tight text-center w-[85%] sm:w-[70%] lg:w-[60%] mb-3 sm:mb-0">
          In the settings, you can update your profile details, change your
          password for security, or delete your account permanently if needed.
        </p>
      </div>
    </div>
  );
};

export default GeneralSetting;
