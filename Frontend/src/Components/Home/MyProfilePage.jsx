import React, { useEffect } from "react";
import MyProfile from "./MyProfile";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "@/Store/userSlice";
import { ProfileShimmer } from "@/Utils/Shimmer";

const MyProfilePage = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkUser());
  // }, []);

  const { user, isLoading } = useSelector((state) => state.userData);
  const { data } = user || {};
  const profileData = data?.user || data;

  if (isLoading || !user) {
    return <ProfileShimmer />;
  }

  return (
    <main className="flex flex-col gap-2 p-4 lg:gap-2 lg:p-6 gradd">
      <div className="flex items-center">
        <h1
          className="font-[BeStrong] md:text-2xl md:pb-1 ml-3 bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 
  bg-clip-text text-lg font-bold text-transparent"
        >
          Profile
        </h1>
      </div>
      <div
        className="flex items-center sm:items-center justify-center"
        x-chunk="dashboard-02-chunk-1"
      >
        <MyProfile user={profileData} />
      </div>
    </main>
  );
};

export default MyProfilePage;
