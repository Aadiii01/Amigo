import React, { useEffect } from "react";
import PendingConnection from "./PendingConnection";
import { NoRequest } from "@/Utils/NoFound";
import { PendingConnectionShimmer } from "@/Utils/Shimmer";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequest } from "@/Store/requestSlice";

const MyRequestPage = () => {
  const dispatch = useDispatch();
  const { request, isLoading } = useSelector((store) => store.requestData);
  useEffect(() => {
    dispatch(fetchRequest());
  }, []);
  if (isLoading) {
    return <PendingConnectionShimmer />;
  }
  if (!isLoading && request.length === 0 || request === 0) {
    return <NoRequest />;
  }
  return request && (
    <main className="flex flex-1 flex-col gap-2 p-4 lg:gap-2 lg:p-6 gradd">
      <div className="flex items-center">
        <h1
          className="font-[BeStrong] md:text-2xl md:pb-1 ml-3 bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 
    bg-clip-text text-lg font-bold text-transparent"
        >
          Pending Connection
        </h1>
      </div>
      <div
        className="flex flex-1 items-start sm:items-center justify-center"
        x-chunk="dashboard-02-chunk-1"
      >
        <PendingConnection requests={request}/>
      </div>
    </main>
  );
};

export default MyRequestPage;
