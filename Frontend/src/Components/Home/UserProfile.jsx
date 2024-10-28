import React, { useEffect } from "react";
import MyProfile from "./MyProfile";
import { useDispatch, useSelector } from "react-redux";
import { ProfileShimmer } from "@/Utils/Shimmer";
import { useParams } from "react-router-dom";
import { fetchProfileById } from "@/Store/userProfile";
import { NoProfile } from "@/Utils/NoFound";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { userProfile, isLoading, error } = useSelector(
    (state) => state.userProfileData
  );

  const name = userProfile?.data?.fullName || "Profile"

  useEffect(() => {
    if (id) {
      dispatch(fetchProfileById({ id }));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <ProfileShimmer />;
  }
  
  if(error){
    return <NoProfile/>
  }

  return userProfile &&  (
    <main className="flex flex-col gap-2 p-4 lg:gap-2 lg:p-6 gradd">
      <div className="flex items-center">
        <h1
          className="font-[NetflixL] md:text-2xl md:pb-1 ml-3 bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 
bg-clip-text text-lg font-bold text-transparent"
        >
          {name}
        </h1>
      </div>
      <div
        className="flex items-center sm:items-center justify-center"
        x-chunk="dashboard-02-chunk-1"
      >
        <MyProfile user={userProfile?.data}/>
      </div>
    </main>
  );
};

export default UserProfile;
