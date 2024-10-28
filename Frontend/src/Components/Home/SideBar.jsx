import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserRoundCheck,
  UserRoundPlus,
  UserRoundPen,
  Settings,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/Utils/Data";
import { useSelector } from "react-redux";

const SideBar = () => {
  const location = useLocation();

  const { connections } = useSelector((store) => store.connectionData);
  const { request } = useSelector((store) => store.requestData);

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      {/* Logo AMigo */}
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link to="/home" className="flex items-center gap-2 font-semibold">
          <img src={Logo} className="w-[90px]" />
        </Link>
      </div>

      {/* Side Nav Bar */}
      <div className="flex-1 font-[NetflixR]">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {/* My Connection Link */}
          <Link
            to="myconnection"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("myconnection")
                ? "text-black bg-gray-200" // active state
                : "text-muted-foreground hover:text-primary" // non-active state
            }`}
          >
            <UserRoundCheck className="h-4 w-4" />
            My Connection
            {connections?.totalCount && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-[NetflixT] bg-[#e50914] hover:bg-[#eb6067]">
                {connections.totalCount}
              </Badge>
            )}
          </Link>

          <Separator className="my-2" />

          {/* Pending Connection Link */}
          <Link
            to="pendingconnection"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("pendingconnection")
                ? "text-black bg-gray-200" // active state
                : "text-muted-foreground hover:text-primary" // non-active state
            }`}
          >
            <UserRoundPlus className="h-4 w-4" />
            Pending Connection
            {request !== 0 && request.length !== 0 && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-[NetflixT] bg-[#e50914] hover:bg-[#eb6067]">
                {request.length}
              </Badge>
            )}
          </Link>

          <Separator className="my-2" />

          {/* My Profile Link */}
          <Link
            to="profile"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("profile")
                ? "text-black bg-gray-200" // active state
                : "text-muted-foreground hover:text-primary" // non-active state
            }`}
          >
            <UserRoundPen className="h-4 w-4" />
            My Profile
          </Link>

          <Separator className="my-2" />

          {/* Settings Link */}
          <Link
            to="settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive("settings")
                ? "text-black bg-gray-200" // active state
                : "text-muted-foreground hover:text-primary" // non-active state
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>

      {/* Upgrade Button */}
      <div className="mt-auto p-4">
        <Card x-chunk="dashboard-02-chunk-0">
          <CardHeader className="p-2 pt-0 md:p-4">
            <CardTitle className="font-[NetflixT]">Amigo Pro</CardTitle>
            <CardDescription className="font-[NetflixT]">
              Unlock premium features, connect with more friends, and enjoy
              priority chat.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
            <Button
              size="sm"
              className="w-full bg-[#e50914] hover:bg-[#eb6067]"
            >
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SideBar;
