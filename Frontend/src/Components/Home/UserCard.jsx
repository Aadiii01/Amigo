import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Avatar,
} from "@nextui-org/react";
import { MapPin, Tag } from "lucide-react";
import { HeartIcon } from "@/Utils/Icon";
import { DeleteDocumentIcon } from "@/Utils/Icon";
import { useNavigate } from "react-router-dom";
import "../../Styles/UserCard.css";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { sendConnection } from "@/Store/feedSlice";

const UserCard = ({user}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const id = user?._id
  const avatar = user?.avatar || "https://res.cloudinary.com/djpeymtc8/image/upload/f_auto,q_auto/zru3eyxdmilwnujzzy27";
  const userName = user?.userName || "username";
  let fullName = user?.fullName || "Full Name";
  const capitalizedFullName = fullName
  .split(" ")  
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
  .join(" ")
  const limitedFullName = capitalizedFullName.slice(0, 16);

  const age = user?.age || "00";
  const interests = user?.interest?.slice(0, 2)
  .map(interest => interest.charAt(0).toUpperCase() + interest.slice(1)) 
  .join(", ") || "interests, interests";
  let city = user?.address?.city || "City";
  if (city) {
    city = city.charAt(0).toUpperCase() + city.slice(1);
  }
  let state = user?.address?.state || "State";
  if (state) {
    state = state.charAt(0).toUpperCase() + state.slice(1);
  }
  const photos = user?.photos || "https://res.cloudinary.com/djpeymtc8/image/upload/f_auto,q_auto/t3jfpgxxuxxgr8rkp1us"; 

  const handleClick = () => {
    navigate(`/home/userProfile/${user?._id}`)
  }

  const handleSendConnection = async (requestId, status) => {
    try {
      const result = await dispatch(sendConnection({requestId, status})).unwrap();
      if(result?.data?.success){
        const recipentName = result?.data?.data?.recipient?.fullName;
        if (status === "like") {
          toast({
            variant: "outline",
            description: `Send Connection to ${recipentName}`,
            className: "text-white font-[NetflixL] bg-[#00c06a]"
          });
        } else if (status === "pass") {
          toast({
            variant: "outline",
            description: `Ignore ${recipentName} Profile`,
            className: "text-white font-[NetflixL] bg-[#e50914]"
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Due to server issue you can't send Connetion",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        className: "text-white font-[NetflixL]"
      });
    }
  }

  return (
    <Card isFooterBlurred className="w-auto setfile">
      <CardHeader className="absolute z-10 top-1 flex-row items-start justify-between">
        <div className="flex gap-1 cursor-pointer" onClick={handleClick}>
          <Avatar
            radius="full"
            size="md"
            className="object-cover"
            src={avatar}
          />
          <div className="flex flex-col justify-start">
            <h5 className="text-small tracking-tight text-white font-[NetflixT] text">
              {`@${userName}`}
            </h5>
          </div>
        </div>
        <Button
          isIconOnly
          className="text-default-400 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
          radius="full"
          variant="light"
          onClick={()=>handleSendConnection(id,"like")}
        >
          <HeartIcon
            className={`text-[#e50914]`}
          />
        </Button>
      </CardHeader>
      <Image
      isZoomed
        removeWrapper
        alt="Relaxing app background"
        className="card-image z-0"
        src={photos}
      />
      <CardBody className="absolute flex flex-row bottom-20 z-10 px-3 gap-2 mb-[-22px] text-small text-default-400 ">
        <h4 className="text-white font-[BeStrong] text-2xl pt-[7px] text">
          {limitedFullName}
        </h4>
        <span className="text-white font-[NetflixL] text-2xl text">{age}</span>
      </CardBody>
      <CardFooter className="absolute bg-black/40 border-white/20 bottom-0 z-10 border-t-1 before:rounded-xl shadow-small">
        <div className="flex flex-grow gap-2 items-center">
          <div className="flex flex-col gap-2 font-[NetflixR]">
            <div className="flex flex-row gap-1">
              <Tag className="w-4 h-4 text-white/60" />
              <p className="text-tiny text-white/60">{`${interests} ...`}</p>
            </div>
            <div className="flex flex-row gap-1">
              <MapPin className="w-4 h-4 text-white/60" />
              <p className="text-tiny text-white/60">{`${city}, ${state}`}</p>
            </div>
          </div>
        </div>
        <Button
          isIconOnly
          className="text-default-400 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
          radius="full"
          variant="light"
          onClick={()=>handleSendConnection(id,"pass")}
        >
          <DeleteDocumentIcon
            className={`w-6 h-6 text-[#e50914] mt-4`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
