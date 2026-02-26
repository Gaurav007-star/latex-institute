import React from "react";
import { AreaChartComponent } from "../custom/AreaChartComponent";
import { userChartData } from "@/constant/constant";
import { PriceTracking } from "../custom/PriceTracking";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HiOutlineHome } from "react-icons/hi";
const demoStats = [
  {
    title: "Total Revenue",
    value: "$1,250.00",
    change: "+12.5%",
    subtitle: "Trending up this month",
    description: "Visitors for the last 6 months",
  },
  {
    title: "New Customers",
    value: "1,234",
    change: "-20%",
    subtitle: "Down 20% this period",
    description: "Acquisition needs attention",
  },
  {
    title: "Active Accounts",
    value: "45,678",
    change: "+12.5%",
    subtitle: "Strong user retention",
    description: "Engagement exceed targets",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    change: "+4.5%",
    subtitle: "Steady performance",
    description: "Meets growth projections",
  },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  activeUsers: {
    label: "activeUsers",
    color: "var(--chart-1)",
  },
  newProjects: {
    label: "newProjects",
    color: "var(--chart-2)",
  },
};

const Dashboard = () => {
  return (
    <div className="w-full h-max">
      {/* <div className="header w-full h-max px-5 pt-5 flex items-center gap-1 text-[20px] font-semibold text-primary">
        <HiOutlineHome className="size-6" />
        <span>Admin {">"} Dashboard</span>
      </div> */}
      {/* CARD STATS SECTION */}
      <div className="card-section grid grid-cols-2 gap-4 p-5">
        <div className="left grid lg:grid-cols-2 gap-4">
          {demoStats.map((stats, index) => {
            return (
              <Card>
                <CardHeader className={`h-[70px] `}>
                  <CardTitle>{stats.title}</CardTitle>
                  <CardDescription>{stats.description}</CardDescription>
                  <CardAction>{stats.change}</CardAction>
                </CardHeader>
                <CardContent className={`h-[20px] text-secondary-foreground/50`}>
                  <p>{stats.subtitle}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-[40px] ">{stats.value}</p>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="right w-full h-full">
          <PriceTracking />
        </div>
      </div>

      {/* AREA CHART SECTION */}
      <div className="area-chart-section w-full h-max px-5 pb-5">
        <AreaChartComponent
          config={chartConfig}
          data={userChartData}
          title="Website Traffic Analytics"
          description="All users analytics"
          height={300}
          defaultTimeRange="90d"
          showTimeRangeSelector={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;
