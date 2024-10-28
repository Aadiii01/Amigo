import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";

import { ScrollShadow } from "@nextui-org/react";
import { MapPin } from "lucide-react";
import "../../Styles/MyConnetion.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unfriendConnection } from "@/Store/connectionSlice";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getFirst20Words = (text) => {
  return text.split(" ").slice(0, 15).join(" ") + (text.split(" ").length > 15 ? "..." : "");
};

const MyConnetion = ({connections}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();


  const handleClick = (userId) => {
    navigate(`/home/userProfile/${userId}`)
  }

  const handeUnfriendConnection = async (userId) => {
    try {
      const result = await dispatch(unfriendConnection(userId)).unwrap();
      if (result?.success) {
        toast({
          variant: "outline",
          description: "Unfriend Successfully",
          className: "text-white font-[NetflixL] bg-[#00c06a]"
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Due to server issue you can't Unfriend",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        className: "text-white font-[NetflixL]"
      });
    }
  };

  return connections && (
    <ScrollShadow
      className="p-2 scrolll bg-transparent"
      hideScrollBar
      size={50}
    >
      {connections.map((user, index) => (
        <Card
          className="transition-transform transform hover:scale-105 hover:shadow-lg bg-white shadow-none border connectioncard "
          key={user?._id}
        >
          <CardHeader className="justify-between cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className="flex gap-4 cursor-pointer" onClick={() => handleClick(user._id)}>
              <Avatar
                isBordered
                radius="full"
                size="md"
                color="danger"
                className="object-cover"
                src={user.avatar}
              />
              <div className="flex flex-col gap items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600 font-[NetflixT]">
                {capitalizeWords(user.fullName)}
                </h4>
                <h5 className="text-small tracking-tight text-default-400 font-[NetflixT]">{`@${user.userName}`}
                </h5>
              </div>
            </div>
            <Button
              className={`font-[NetflixL] bg-[#e50914] text-[10px] text-white border-white`}
              color="primary"
              radius="full"
              size="sm"
              variant="bordered"
              onClick={() => handeUnfriendConnection(user?._id)}
            >
              UNFRIEND
            </Button>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400 font-[NetflixT]">
            <p>{getFirst20Words(user.about)}</p>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex flex-row items-center justify-center gap-1">
              <MapPin className="h-3 w-3 text-default-400" />
              <p className=" text-default-400 text-small font-[NetflixT]">
              {`${capitalizeWords(user.address.city)}, ${capitalizeWords(user.address.state)}`}
              </p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </ScrollShadow>
  );
};

export default MyConnetion;
