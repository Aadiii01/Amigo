import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Avatar,
   
} from "@nextui-org/react";
import { MapPin, Tag, Handshake } from "lucide-react";
import { ScrollShadow } from "@nextui-org/react";
import "../../Styles/MyProfile.css";

const MyProfile = ({ user }) => {
  const avatar =
    user?.avatar ||
    "https://res.cloudinary.com/djpeymtc8/image/upload/f_auto,q_auto/zru3eyxdmilwnujzzy27";
  const userName = user?.userName || "username";
  let fullName = user?.fullName || "Full Name";
  const capitalizedFullName = fullName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const limitedFullName = capitalizedFullName.slice(0, 16);

  const age = user?.age || "00";
  let gender = user?.gender || "gender";
  if (gender) {
    gender = gender.charAt(0).toUpperCase() + gender.slice(1);
  }
  const interests =
    user?.interest
      ?.slice(0, 2)
      .map((interest) => interest.charAt(0).toUpperCase() + interest.slice(1))
      .join(", ") || "interests, interests";
  let city = user?.address?.city || "City";
  if (city) {
    city = city.charAt(0).toUpperCase() + city.slice(1);
  }
  let state = user?.address?.state || "State";
  if (state) {
    state = state.charAt(0).toUpperCase() + state.slice(1);
  }
  const about = user?.about || "Hello i join the amigo today how are you ";
  const photos =
    user?.photos ||
    "https://res.cloudinary.com/djpeymtc8/image/upload/f_auto,q_auto/t3jfpgxxuxxgr8rkp1us";


  return (
    <Card className="profilecard" isFooterBlurred>
      <Image className="card-imag" removeWrapper src={photos} />
      <CardHeader className="flex items-center justify-center transition-transform transform hover:scale-105 hover:shadow-lg">
        <div className="flex gap-2">
          <Avatar
            isBordered
            radius="full"
            color="danger"
            className="object-cover w-20 h-20 text-large"
            src={avatar}
          />
        </div>
      </CardHeader>
      <Divider />
      <div className="px-3 pt-2 text-small text-default-400 ">
        <div className="flex flex-col items-start">
          <label className="text-xs tracking-tight text-black font-[NetflixT] ">
            Full Name
          </label>
          <h5 className="text-small tracking-tight text-black font-[NetflixL]">
            {limitedFullName}
          </h5>
        </div>
        <div className="flex flex-col items-start mt-2">
          <label className="text-xs tracking-tight text-black font-[NetflixT]">
            Username
          </label>
          <h5 className="text-small tracking-tight text-black font-[NetflixL] ">
            {`@${userName}`}
          </h5>
        </div>
        <div className="flex flex-col items-start mt-2">
          <label className="text-xs tracking-tight text-black font-[NetflixT]">
            Age
          </label>
          <h5 className="text-small tracking-tight text-black font-[NetflixL] ">
            {age}
          </h5>
        </div>
        <div className="flex flex-col items-start mt-2">
          <label className="text-xs tracking-tight text-black font-[NetflixT]">
            Gender
          </label>
          <h5 className="text-small tracking-tight text-black font-[NetflixL] ">
            {gender}
          </h5>
        </div>
      </div>
      <Divider className="mt-2" />
      <div className="px-3 pt-2 text-small text-black ">
        <div className="flex flex-row gap-2 items-center justify-start">
          <Tag className="w-4 h-4 text-black" />
          <h5 className="text-small tracking-tight text-default-700 font-[NetflixL] ">
            {interests}
          </h5>
        </div>
        <div className="flex flex-row gap-2 items-center justify-start mt-2">
          <MapPin className="w-4 h-4 text-black" />
          <h5 className="text-small tracking-tight text-default-700 font-[NetflixL] ">
            {`${city}, ${state}`}
          </h5>
        </div>
      </div>
      <Divider className="mt-2" />
      <CardBody className="px-3 text-small text-default-400 gap-1">
        <label className="text-xs tracking-tight text-black font-[NetflixT] ">
          About
        </label>
        <ScrollShadow
          hideScrollBar
          size={70}
          className="p-1 scroll-shadow max-h-[120px]"
        >
          <h5 className="text-small tracking-tight text-default-700 font-[NetflixL]">
            {about}
          </h5>
        </ScrollShadow>
      </CardBody>
      <Divider className="mt-3" />
      <CardFooter className="bg-black/70 border-white/20 min-h-12">
        <div className="flex flex-row items-center gap-3">
          <Handshake  className="w-5 h-5 text-default-400" />
          <p className="text-default-400 text-small font-[NetflixT]">
          Let's connect & share beautiful moments!
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MyProfile;
