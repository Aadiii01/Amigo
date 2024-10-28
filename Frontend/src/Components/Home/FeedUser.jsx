import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { NoUserCard } from "@/Utils/NoFound";
import { CardShimmer } from "@/Utils/Shimmer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/Store/feedSlice";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { HeartIcon } from "@/Utils/Icon";
import { DeleteDocumentIcon } from "@/Utils/Icon";

const FeedUser = () => {
  const { feed, isLoading } = useSelector((store) => store.feedData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (isLoading) {
    return <CardShimmer />;
  }

  if (!isLoading && feed?.data.length === 0 || feed?.data === 0) {
    return <NoUserCard />;
  }

  return (
    feed?.data && (
      <main className="flex flex-1 flex-col gap-1 p-4 lg:gap-6 lg:p-6 gradd">
        <div className="flex items-center justify-between flex-row">
          <h1
            className="font-[BeStrong] md:text-2xl md:pb-1 bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 
      bg-clip-text text-lg font-bold text-transparent"
          >
            Amigo Users
          </h1>
          <div className="flex flex-row gap-2">
            <div className="">
              <Popover placement="left">
                <PopoverTrigger>
                  <Button
                    isIconOnly
                    className="text-default-400 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                    radius="full"
                    variant="light"
                  >
                    <HeartIcon className={`text-[#e50914]`} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-tiny font-[NetflixL]">
                      Press for send connection
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="">
              <Popover placement="left">
                <PopoverTrigger>
                  <Button
                    isIconOnly
                    className="text-default-400 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                    radius="full"
                    variant="light"
                  >
                    <DeleteDocumentIcon className={`text-[#e50914] w-6 h-6`} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-tiny font-[NetflixL]">
                      Press for ignore
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div
          className="flex flex-1 items-center justify-center"
          x-chunk="dashboard-02-chunk-1"
        >
          <UserCard user={feed?.data[0]} />
        </div>
      </main>
    )
  );
};

export default FeedUser;
