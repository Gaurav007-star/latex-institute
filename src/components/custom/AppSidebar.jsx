import {
  User2,
  LayoutDashboard,
  Database,
  DollarSign,
  LayoutTemplate,
  BookTemplate,
  LayoutTemplateIcon,
  Box,
  User,
  University,
  HeadphoneOff,
  HeadphonesIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Link, useLocation, useSearchParams } from "react-router";
import { Button } from "../ui/button";
import { CustomMainModal } from "./CustomMainModal";
import clsx from "clsx";
import { MdArticle, MdReport } from "react-icons/md";
import { useEffect, useState } from "react";
import { RiArrowDropDownLine, RiCircleFill } from "react-icons/ri";
import { AnimatePresence, motion } from "motion/react";
import { PiCircleFill } from "react-icons/pi";
import { HiDocument, HiDocumentReport } from "react-icons/hi";

// Menu items.
const items = [
  {
    title: "Organization",
    url: "/organization",
    icon: University,
  },
  {
    title: "User",
    url: "/user",
    icon: User,
  },
  { title: "Report", url: "/report", icon: HiDocumentReport },
  {
    title: "Billing",
    url: "/billing",
    icon: DollarSign,
  },
  {
    title: "Support",
    url: "/support",
    icon: HeadphonesIcon,
  },
];

const listItems = [
  // {
  //   title: "Subscription",
  //   icon: DollarSign,
  //   match: "subscription",
  //   sublists: [{ title: "Overview", url: "/subscription" }],
  // },
  // {
  //   title: "Subscription",
  //   icon: DollarSign,
  //   match: "subscription",
  //   sublists: [
  //     { title: "Plans", url: "/sub_list" },
  //     { title: "Promo", url: "/sub_promo" },
  //   ],
  // },
  // {
  //   title: "Order",
  //   icon: Box,
  //   match: "order",
  //   sublists: [
  //     { title: "list", url: "/order" },
  //   ],
  // },
];

export function AppSidebar() {
  const [selectedItem, setSelectedItem] = useState("List");
  const location = useLocation();
  const [openIndex, setOpenIndex] = useState(null);

  // Auto-close when route changes (optional but usually desired)
  useEffect(() => {
    // setOpenIndex(null);
  }, [location.pathname]);

  return (
    <Sidebar>
      <SidebarContent className={`flex flex-col justify-between h-full`}>
        <SidebarGroup>
          <SidebarGroupLabel
            className={`text-primary font-semibold text-[30px] mt-3`}
          >
            Latexio
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className={`w-full h-max my-5`}>
              {items.slice(0, 5).map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={clsx(
                    "w-full flex items-center justify-between px-4 py-2 rounded-md text-[18px] hover:bg-primary/10 hover:text-primary transition-transform cursor-pointer",
                    location.pathname === item.url
                      ? "text-primary font-semibold bg-primary/10"
                      : ""
                  )}
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="">
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {listItems.map((list, index) => {
                const Icon = list.icon;
                const isOpen = openIndex === index;

                return (
                  <SidebarMenuItem key={index} className="w-full">
                    {/* MAIN ITEM (Clickable Dropdown Header) */}
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className={clsx(
                        "w-full flex items-center justify-between px-4 py-2 rounded-md text-[18px] hover:bg-primary/10 transition-all cursor-pointer",
                        list.sublists.some((s) => location.pathname === s.url)
                          ? "text-primary font-semibold bg-primary/10"
                          : ""
                      )}
                    >
                      <SidebarMenuButton asChild>
                        <Link>
                          <Icon />
                          {list.title}
                        </Link>
                      </SidebarMenuButton>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <RiArrowDropDownLine className="size-7" />
                      </motion.div>
                    </button>

                    {/* SUBLIST DROPDOWN */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden pl-6 "
                        >
                          {list.sublists.map((item, i) => (
                            <SidebarMenuItem key={i}>
                              <SidebarMenuButton asChild className={``}>
                                <Link
                                  to={item.url}
                                  onClick={() => {
                                    setSelectedItem(item.title);
                                  }}
                                  className={clsx(
                                    "flex items-center gap-2 p-6 my-1 rounded-md hover:!bg-primary/10 transition-all",
                                    location.pathname === item.url
                                      ? "text-primary font-semibold bg-primary/10"
                                      : ""
                                  )}
                                >
                                  {item.title}
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
