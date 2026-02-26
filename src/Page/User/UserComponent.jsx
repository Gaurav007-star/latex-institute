import React, { useCallback, useEffect, useState } from "react";
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
} from "lucide-react";
import { apiFetch } from "@/api/apiFetch";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getTemplate } from "@/store/slices/template";
import clsx from "clsx";
import StudentTable from "@/components/Student/StudentTable";
import { HiOutlineUpload } from "react-icons/hi";

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

const Student = () => {
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("templates");


  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.template);


  return (
    <div className="w-full min-h-screen bg-background p-5">
      <Card className="w-full bg-background rounded-xl ">
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
              trigger={
                <Button size={"lg"}>
                  Add User
                  <Plus />
                </Button>
              }
              Content={<AddStudentComponent />}
              submitBtnName={
                <>
                  Add
                  <Plus />
                </>
              }
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

export default Student;

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
          <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-6 text-center dark:text-accent ">
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

const AddStudentComponent = () => {
  return (
    <div className="add-student-component w-[400px] h-max">
      <InputGroup className={`h-[7vh] w-full`}>
        <InputGroupInput type="email" placeholder="Enter email" />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
