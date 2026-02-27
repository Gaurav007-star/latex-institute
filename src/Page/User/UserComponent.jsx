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
  Check
} from "lucide-react";
import { apiFetch } from "@/api/apiFetch";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import clsx from "clsx";
import StudentTable from "@/components/Student/StudentTable";
import { HiOutlineUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addUserHandler, clearSearchUsers, fetchAllUsers, searchUsersHandler } from "@/store/slices/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [allUsers, setAllUsers] = useState({
    userIds: [],
    emails: []
  });

  const { searchUsers } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  // Handler to select users
  const handleSelectUser = (user) => {
    setAllUsers((prev) => ({
      ...prev,
      userIds: [...prev.userIds, user._id],
      emails: [...prev.emails, user.email]
    }));
    setEmail("");
    setHasSearched(false);
  };

  // Handler to remove users
  const handleDeselectUser = (user) => {
    setAllUsers((prev) => ({
      ...prev,
      userIds: prev.userIds.filter((id) => id !== user._id),
      emails: prev.emails.filter((email) => email !== user.email)
    }));
  };

  // Handler to search users
  const handleSearchUser = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email", { id: "add-student-error" });
      return;
    }
    setHasSearched(true);
    dispatch(searchUsersHandler({ keyword: email, setLoading, setEmail }));
  };

  // Main handler to add new user
  const handleAddUser = () => {
    dispatch(addUserHandler({ allUsers, setLoading })).then(() => {
      dispatch(fetchAllUsers({page:1}));
    })
    closeModal();
  }

  const ClearDataHandler = () => {
    dispatch(clearSearchUsers())
    setEmail("")
    setHasSearched(false)
    setAllUsers({
      userIds: [],
      emails: []
    })
  }


  return (
    <div className="add-student-component w-[600px] h-max overflow-y-auto file-scrollbar">
      <InputGroup className={`h-[7vh] w-full`}>
        <InputGroupInput
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setHasSearched(false);
          }} />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>
      {/* user list */}
      <div className={clsx("user-list w-full max-h-[300px] flex flex-col gap-2 overflow-y-auto file-scrollbar", searchUsers.length > 0 ? "py-4 " : "py-2")}>
        {
          searchUsers.length > 0 && (
            searchUsers.map((user) => (
              <div key={user._id} className="flex items-center justify-between p-2  bg-muted/20 rounded-md">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
                {
                  allUsers.emails.includes(user.email) ? (
                    <Button variant="outline" className={`h-[6vh]`} onClick={() => handleDeselectUser(user)}>
                      Unselect
                    </Button>
                  ) : (
                    <Button variant="outline" className={`h-[6vh]`} onClick={() => handleSelectUser(user)}>
                      Select
                    </Button>
                  )
                }
              </div>
            ))
          )
        }
        {
          hasSearched && searchUsers.length === 0 && !loading && (
            <p className="p-4 dark:bg-muted/20 bg-muted! rounded-md text-center text-foreground">
              No users found
            </p>
          )
        }

      </div>

      <div className="button-section w-full h-max flex items-center justify-between gap-2">
        <div className="left">
          <Button variant="outline" onClick={handleAddUser} className={`h-[6vh]`} disabled={allUsers.emails.length === 0}>Add User</Button>
        </div>

        <div className="right flex items-center justify-end gap-2">
          <Button variant="outline" onClick={closeModal} className={`h-[6vh]`}>Close</Button>
          <Button variant="outline" onClick={ClearDataHandler} className={`h-[6vh]`}>Clear</Button>
          <Button onClick={handleSearchUser} className={`h-[6vh]`} disabled={loading || !validator.isEmail(email)}>{loading ? "Searching..." : "Search"}</Button>
        </div>
      </div>
    </div>
  );
};
