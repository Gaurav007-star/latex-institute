import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Landmark,
  Hash,
  Users,
  Cpu,
  User,
  Briefcase,
  ImageIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { CustomMainModal } from "../custom/CustomMainModal";
import { HiOutlineUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux"; // Added Redux import
import { fetchInstituteDetails } from "@/store/slices/userSlice";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";

export default function OrganizationProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch institute data from Redux store
  const { institute } = useSelector((state) => state.User);

  // Initialize state with empty/default values
  const [instituteData, setInstituteData] = useState({
    basicInfo: {
      officialName: "",
      shortName: "",
      instituteType: "",
      website: "",
      contactEmail: "",
      contactPhone: "",
    },
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
    },
    representative: {
      fullName: "",
      email: "",
      phone: "",
      resignation: "",
    },
  });

  // Populate state when Redux data loads
  useEffect(() => {
    if (institute) {
      setInstituteData({
        basicInfo: {
          officialName: institute.name || "",
          shortName: institute.shortName || "",
          instituteType: institute.type || "",
          website: institute.website || "",
          contactEmail: institute.email || "",
          contactPhone: institute.phone || "",
        },
        address: {
          line1: institute.address?.line1 || "",
          line2: institute.address?.line2 || "", // fallback if empty
          city: institute.address?.city || "",
          state: institute.address?.state || "",
          country: institute.address?.country || "",
        },
        representative: {
          // The API payload doesn't have representative fields directly on the institute object,
          // so these will remain editable blanks unless you map them from another data source later.
          fullName: "",
          email: "",
          phone: "",
          resignation: "",
        },
      });
    }
  }, [institute]);

  const handleChange = (section, field, value) => {
    setInstituteData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="p-6 space-y-6 w-full mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/organization">Organization</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      {/* Header / Overview */}
      <Card>
        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <CustomMainModal
              trigger={<div className="h-16 w-16 group rounded-xl bg-muted flex items-center justify-center text-sm cursor-pointer">
                <span className="group-hover:hidden">Logo</span>
                <ImageIcon size={16} className="hidden group-hover:block" />
              </div>}
              Content={<ImportFileComponent />}
            />

            <div>
              <h1 className="text-2xl font-semibold">
                {instituteData.basicInfo.officialName || "Loading..."}
              </h1>
              <p className="text-sm text-accent">
                Institute ID: {institute?.institute_code || "N/A"}
              </p>
              <div className="flex gap-2 mt-2 text-white">
                <Badge>{institute?.status === "active" ? "Active" : "Inactive"}</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <CustomMainModal
              trigger={<Button variant="outline">Edit Profile</Button>}
              Content={
                <InstituteFormInputs
                  data={instituteData}
                  handleChange={handleChange}
                />
              }
            />
            <Button variant="outline" onClick={() => navigate("/billing")}>
              View Billing
            </Button>

            {/* <CustomMainModal
              trigger={<Button>Upload Logo</Button>}
              Content={<ImportFileComponent />}
            /> */}
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className={`text-lg`}>Basic information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup className={`w-full h-[8vh]`}>
            <InputGroupInput
              placeholder="Official Institute Name"
              value={instituteData.basicInfo.officialName}
              readOnly
              className={`cursor-not-allowed`}
            />
            <InputGroupAddon>
              <Building2 size={16} />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className={`w-full h-[8vh]`}>
            <InputGroupInput
              placeholder="Short Name / Acronym"
              value={instituteData.basicInfo.shortName}
              readOnly
              className={`cursor-not-allowed`}
            />
            <InputGroupAddon>
              <Hash size={16} />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className={`w-full h-[8vh]`}>
            <InputGroupInput
              placeholder="Institute Type"
              value={instituteData.basicInfo.instituteType}
              readOnly
              className={`cursor-not-allowed`}
            />
            <InputGroupAddon>
              <Landmark size={16} />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className={`w-full h-[8vh]`}>
            <InputGroupInput
              placeholder="Website URL"
              value={instituteData.basicInfo.website}
              readOnly
              className={`cursor-not-allowed`}
            />
            <InputGroupAddon>
              <Globe size={16} />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className={`w-full h-[8vh]`}>
            <InputGroupInput
              placeholder="Official Contact Email"
              value={instituteData.basicInfo.contactEmail}
              readOnly
              className={`cursor-not-allowed`}
            />
            <InputGroupAddon>
              <Mail size={16} />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className={`w-full h-[8vh]`}>
            <InputGroupInput
              placeholder="Contact Phone Number"
              value={instituteData.basicInfo.contactPhone}
              readOnly
              className={`cursor-not-allowed`}
            />
            <InputGroupAddon>
              <Phone size={16} />
            </InputGroupAddon>
          </InputGroup>
        </CardContent>
      </Card>

      {/* Address & Location */}
      <Card>
        <CardHeader>
          <CardTitle className={`text-lg`}>Address details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { placeholder: "Address Line 1", field: "line1", icon: MapPin },
            { placeholder: "Address Line 2", field: "line2", icon: MapPin },
            { placeholder: "City", field: "city", icon: MapPin },
            { placeholder: "State / Province", field: "state", icon: MapPin },
            { placeholder: "Country", field: "country", icon: Globe },
          ].map((item) => (
            <InputGroup className="w-full h-[8vh]" key={item.field}>
              <InputGroupInput
                placeholder={item.placeholder}
                value={instituteData.address[item.field]}
                readOnly
                className={`cursor-not-allowed`}
              />
              <InputGroupAddon>
                <item.icon size={16} />
              </InputGroupAddon>
            </InputGroup>
          ))}
        </CardContent>
      </Card>

      {/* Representative Details */}
      <Card>
        <CardHeader>
          <CardTitle className={`text-lg`}>Representative details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup className="w-full h-[8vh]">
            <InputGroupInput
              placeholder="Full Name"
              value={instituteData.representative.fullName}
              readOnly
              className={`cursor-not-allowed`}
            />
            <InputGroupAddon>
              <User size={16} />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className="w-full h-[8vh]">
            <InputGroupInput
              placeholder="Email Address"
              type="email"
              value={instituteData.representative.email}
              readOnly
              className={`cursor-not-allowed`}
            />
            <InputGroupAddon>
              <Mail size={16} />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className="w-full h-[8vh]">
            <InputGroupInput
              placeholder="Phone Number"
              type="tel"
              value={instituteData.representative.phone}
              readOnly
              className={`cursor-not-allowed`}
            />
            <InputGroupAddon>
              <Phone size={16} />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className="w-full h-[8vh]">
            <InputGroupInput
              placeholder="Resignation"
              value={instituteData.representative.resignation}
              readOnly
              className={`cursor-not-allowed`}
            />
            <InputGroupAddon>
              <Briefcase size={16} />
            </InputGroupAddon>
          </InputGroup>
        </CardContent>
      </Card>
    </div>
  );
}

const ImportFileComponent = () => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="import-section w-[400px] h-max ">
      <div
        {...getRootProps()}
        className="bg-muted w-full h-[200px] rounded-md flex items-center justify-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-6 text-center dark:text-accent bg-muted">
            <HiOutlineUpload className="size-10" />
            <p className="w-50">
              Drag and drop some files here, or click to select files
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Fixed: Now directly updates parent state using the passed handleChange function
const InstituteFormInputs = ({ data, handleChange }) => {
  return (
    <div className="w-[700px] h-max grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Basic Info */}
      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Official Institute Name"
          value={data.basicInfo.officialName}
          onChange={(e) =>
            handleChange("basicInfo", "officialName", e.target.value)
          }
        />
        <InputGroupAddon>
          <Building2 size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Short Name / Acronym"
          value={data.basicInfo.shortName}
          onChange={(e) =>
            handleChange("basicInfo", "shortName", e.target.value)
          }
        />
        <InputGroupAddon>
          <Hash size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Institute Type"
          value={data.basicInfo.instituteType}
          onChange={(e) =>
            handleChange("basicInfo", "instituteType", e.target.value)
          }
        />
        <InputGroupAddon>
          <Landmark size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Website URL"
          value={data.basicInfo.website}
          onChange={(e) =>
            handleChange("basicInfo", "website", e.target.value)
          }
        />
        <InputGroupAddon>
          <Globe size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Official Contact Email"
          value={data.basicInfo.contactEmail}
          onChange={(e) =>
            handleChange("basicInfo", "contactEmail", e.target.value)
          }
        />
        <InputGroupAddon>
          <Mail size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Contact Phone Number"
          value={data.basicInfo.contactPhone}
          onChange={(e) =>
            handleChange("basicInfo", "contactPhone", e.target.value)
          }
        />
        <InputGroupAddon>
          <Phone size={16} />
        </InputGroupAddon>
      </InputGroup>

      {/* Address */}
      {[
        { placeholder: "Address Line 1", field: "line1", icon: MapPin },
        { placeholder: "Address Line 2", field: "line2", icon: MapPin },
        { placeholder: "City", field: "city", icon: MapPin },
        { placeholder: "State / Province", field: "state", icon: MapPin },
        { placeholder: "Country", field: "country", icon: Globe },
      ].map((item) => (
        <InputGroup className="w-full h-[8vh]" key={item.field}>
          <InputGroupInput
            placeholder={item.placeholder}
            value={data.address[item.field]}
            onChange={(e) =>
              handleChange("address", item.field, e.target.value)
            }
          />
          <InputGroupAddon>
            <item.icon size={16} />
          </InputGroupAddon>
        </InputGroup>
      ))}

      {/* Representative */}
      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Full Name"
          value={data.representative.fullName}
          onChange={(e) =>
            handleChange("representative", "fullName", e.target.value)
          }
        />
        <InputGroupAddon>
          <User size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Email Address"
          value={data.representative.email}
          onChange={(e) =>
            handleChange("representative", "email", e.target.value)
          }
        />
        <InputGroupAddon>
          <Mail size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Phone Number"
          value={data.representative.phone}
          onChange={(e) =>
            handleChange("representative", "phone", e.target.value)
          }
        />
        <InputGroupAddon>
          <Phone size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Resignation"
          value={data.representative.resignation}
          onChange={(e) =>
            handleChange("representative", "resignation", e.target.value)
          }
        />
        <InputGroupAddon>
          <Briefcase size={16} />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};