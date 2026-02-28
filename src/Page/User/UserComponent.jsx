import React, { useCallback, useEffect, useState } from "react";
import validator from 'validator';
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UploadIcon from "@/assets/upload.svg";
import { CustomMainModal } from "@/components/custom/CustomMainModal";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { MdCategory } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  File,
  FileSpreadsheet,
  Import,
  ImportIcon,
  MailIcon,
  Plus,
  Check,
  CalendarIcon
} from "lucide-react";
import { apiFetch } from "@/api/apiFetch";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

import clsx from "clsx";
import StudentTable from "@/components/Student/StudentTable";
import { HiOutlineUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addUserHandler, clearSearchUsers, fetchAllUsers, searchUsersHandler } from "@/store/slices/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const options = [
  {
    title: "Templates",
    id: "templates",
  },
  {
    title: "Categories",
    id: "categories",
  },
];

const UserComponent = () => {
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("templates");



  return (
    <div className="w-full min-h-screen p-6 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/user">User</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader
          className={`w-full h-max flex items-center justify-between`}
        >
          <CardTitle className="text-[24px] font-semibold w-max text-nowrap">
            User List
          </CardTitle>
          <CardDescription
            className={`w-max h-max flex justify-start items-center py-2 gap-2`}
          >
            <CustomMainModal
              trigger={
                <Button size={"lg"}>
                  Import
                  <Import />
                </Button>
              }
              Content={<ImportFileComponent />}
              submitBtnName="Import file"
            />

            <CustomMainModal
              open={activeModal === "add-user"}
              onOpenChange={(open) => setActiveModal(open ? "add-user" : null)}
              trigger={
                <Button size={"lg"}>
                  Add User
                  <Plus />
                </Button>
              }
              Content={<AddStudentComponent closeModal={() => setActiveModal(null)} />}
              submitBtnName={
                <>
                  Add
                  <Plus />
                </>
              }
              footerNeeded={false}
            />
          </CardDescription>
        </CardHeader>

        <CardContent>
          <StudentTable search={search} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserComponent;

const ImportFileComponent = () => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="import-section w-[400px] h-max">
      <div
        {...getRootProps()}
        className="bg-muted w-full h-[200px] rounded-md flex items-center justify-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-6 text-center dark:text-foreground ">
            <HiOutlineUpload className="size-10" />
            <p className="w-50">
              Drag and drop some files here, or click to select files
            </p>
          </div>
        )}
      </div>

      {/* OR SECTION */}
      <div className="relative w-full flex items-center my-4 px-4">
        <div className="flex-grow border-t border-muted-foreground/30" />
        <span className="px-3 text-sm text-muted-foreground uppercase tracking-wide">
          or
        </span>
        <div className="flex-grow border-t border-muted-foreground/30" />
      </div>

      {/* LINK SECTION */}
      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput type="url" placeholder="Provide CSV file link" />
        <InputGroupAddon>
          <FileSpreadsheet size={16} />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

const AddStudentComponent = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    expairy: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    dispatch(addUserHandler({ formData, setLoading })).then(() => {
      dispatch(fetchAllUsers({ page: 1 }));
    })
    closeModal();
  }



  return (
    <div className="add-student-component w-[600px] h-max overflow-y-auto space-y-4 file-scrollbar">


      <InputGroup className={`h-[8vh] w-full`}>
        <InputGroupInput
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange} />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className={`h-[8vh] w-full`}>
        <InputGroupInput
          type="text"
          placeholder="Employee code / Roll No."
          name="code"
          value={formData.code}
          onChange={handleChange} />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className={`h-[8vh] w-full`}>
        <InputGroupInput
          type="date"
          placeholder="Expiry date"
          name="expairy"
          value={formData.expairy}
          onChange={handleChange} />
        <InputGroupAddon>
          <CalendarIcon />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className={`h-[8vh] w-full`}>
        <InputGroupInput
          type="text"
          placeholder="Department"
          name="department"
          value={formData.department}
          onChange={handleChange} />
        <InputGroupAddon>
          <CalendarIcon />
        </InputGroupAddon>
      </InputGroup>



      <div className="button-section w-full h-max flex items-center justify-end gap-4">
        <Button variant="outline" onClick={closeModal} className={`h-[6vh]`}>Close</Button>
        <Button onClick={handleAddUser} className={`h-[6vh]`} disabled={loading || !validator.isEmail(formData.email)}>{loading ? "Searching..." : "Add User"}</Button>
      </div>
    </div>
  );
};
