import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import Background from "@/assets/background.png";
import toast from "react-hot-toast";
import { apiFetch } from "@/api/apiFetch";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthProvider";

const Signup = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    role: "Admin",
    address: "Chandannagar",
    destination: "Super Admin",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user || auth.token) {
      navigate("/dashboard", { replace: true });
    }
  }, [auth.user, auth.token, navigate]);

  const FormSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(adminData);

    try {
      const response = await apiFetch("/auth/createuser", {
        method: "POST",
        body: JSON.stringify(adminData),
      });

      if (response.success === false) {
        toast.error(response.message);
      } else if (response && response.authToken) {
        await auth.setTokenAndFetchUser(response.authToken);

        // Remove localStorage data
        localStorage.removeItem("user-email");
        navigate("/dashboard");
      } else {
        toast.error("Registration failed. Unexpected response from server.");
      }
    } catch (err) {
      // console.log(err);
      toast.error(err?.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const setAdminValue = (e) => {
    setAdminData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full h-screen  flex items-center justify-center">
      <img
        src={Background}
        alt=""
        className="w-full h-full object-cover object-center absolute inset-0 opacity-50"
      />
      <form
        onSubmit={FormSubmitHandler}
        className="input-section w-[400px] h-max p-4 space-y-4 z-50"
      >
        <Label
          className={`w-full h-max text-[30px] flex items-center justify-center font-semibold`}
        >
          Admin Signup
        </Label>
        <InputGroup className={`w-full h-max`}>
          <InputGroupInput
            placeholder="Name"
            className={`w-full h-[7vh] rounded-full`}
            value={adminData.name}
            name={"name"}
            onChange={setAdminValue}
          />
        </InputGroup>
        <InputGroup className={`w-full h-max`}>
          <InputGroupInput
            placeholder="Enter email"
            className={`w-full h-[7vh] rounded-full`}
            value={adminData.email}
            name={"email"}
            onChange={setAdminValue}
          />
        </InputGroup>
        <InputGroup className={`w-full h-max`}>
          <InputGroupInput
            placeholder="Enter role"
            className={`w-full h-[7vh] rounded-full`}
            value={adminData.role}
            name={"role"}
            onChange={setAdminValue}
          />
        </InputGroup>
        <InputGroup className={`w-full h-max`}>
          <InputGroupInput
            placeholder="Enter address"
            className={`w-full h-[7vh] rounded-full`}
            value={adminData.address}
            name={"address"}
            onChange={setAdminValue}
          />
        </InputGroup>
        <InputGroup className={`w-full h-max`}>
          <InputGroupInput
            placeholder="Enter destination"
            className={`w-full h-[7vh] rounded-full`}
            value={adminData.destination}
            name={"destination"}
            onChange={setAdminValue}
          />
        </InputGroup>
        <InputGroup className={`w-full h-max`}>
          <InputGroupInput
            type={"password"}
            placeholder="Enter password"
            className={`w-full h-[7vh] rounded-full`}
            value={adminData.password}
            name={"password"}
            onChange={setAdminValue}
          />
        </InputGroup>
        <Button
          className={`w-full h-[7vh] rounded-full text-center cursor-pointer`}
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
