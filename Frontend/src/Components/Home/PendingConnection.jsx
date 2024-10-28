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
import { HeartIcon } from "@/Utils/Icon";
import { DeleteDocumentIcon } from "@/Utils/Icon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reviewRequest } from "@/Store/requestSlice";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

import "../../Styles/MyConnetion.css";

const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getFirst20Words = (text) => {
  return (
    text.split(" ").slice(0, 15).join(" ") +
    (text.split(" ").length > 15 ? "..." : "")
  );
};

const PendingConnection = ({ requests }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleClick = (userId) => {
    navigate(`/home/userProfile/${userId}`);
  };

  const handleReviewRequest = async (requestId, status) => {
    try {
      const result = await dispatch(reviewRequest({ requestId, status })).unwrap();
      if (result?.data?.success) {
        const requesterName = result?.data?.data?.requester?.fullName;
        if (status === "accept") {
          toast({
            variant: "outline",
            description: `Accept ${requesterName}`,
            className: "text-white font-[NetflixL] bg-[#00c06a]"
          });
        } else if (status === "reject") {
          toast({
            variant: "outline",
            description: `Reject ${requesterName}`,
            className: "text-white font-[NetflixL] bg-[#e50914]"
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Due to server issue you can't review",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        className: "text-white font-[NetflixL]"
      });
    }
  };

  return (
    requests && (
      <ScrollShadow
        className="p-2 scrolll bg-transparent"
        hideScrollBar
        size={50}
      >
        {requests.map((user, index) => ( 
          <Card
            className="transition-transform transform hover:scale-105 hover:shadow-lg bg-white shadow-none border connectioncard "
            key={user?.requester?._id}
          >
            <CardHeader className="justify-between cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg">
              <div
                className="flex gap-4 cursor-pointer"
                onClick={() => handleClick(user.requester?._id)}
              >
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  color="danger"
                  className="object-cover"
                  src={user.requester.avatar}
                  // src={user.requester.avatar}
                />
                <div className="flex flex-col gap items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600 font-[NetflixT]">
                    {capitalizeWords(user.requester.fullName)}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400 font-[NetflixT]">
                    {`@${user.requester.userName}`}
                  </h5>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center">
                <Button
                  isIconOnly
                  className="text-default-400 data-[hover]:bg-foreground/3 -translate-y-2 translate-x-2"
                  radius="full"
                  variant="light"
                  onClick={() => handleReviewRequest(user._id, "reject")}
                >
                  <DeleteDocumentIcon
                    className={`w-6 h-6 text-[#e50914]`}
                  />
                </Button>
                <Button
                  isIconOnly
                  className="text-default-400 data-[hover]:bg-foreground/3 -translate-y-2 translate-x-2"
                  radius="full"
                  variant="light"
                  onClick={() => handleReviewRequest(user._id, "accept")}
                >
                  <HeartIcon
                    className={`text-[#e50914]`}

                  />
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400 font-[NetflixT]">
              <p>{getFirst20Words(user.requester.about)}</p>
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex flex-row items-center justify-center gap-1">
                <MapPin className="h-3 w-3 text-default-400" />
                <p className=" text-default-400 text-small font-[NetflixT]">
                  {`${capitalizeWords(user.requester.address.city)}, ${capitalizeWords(user.requester.address.state)}`}
                </p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </ScrollShadow>
    )
  );
};

export default PendingConnection;
