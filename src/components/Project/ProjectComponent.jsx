import React, { useMemo, useState } from "react";
import { AreaChartComponent } from "../custom/AreaChartComponent";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PriceTracking } from "../custom/PriceTracking";
import ProjectTable from "../custom/ProjectTable";
import { projectChartData } from "@/constant/constant";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { SearchIcon } from "lucide-react";


const projectStats = [
  {
    title: "Blank Template Usage",
    value: "17",
    change: "100%",
    subtitle: "All use Blank template",
    description: "No template variety yet",
  },
  {
    title: "Project Creation Rate",
    value: "1.4/day",
    change: "Steady",
    subtitle: "Over 12-day period",
    description: "Consistent project creation",
  },
  {
    title: "Collaborative Projects",
    value: "10",
    change: "+58.8%",
    subtitle: "Majority are collaborative",
    description: "Strong sharing culture",
  },
  {
    title: "Multi-page Projects",
    value: "3",
    change: "+17.6%",
    subtitle: "Complex document structures",
    description: "Advanced LaTeX usage",
  },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  soloProjects: {
    label: "soloProjects",
    color: "var(--chart-1)",
  },
  teamProjects: {
    label: "teamProjects",
    color: "var(--chart-2)",
  },
  collaborations: {
    label: "collaborations",
    color: "var(--chart-3)",
  },
};

const ProjectComponent = () => {
  const [search, setSearch] = useState("");

  const setSearchValue = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="routing-component-section w-full h-[90%]">
      {/* CARD STATS SECTION */}
      <div className="card-section grid grid-cols-2 gap-4 p-5">
        <div className="left grid grid-cols-2 gap-4">
          {projectStats.map((stats, index) => {
            return (
              <Card>
                <CardHeader>
                  <CardTitle>{stats.title}</CardTitle>
                  <CardDescription>{stats.description}</CardDescription>
                  <CardAction>{stats.change}</CardAction>
                </CardHeader>
                <CardContent>
                  <p>{stats.subtitle}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-[40px]">{stats.value}</p>
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
          data={projectChartData}
          title="Website Project Traffic Analytics"
          description="Show various projects details"
          height={300}
          defaultTimeRange="90d"
          showTimeRangeSelector={true}
        />
      </div>

      {/* TABLE SECTION */}
      <div className="user-table-section w-full h-max px-5 pb-5 flex flex-col">
        <div className="project-seclect-section w-full h-max py-10 flex justify-end gap-4">
          {/* SEARCH INPUT SECTION */}
          <InputGroup className={`w-[20vw] h-[7vh]`}>
            <InputGroupInput
              placeholder="Search..."
              onChange={setSearchValue}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          {/* SELECT OPTION */}
          <Select>
            <SelectTrigger className="w-[180px] !h-[7vh] cursor-pointer">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  value="all-projects"
                  className={`p-4 rounded-md cursor-pointer`}
                >
                  All Projects
                </SelectItem>
                <SelectItem
                  value="your-projects"
                  className={`p-4 rounded-md cursor-pointer`}
                >
                  Your Projects
                </SelectItem>
                <SelectItem
                  value="shared-projects"
                  className={`p-4 rounded-md cursor-pointer`}
                >
                  Shared Projects
                </SelectItem>
                <SelectItem
                  value="archived-projects"
                  className={`p-4 rounded-md cursor-pointer`}
                >
                  Archived Projects
                </SelectItem>
                <SelectItem
                  value="trashed-projects"
                  className={`p-4 rounded-md cursor-pointer`}
                >
                  Trashed Projects
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ProjectTable search={search}/>
      </div>
    </div>
  );
};

export default ProjectComponent;
