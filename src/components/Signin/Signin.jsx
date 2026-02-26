import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import Background from "@/assets/background.png";
import toast from "react-hot-toast";
import { ApiError, apiFetch } from "@/api/apiFetch";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthProvider";
import { Spinner } from "../ui/spinner";

const Signin = () => {
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user || auth.token) {
      navigate("/template", { replace: true });
    }
  }, [auth.user, auth.token, navigate]);

  // Form submit handler --> Login logic
  // const FormSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   try {
  //     setLoading(true);
  //     const response = await apiFetch("/auth/sign-in", {
  //       method: "POST",
  //       body: JSON.stringify(adminData),
  //     });

  //     if (response.success === false) {
  //       toast.error(response.message);
  //     } else if (response && response.authToken) {
  //       await auth.setTokenAndFetchUser(response.authToken);
  //       navigate("/template");
  //     } else {
  //       toast.error("Login failed. Unexpected response from server.");
  //     }
  //   } catch (err) {
  //     if (err instanceof ApiError) {
  //       if (err.status === 400) {
  //         toast.error("Enter a valid email and password.");
  //       } else if (err.status === 401 || err.status === 403) {
  //         toast.error("Invalid email or password.");
  //       } else {
  //         toast.error(`${err.message}`);
  //       }
  //     } else if (err instanceof Error) {
  //       toast.error(`${err.message}`);
  //     } else {
  //       toast.error("An unknown error occurred during login.");
  //     }
  //   } finally {
  //     setLoading(false);
  //     setAdminData({
  //       email: "",
  //       password: "",
  //     });
  //   }
  // };

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
        // onSubmit={FormSubmitHandler}
        className="input-section w-[400px] h-max p-4 space-y-4 z-50"
      >
        <Label
          className={`w-full h-max text-[40px] flex items-center justify-center font-semibold`}
        >
          Institute
        </Label>

        <InputGroup className={`w-full h-max`}>
          <InputGroupInput
            placeholder="Enter email"
            className={`w-full h-[7vh] rounded-full `}
            value={adminData.email}
            name={"email"}
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
          {loading ? <Spinner className={`size-5`}/> : "Sign in"}
        </Button>
      </form>
    </div>
  );
};

export default Signin;
