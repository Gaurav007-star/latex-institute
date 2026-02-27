import React, { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchIcon } from "lucide-react";
import { PiSunDimLight, PiMoonLight } from "react-icons/pi";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import ProjectComponent from "@/components/Project/ProjectComponent";
import { useTheme } from "@/context/ThemeProvider";
import Dashboard from "@/components/Dashboard/Dashboard";
import Subscription from "@/components/subscription/Subscription";
import Setting from "@/components/setting/Setting";
import Pricing from "@/components/Pricing/Pricing";
import Article from "@/components/Article/Article";
import { AppSidebar } from "@/components/custom/AppSidebar";
import { AuthProvider, useAuth } from "@/context/AuthProvider";

const Home = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("dark");
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "/";

  const { logout, user } = useAuth();

  const { setTheme: setContextTheme } = useTheme();

  useEffect(() => {
    setContextTheme(theme);
  }, [theme]);

  const LogoutHAndler = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="navbar-section w-full h-[10vh] flex items-center justify-between gap-4 px-5">

        <div className="left-part w-max h-max flex items-center gap-4">
          {/* OPEN CLOSE ICON SECTION */}
          <SidebarTrigger />
        </div>


        <div className="right-part w-max h-max flex items-center gap-2">
          {/* THEME CHANGER */}
          <div
            className="theme-changer text-[20px] bg-muted p-2 rounded-full cursor-pointer"
            onClick={() =>
              setTheme((prev) => {
                if (prev === "dark") {
                  return "light";
                } else if (prev === "light") {
                  return "dark";
                }
              })
            }
          >
            {theme === "dark" ? <PiMoonLight className="text-muted-foreground" /> : <PiSunDimLight />}
          </div>

          {/* USER AVATAR */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* DROP DOWN SECTION */}
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className={`w-max bg-transparent outline-none border-none`}
            >
              <button
                aria-label="Open menu"
                className="flex items-center cursor-pointer text-primary"
              >
                <span>{user ? user.portalUsername : "Admin"}</span>{" "}
                <MdOutlineKeyboardArrowDown className="text-[24px]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
              {/* <DropdownMenuItem onClick={() => navigate("/?view=setting")}>
                Account Settings
              </DropdownMenuItem> */}
              <DropdownMenuItem
                onClick={LogoutHAndler}
                className={`cursor-pointer`}
              >
                Logout
              </DropdownMenuItem>
              {/* <DropdownMenuItem>Help</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Home;
