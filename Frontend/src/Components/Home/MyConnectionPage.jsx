import React, { useEffect } from "react";
import MyConnetion from "./MyConnetion";
import { NoConnection } from "@/Utils/NoFound";
import { MyConnectionShimmer } from "@/Utils/Shimmer";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnection } from "@/Store/connectionSlice";

const MyConnectionPage = () => {
  const dispatch = useDispatch();
  const { connections, isLoading, error } = useSelector(
    (store) => store.connectionData
  );
  useEffect(() => {
    dispatch(fetchConnection());
  }, []);
  if (isLoading) {
    return <MyConnectionShimmer />;
  }
  if (!isLoading && connections?.data === 0 || connections?.data?.length === 0) {
    return <NoConnection />;
  }
  return connections &&  (
    <main className="flex flex-1 flex-col gap-2 p-4 lg:gap-2 lg:p-6 gradd">
      <div className="flex items-center">
        <h1
          className="font-[BeStrong] md:text-2xl md:pb-1 ml-3 bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 
      bg-clip-text text-lg font-bold text-transparent"
        >
          My Connection
        </h1>
      </div>
      <div
        className="flex flex-1 items-start sm:items-center justify-center"
        x-chunk="dashboard-02-chunk-1"
      >
        <MyConnetion connections={connections?.data}/>
      </div>
    </main>
  );
};

export default MyConnectionPage;
