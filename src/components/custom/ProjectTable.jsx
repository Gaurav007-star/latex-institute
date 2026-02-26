import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import {
  PiListThin,
  PiFileZip,
  PiArchive,
  PiTrashLight,
  PiDotDuotone,
} from "react-icons/pi";
import { CustomMainModal } from "./CustomMainModal";

const demoProject = [
  {
    id: "691382136430b91eb83850fe",
    user_id: "691381656430b91eb8385029",
    title: "zoho-decorators",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-11T18:36:03.234Z",
    status: "active",
    deleted: false,
  },
  {
    id: "6913879d6430b91eb8385246",
    user_id: "6913477d958deaa43c6472b0",
    title: "new-testing",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-11T18:59:41.572Z",
    status: "active",
    deleted: false,
  },
  {
    id: "69138a216430b91eb8385380",
    user_id: "691381656430b91eb8385029",
    title: "revolution of American society",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-11T19:10:25.846Z",
    status: "active",
    deleted: false,
  },
  {
    id: "691401806430b91eb83857e9",
    user_id: "6913477d958deaa43c6472b0",
    title: "End-testing",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T03:39:44.163Z",
    status: "active",
    deleted: false,
  },
  {
    id: "69140f5e331617eeafaf741e",
    user_id: "68f26ce07dcdf30690e7c816",
    title: "Test Pro",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T04:38:54.733Z",
    status: "active",
    deleted: false,
  },
  {
    id: "69144003caf43dcf0f3b0285",
    user_id: "6901b4a1c749958e7ee890fc",
    title: "A Scoping Review of Immersive Virtual Reality in STEM Education",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T08:06:27.031Z",
    status: "active",
    deleted: false,
  },
  {
    id: "691441c3caf43dcf0f3b034d",
    user_id: "691441bfcaf43dcf0f3b0343",
    title: "dasdas",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T08:13:55.347Z",
    status: "active",
    deleted: false,
  },
  {
    id: "691442e4caf43dcf0f3b03f1",
    user_id: "68f49542c6b01b0cbdb71e20",
    title: "Testing",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T08:18:44.650Z",
    status: "active",
    deleted: false,
  },
  {
    id: "69144a9b24078f4078c03a0e",
    user_id: "69144a8724078f4078c03a03",
    title: "first_sample",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T08:51:39.257Z",
    status: "active",
    deleted: false,
  },
  {
    id: "69144af324078f4078c03a38",
    user_id: "69144ac824078f4078c03a25",
    title: "Learning_Latex",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T08:53:07.765Z",
    status: "active",
    deleted: false,
  },
  {
    id: "69144b2a24078f4078c03aa7",
    user_id: "69144b1724078f4078c03a7b",
    title: "CL_lab_test",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T08:54:02.091Z",
    status: "active",
    deleted: false,
  },
  {
    id: "69144b4324078f4078c03b0d",
    user_id: "69144b3324078f4078c03acb",
    title: "CL_Lab",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T08:54:27.510Z",
    status: "active",
    deleted: false,
  },
  {
    id: "69144b5b24078f4078c03b88",
    user_id: "69144b4924078f4078c03b30",
    title: "test",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T08:54:51.413Z",
    status: "active",
    deleted: false,
  },
  {
    id: "69144b5b24078f4078c03b8e",
    user_id: "69144b4f24078f4078c03b54",
    title: "CLLAB",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T08:54:51.489Z",
    status: "active",
    deleted: false,
  },
  {
    id: "69144b8924078f4078c03d22",
    user_id: "69144b6024078f4078c03bda",
    title: "CL_LastClass",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T08:55:37.001Z",
    status: "active",
    deleted: false,
  },
  {
    id: "69144b9024078f4078c03d68",
    user_id: "69144b2c24078f4078c03aba",
    title: "Computing Lab",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T08:55:44.644Z",
    status: "active",
    deleted: false,
  },
  {
    id: "69144b9324078f4078c03d7f",
    user_id: "69144b7624078f4078c03c89",
    title: "CL LAB 12 11",
    description: "Write a Latex project description",
    template: "Blank",
    projectType: "public",
    created_at: "2025-11-12T08:55:47.099Z",
    status: "active",
    deleted: true,
  },
];

const ProjectTable = ({ search }) => {
  const [checked, setChecked] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedData, setSelectedData] = useState([]);

  const searchUsers = useMemo(() => {
    if (!search.length > 0) return [];
    return demoProject.filter((project) =>
      project.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const dataSource = search.length > 0 ? searchUsers : demoProject;

  const pageSize = 10;
  const totalPages = Math.ceil(dataSource.length / pageSize);

  // console.log("datasource :: ", dataSource);

  // Load initial page
  useEffect(() => {
    updatePageData(1);
  }, [dataSource]);

  const updatePageData = (pageNumber) => {
    const startIndex = (pageNumber - 1) * pageSize; // correct
    const endIndex = pageNumber * pageSize; // correct
    console.log(`Start index : ${startIndex} end index : ${endIndex}`);

    setSelectedData(dataSource.slice(startIndex, endIndex));
    setPage(pageNumber);
  };

  // Select All
  const toggleAll = (v) => {
    setChecked(v ? selectedData.map((u) => u.id) : []);
  };

  // console.log("Selected data :: ", selectedData , "Checked data :: " , checked);

  // Toggle single
  const toggleSingle = (id) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Prev Page
  const gotoPrevPage = () => {
    if (page > 1) {
      updatePageData(page - 1);
    }
  };

  // Next Page
  const gotoNextPage = () => {
    if (page < totalPages) {
      updatePageData(page + 1);
    }
  };

  // const allChecked = checked.length === demoProject.length;

  const isIndeterminate =
    checked.length > 0 && checked.length < demoProject.length;

  return (
    <div className="w-full h-max">
      {/* TABLE SECTION */}
      <Table>
        <TableHeader className="bg-card text-[18px]">
          <TableRow>
            <TableHead className="w-[50px] rounded-tl-2xl h-[8vh] text-center">
              <Checkbox
                checked={checked.length > 0}
                indeterminate={isIndeterminate}
                onCheckedChange={(v) => toggleAll(v === true)}
                className="cursor-pointer"
              />
            </TableHead>

            <TableHead className="w-[100px] h-[8vh]">Title</TableHead>
            <TableHead className="h-[8vh]">Project type</TableHead>
            <TableHead className="h-[8vh]">Date</TableHead>
            <TableHead className="rounded-tr-2xl h-[8vh] text-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {selectedData.length > 0 &&
            selectedData.map((project) => {
              const isChecked = checked.includes(project.id);

              return (
                <TableRow
                  key={project.id}
                  className="cursor-pointer"
                  // onClick={() => toggleSingle(project.id)}
                >
                  <TableCell
                    className="text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => toggleSingle(project.id)}
                      className="cursor-pointer"
                    />
                  </TableCell>

                  <TableCell className="font-medium w-[300px]">
                    {project.title}
                  </TableCell>

                  <TableCell>{project.projectType}</TableCell>

                  <TableCell>
                    {new Date(project.created_at).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="flex items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <PiListThin className="size-6" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-max p-2" align="end">
                        <DropdownMenuRadioGroup>
                          <CustomMainModal
                            trigger={
                              <span className="flex items-center gap-1 hover:bg-accent cursor-pointer rounded-md px-2 py-1">
                                <PiFileZip className="size-5" />
                                Zip
                              </span>
                            }
                            title="Download zip file!"
                            Content={<ZipComponent project={project} />}
                          />

                          <CustomMainModal
                            trigger={
                              <span className="flex items-center gap-1 hover:bg-accent cursor-pointer rounded-md px-2 py-1">
                                <PiArchive className="size-5" />
                                Archived
                              </span>
                            }
                            title="Archived Projects"
                            Content={<ArchivedComponent project={project} />}
                          />

                          <DropdownMenuRadioItem value="trashed">
                            <PiTrashLight className="size-5" />
                            Trashed
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      {/* IF SEARCH RESULT IS NULL OR UNDEFIEND THEN THIS TEXT SHOW */}
      <div className="not-found-data-of-table w-full h-max">
        {dataSource.length == 0 && (
          <h1 className="w-full h-max text-center py-2 text-lg">
            No result found
          </h1>
        )}
      </div>

      {/* PAGINATION SECTION */}
      {dataSource.length > 0 && (
        <Pagination>
          <PaginationContent
            className={`w-full h-max flex justify-end gap-4 py-2`}
          >
            <PaginationItem
              className="cursor-pointer"
              onClick={gotoPrevPage}
              disabled={page === 1}
            >
              <PaginationPrevious />
            </PaginationItem>

            <PaginationItem>
              <span>
                Page {page} of {totalPages}
              </span>
            </PaginationItem>

            <PaginationItem
              className="cursor-pointer"
              onClick={gotoNextPage}
              disabled={page === totalPages}
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ProjectTable;

// zip component
const ZipComponent = ({ project }) => {
  return (
    <div className="zip-content w-full h-max">
      <h1 className="text-[18px]">
        You are about to download the following projects
      </h1>
      <span className="flex items-center text-[18px] py-2">
        <PiDotDuotone className="size-8" />
        {project?.title}
      </span>
    </div>
  );
};

// Archived component
const ArchivedComponent = ({ project }) => {
  return (
    <div className="zip-content w-full h-max">
      <h1 className="text-[18px]">You are archived the following projects</h1>
      <span className="flex items-center text-[18px] py-2">
        <PiDotDuotone className="size-8" />
        {project?.title}
      </span>
    </div>
  );
};
