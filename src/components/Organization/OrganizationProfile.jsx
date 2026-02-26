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
} from "lucide-react";
import { useNavigate } from "react-router";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { CustomMainModal } from "../custom/CustomMainModal";
import { HiOutlineUpload } from "react-icons/hi";

export default function OrganizationProfile() {
  const navigate = useNavigate();
  const [instituteData, setInstituteData] = useState({
    basicInfo: {
      officialName: "XYZ University",
      shortName: "XYZU",
      instituteType: "University",
      website: "https://www.xyzuniversity.edu",
      contactEmail: "info@xyzuniversity.edu",
      contactPhone: "+1-234-567-8900",
    },
    address: {
      line1: "123 University Ave",
      line2: "Building 5",
      city: "Metropolis",
      state: "California",
      country: "USA",
    },
    representative: {
      fullName: "John Doe",
      email: "j.doe@xyzuniversity.edu",
      phone: "+1-234-567-8901",
      resignation: "Head of Admissions",
    },
  });

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
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header / Overview */}
      <Card>
        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center text-sm">
              Logo
            </div>
            <div>
              <h1 className="text-2xl font-semibold">
                {instituteData.basicInfo.officialName}
              </h1>
              <p className="text-sm text-muted-foreground">
                Institute ID: XYZ-UNI-001
              </p>
              <div className="flex gap-2 mt-2">
                <Badge>Active</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
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

            <CustomMainModal
              trigger={<Button>Upload Logo</Button>}
              Content={<ImportFileComponent />}
            />
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
              onChange={(e) =>
                handleChange("basicInfo", "officialName", e.target.value)
              }
            />
            <InputGroupAddon>
              <Building2 size={16} />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className={`w-full h-[8vh]`}>
            <InputGroupInput
              placeholder="Short Name / Acronym"
              value={instituteData.basicInfo.shortName}
              onChange={(e) =>
                handleChange("basicInfo", "shortName", e.target.value)
              }
            />
            <InputGroupAddon>
              <Hash size={16} />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className={`w-full h-[8vh]`}>
            <InputGroupInput
              placeholder="Institute Type"
              value={instituteData.basicInfo.instituteType}
              onChange={(e) =>
                handleChange("basicInfo", "instituteType", e.target.value)
              }
            />
            <InputGroupAddon>
              <Landmark size={16} />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className={`w-full h-[8vh]`}>
            <InputGroupInput
              placeholder="Website URL"
              value={instituteData.basicInfo.website}
              onChange={(e) =>
                handleChange("basicInfo", "website", e.target.value)
              }
            />
            <InputGroupAddon>
              <Globe size={16} />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className={`w-full h-[8vh]`}>
            <InputGroupInput
              placeholder="Official Contact Email"
              value={instituteData.basicInfo.contactEmail}
              onChange={(e) =>
                handleChange("basicInfo", "contactEmail", e.target.value)
              }
            />
            <InputGroupAddon>
              <Mail size={16} />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className={`w-full h-[8vh]`}>
            <InputGroupInput
              placeholder="Contact Phone Number"
              value={instituteData.basicInfo.contactPhone}
              onChange={(e) =>
                handleChange("basicInfo", "contactPhone", e.target.value)
              }
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
                onChange={(e) =>
                  handleChange("address", item.field, e.target.value)
                }
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
              type="email"
              value={instituteData.representative.email}
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
              type="tel"
              value={instituteData.representative.phone}
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
              value={instituteData.representative.resignation}
              onChange={(e) =>
                handleChange("representative", "resignation", e.target.value)
              }
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
    </div>
  );
};

const InstituteFormInputs = ({ data, onChange }) => {
  // Internal copy of data
  const [localData, setLocalData] = useState({ ...data });

  // Update localData if `data` prop changes
  useEffect(() => {
    setLocalData({ ...data });
  }, [data]);

  // Internal handle change
  const handleLocalChange = (section, field, value) => {
    setLocalData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="w-[700px] h-max grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Basic Info */}
      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Official Institute Name"
          value={localData.basicInfo.officialName}
          onChange={(e) =>
            handleLocalChange("basicInfo", "officialName", e.target.value)
          }
        />
        <InputGroupAddon>
          <Building2 size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Short Name / Acronym"
          value={localData.basicInfo.shortName}
          onChange={(e) =>
            handleLocalChange("basicInfo", "shortName", e.target.value)
          }
        />
        <InputGroupAddon>
          <Hash size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Institute Type"
          value={localData.basicInfo.instituteType}
          onChange={(e) =>
            handleLocalChange("basicInfo", "instituteType", e.target.value)
          }
        />
        <InputGroupAddon>
          <Landmark size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Website URL"
          value={localData.basicInfo.website}
          onChange={(e) =>
            handleLocalChange("basicInfo", "website", e.target.value)
          }
        />
        <InputGroupAddon>
          <Globe size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Official Contact Email"
          value={localData.basicInfo.contactEmail}
          onChange={(e) =>
            handleLocalChange("basicInfo", "contactEmail", e.target.value)
          }
        />
        <InputGroupAddon>
          <Mail size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Contact Phone Number"
          value={localData.basicInfo.contactPhone}
          onChange={(e) =>
            handleLocalChange("basicInfo", "contactPhone", e.target.value)
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
            value={localData.address[item.field]}
            onChange={(e) =>
              handleLocalChange("address", item.field, e.target.value)
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
          value={localData.representative.fullName}
          onChange={(e) =>
            handleLocalChange("representative", "fullName", e.target.value)
          }
        />
        <InputGroupAddon>
          <User size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Email Address"
          value={localData.representative.email}
          onChange={(e) =>
            handleLocalChange("representative", "email", e.target.value)
          }
        />
        <InputGroupAddon>
          <Mail size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Phone Number"
          value={localData.representative.phone}
          onChange={(e) =>
            handleLocalChange("representative", "phone", e.target.value)
          }
        />
        <InputGroupAddon>
          <Phone size={16} />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup className="w-full h-[8vh]">
        <InputGroupInput
          placeholder="Resignation"
          value={localData.representative.resignation}
          onChange={(e) =>
            handleLocalChange("representative", "resignation", e.target.value)
          }
        />
        <InputGroupAddon>
          <Briefcase size={16} />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
