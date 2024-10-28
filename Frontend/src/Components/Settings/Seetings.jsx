import React,{useEffect} from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  checkUser,
} from "@/Store/userSlice";

const Seetings = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkUser());
  // }, [dispatch]);
  
  return (
    <>
      <main className="flex flex-col gap-2 p-4 lg:gap-2 lg:p-6">
        <div className="flex items-center justify-center sm:justify-normal">
          <Breadcrumbs
            className="font-[NetflixL]"
            size="sm"
            classNames={{
              list: "gap-3",
            }}
            itemClasses={{
              item: [
                "px-2 py-0.5 border-small border-default-400 rounded-small h-7",
                "data-[current=true]:border-foreground data-[current=true]:bg-black data-[current=true]:text-white transition-colors",
                "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
              ],
              separator: "hidden",
            }}
          >
            {/* General Breadcrumb */}
            <BreadcrumbItem
              key="General"
              isCurrent={location.pathname === "/home/settings"}
            >
              <Link to="">General</Link>
            </BreadcrumbItem>

            {/* Profile Breadcrumb */}
            <BreadcrumbItem
              key="Profile"
              isCurrent={location.pathname === "/home/settings/updatedetails"}
            >
              <Link to="updatedetails">Profile</Link>
            </BreadcrumbItem>

            {/* Password Breadcrumb */}
            <BreadcrumbItem
              key="Password"
              isCurrent={location.pathname === "/home/settings/changepassword"}
            >
              <Link to="changepassword">Password</Link>
            </BreadcrumbItem>

            {/* Account Breadcrumb */}
            <BreadcrumbItem
              key="Account"
              isCurrent={location.pathname === "/home/settings/delete-account"}
            >
              <Link to="delete-account">Account</Link>
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </main>
      <Outlet />
    </>
  );
};

export default Seetings;
