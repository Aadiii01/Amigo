import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRoundCheck,
  UserRoundPlus,
  LogOut,
  Settings,
  UserRoundPen,
  MessageCircleCode,
  Gem,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, User } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/Store/userSlice";

const DropAvatar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userData);

  const name = user?.data?.fullName || user?.data?.user?.fullName || "Your Name";
  const username = user?.data?.userName || user?.data?.user?.userName || "User Name";
  const avatarUrl = user?.data?.avatar || user?.data?.user?.avatar

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); 
      // window.location.href = "/signin";
      navigate("/signin", {replace:true});
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar
          isBordered
          color="danger"
          as="button"
          className="transition-transform"
          src={avatarUrl}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-[NetflixL]" align="end">
        <DropdownMenuLabel>
          <DropdownMenuItem key="profile" className="h-14 gap-2"> {/* isReadOnly before key="profile"*/}
            <User
              name={name}
              description={username}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "md",
                src: avatarUrl
              }}
            />
          </DropdownMenuItem>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="profile">
            <DropdownMenuItem>
              <UserRoundPen className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link to="settings">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <MessageCircleCode className="mr-2 h-4 w-4" />
          <span>Chat</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Gem className="mr-2 h-4 w-4" />
          <span>Amigo Pro</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link to="myconnection">
          <DropdownMenuItem>
            <UserRoundCheck className="mr-2 h-4 w-4" />
            <span>My Connection</span>
          </DropdownMenuItem>
        </Link>
        <Link to="pendingconnection">
          <DropdownMenuItem>
            <UserRoundPlus className="mr-2 h-4 w-4" />
            <span>Pending Connection</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropAvatar;
