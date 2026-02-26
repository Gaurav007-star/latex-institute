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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import { PiListThin, PiTrashLight } from "react-icons/pi";
import {
  MdOutlineEditNote,
  MdDeleteOutline,
  MdBlock,
  MdEditDocument,
} from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { PiCurrencyCircleDollarBold } from "react-icons/pi";
import UserIcon from "@/assets/user.png";
import { Button } from "../ui/button";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { CustomMainModal } from "../custom/CustomMainModal";
import { Card, CardContent } from "../ui/card";
import { IoWarning } from "react-icons/io5";
import { apiFetch } from "@/api/apiFetch";
import { useDispatch, useSelector } from "react-redux";
import { getTemplate } from "@/store/slices/template";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import { ReusableModal } from "../modal/ReusableModal";
import { DialogClose } from "../ui/dialog";
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";
import { List } from "lucide-react";

const students = [
  {
    id: "stu_001",
    name: "Aarav Sharma",
    email: "aarav.sharma@iitdemo.edu",
    rollNumber: "CS2021-001",
    department: "Computer Science",
    year: 3,
    status: "active", // active | suspended | inactive
    subscription: "Pro", // free | Pro | Pro
    documentsCount: 34,
    lastLogin: "2025-01-14T10:32:00Z",
    createdAt: "2023-08-10T09:15:00Z",
  },
  {
    id: "stu_002",
    name: "Neha Verma",
    email: "neha.verma@iitdemo.edu",
    rollNumber: "CS2021-002",
    department: "Computer Science",
    year: 3,
    status: "active",
    subscription: "free",
    documentsCount: 12,
    lastLogin: "2025-01-13T18:05:00Z",
    createdAt: "2023-08-12T11:45:00Z",
  },
  {
    id: "stu_003",
    name: "Rahul Mehta",
    email: "rahul.mehta@iitdemo.edu",
    rollNumber: "ME2020-014",
    department: "Mechanical Engineering",
    year: 4,
    status: "suspended",
    subscription: "Pro",
    documentsCount: 58,
    lastLogin: "2024-12-28T07:22:00Z",
    createdAt: "2022-07-01T08:00:00Z",
  },
  {
    id: "stu_004",
    name: "Priya Nair",
    email: "priya.nair@iitdemo.edu",
    rollNumber: "EE2022-011",
    department: "Electrical Engineering",
    year: 2,
    status: "active",
    subscription: "Pro",
    documentsCount: 21,
    lastLogin: "2025-01-15T06:48:00Z",
    createdAt: "2024-01-05T10:20:00Z",
  },
  {
    id: "stu_005",
    name: "Mohammed Ali",
    email: "mohammed.ali@iitdemo.edu",
    rollNumber: "CE2021-019",
    department: "Civil Engineering",
    year: 3,
    status: "inactive",
    subscription: "free",
    documentsCount: 3,
    lastLogin: null,
    createdAt: "2024-06-18T14:10:00Z",
  },
];


const StudentTable = ({ search }) => {
  const [checked, setChecked] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedData, setSelectedData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [activeModal, setActiveModal] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [active, setActive] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Filter students based on search
  const searchStudents = useMemo(() => {
    if (!search || search.length === 0) return students;

    const searchLower = search.toLowerCase();
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchLower) ||
        student.email.toLowerCase().includes(searchLower) ||
        student.rollNumber.toLowerCase().includes(searchLower) ||
        student.department.toLowerCase().includes(searchLower)
    );
  }, [search]);

  // Sort students
  const sortedStudents = useMemo(() => {
    let sortableData = [...searchStudents];

    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let x = a[sortConfig.key];
        let y = b[sortConfig.key];

        // Handle date sorting
        if (sortConfig.key === "lastLogin" || sortConfig.key === "createdAt") {
          // Handle null values for lastLogin
          if (x === null) x = new Date(0);
          if (y === null) y = new Date(0);
          x = new Date(x);
          y = new Date(y);
        }

        // Handle numeric sorting for year and documentsCount
        if (sortConfig.key === "year" || sortConfig.key === "documentsCount") {
          x = Number(x);
          y = Number(y);
        }

        // Handle string sorting for other fields
        if (typeof x === "string") {
          x = x.toLowerCase();
          y = y.toLowerCase();
        }

        if (x < y) return sortConfig.direction === "asc" ? -1 : 1;
        if (x > y) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sortableData;
  }, [searchStudents, sortConfig]);

  const dataSource = sortedStudents;

  const pageSize = 5; // Changed to 5 for demo with 5 students
  const totalPages = Math.ceil(dataSource.length / pageSize);

  // Update page data when dataSource changes
  useEffect(() => {
    if (!dataSource.length) {
      setSelectedData([]);
      setPage(1);
      return;
    }

    const newTotalPages = Math.ceil(dataSource.length / pageSize);
    const safePage = page > newTotalPages ? newTotalPages : page;

    updatePageData(safePage);
  }, [dataSource]);

  const updatePageData = (pageNumber) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = pageNumber * pageSize;
    setSelectedData(dataSource.slice(startIndex, endIndex));
    setPage(pageNumber);
  };

  // Select All - only selects current page items
  const toggleAll = (v) => {
    setChecked(v ? selectedData.map((student) => student.id) : []);
  };

  // Toggle single student
  const toggleSingle = (id) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Navigation
  const gotoPrevPage = () => {
    if (page > 1) {
      updatePageData(page - 1);
    }
  };

  const gotoNextPage = () => {
    if (page < totalPages) {
      updatePageData(page + 1);
    }
  };

  const isIndeterminate =
    checked.length > 0 && checked.length < selectedData.length;

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };


  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusColor = () => {
      switch (status) {
        case "active":
          return "bg-green-100 text-green-800";
        case "suspended":
          return "bg-yellow-100 text-yellow-800";
        case "inactive":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Handlers for the actions
  const onDeactivateHandler = (id) => {
    toast.success(`User ${id} deactivated`);
    // Add your API call logic here
  };

  const onActivateHandler = (id) => {
    toast.success(`User ${id} activated`);
    // Add your API call logic here
  };

  const onDeleteHandler = (id) => {
    alert("User deleted");
  };

  return (
    <div className="w-full h-max">
      {/* TABLE SECTION */}
      <Table>
        <TableHeader className="text-sm bg-muted">
          <TableRow>
            {/* <TableHead className="w-[50px] rounded-tl-2xl h-[8vh] text-center">
              <Checkbox
                checked={
                  checked.length > 0 && checked.length === selectedData.length
                }
                indeterminate={isIndeterminate}
                onCheckedChange={(v) => toggleAll(v === true)}
                className="cursor-pointer border-2 border-muted-foreground"
              />
            </TableHead> */}

            <TableHead
              className="w-[150px] h-[8vh] rounded-tl-2xl cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name
            </TableHead>

            <TableHead
              className="h-[8vh] w-[200px] text-center cursor-pointer"
              onClick={() => handleSort("email")}
            >
              Email
            </TableHead>

            <TableHead
              className="h-[8vh] text-center cursor-pointer"
              onClick={() => handleSort("rollNumber")}
            >
              Id
            </TableHead>

            <TableHead
              className="h-[8vh] text-center cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status
            </TableHead>

            <TableHead className="rounded-tr-2xl h-[8vh] text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {selectedData.length > 0 &&
            selectedData.map((student) => {
              const isChecked = checked.includes(student.id);

              return (
                <TableRow key={student.id} className="cursor-pointer h-[8vh]">
                  {/* <TableCell
                    className="text-center h-[8vh]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => toggleSingle(student.id)}
                      className="cursor-pointer border-2 border-muted-foreground"
                    />
                  </TableCell> */}

                  <TableCell className="font-medium h-[8vh]">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="font-medium">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center h-[8vh]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate max-w-[200px] inline-block">
                          {student.email}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>{student.email}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>

                  <TableCell className="text-center h-[8vh]">
                    {student.rollNumber}
                  </TableCell>

                  <TableCell className="text-center h-[8vh]">
                    <StatusBadge status={student.status} />
                  </TableCell>

                  <TableCell className="h-[8vh] flex items-center justify-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <List className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {/* LOGIC STARTS HERE */}
                        {student.status === "active" ? (
                          // If active: Show Deactivate
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onClick={() => onDeactivateHandler(student.id)}
                          >
                            <MdBlock className="mr-2 size-4" />
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          // If inactive/suspended: Show Activate and Delete
                          <>
                            <DropdownMenuItem
                              className="text-green-600 cursor-pointer"
                              onClick={() => onActivateHandler(student.id)}
                            >
                              <RiVerifiedBadgeLine className="mr-2 size-4" />
                              Activate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-gray-700 cursor-pointer"
                              onClick={() => onDeleteHandler(student.id)}
                            >
                              <MdDeleteOutline className="mr-2 size-4" />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      {/* IF NO DATA FOUND */}
      {dataSource.length === 0 && (
        <div className="w-full h-32 flex items-center justify-center">
          <h1 className="text-center text-lg text-gray-500">
            No students found
          </h1>
        </div>
      )}

      {/* PAGINATION SECTION */}
      {dataSource.length > 0 && (
        <Pagination>
          <PaginationContent className="w-full h-max flex justify-end gap-4 py-4">
            <PaginationItem
              className="cursor-pointer"
              onClick={gotoPrevPage}
              disabled={page === 1}
            >
              <PaginationPrevious />
            </PaginationItem>

            <PaginationItem>
              <span className="text-sm">
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

export default StudentTable;

