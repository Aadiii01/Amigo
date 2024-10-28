import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  UserRoundCheck,
  UserRoundPlus,
  UserRoundPen,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { Logo } from "@/Utils/Data";

const MobileHeader = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => {
    setIsOpen(false);
  };
  const openSidebar = () => {
    setIsOpen(true);
  };
  const { connections } = useSelector((store) => store.connectionData);
  const { request } = useSelector((store) => store.requestData);

  // Function to check if the link is active without the leading "/"
  const isActive = (path) => location.pathname.includes(path);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-small font-medium font-[NetflixR]">
          <Link
            to="/home"
            className="flex items-center gap-2 text-lg font-semibold"
            onClick={closeSidebar}
          >
            <img src={Logo} className="w-[70px] mt-[-10px]" />
          </Link>
          <Link
            to="myconnection"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
              isActive("myconnection") ? "text-black" : "text-muted-foreground"
            }`}
            onClick={closeSidebar}
          >
            <UserRoundCheck className="h-5 w-5" />
            My Connection
            {connections?.totalCount && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-[NetflixT] bg-[#e50914] hover:bg-[#eb6067]">
                {connections.totalCount}
              </Badge>
            )}
          </Link>
          <Separator className="" />

          <Link
            to="pendingconnection"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
              isActive("pendingconnection")
                ? "text-black"
                : "text-muted-foreground"
            }`}
            onClick={closeSidebar}
          >
            <UserRoundPlus className="h-5 w-5" />
            Pending Connection
            {request !== 0 && request.length !== 0 && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-[NetflixT] bg-[#e50914] hover:bg-[#eb6067]">
                {request.length}
              </Badge>
            )}
          </Link>
          <Separator className="" />

          <Link
            to="profile"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
              isActive("profile") ? "text-black" : "text-muted-foreground"
            }`}
            onClick={closeSidebar}
          >
            <UserRoundPen className="h-5 w-5" />
            My Profile
          </Link>
          <Separator className="" />

          <Link
            to="settings"
            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
              isActive("settings") ? "text-black" : "text-muted-foreground"
            }`}
            onClick={closeSidebar}
          >
            <Settings className="h-5 w-5" />
            Setting
          </Link>
        </nav>

        <div className="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-[NetflixT]">Amigo Pro</CardTitle>
              <CardDescription className="font-[NetflixT]">
                Unlock premium features, connect with more friends, and enjoy
                priority chat.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="sm"
                className="w-full bg-[#e50914] hover:bg-[#eb6067]"
              >
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;
