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
import Logo from "@/assets/blackLogo.png";

const Signin = () => {
  const [institute, setInstitute] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  // Optional: Added UI state just for toggling password visibility to match the modern design requirement
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user || auth.token) {
      navigate("/dashboard", { replace: true });
    }
  }, [auth.user, auth.token, navigate]);

  // Form submit handler --> Login logic (Completely Untouched)
  const FormSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(institute),
      });

      if (response.success === false) {
        toast.error(response.message, { id: "Auth-toast" });
      } else if (response && response.authToken) {
        await auth.setTokenAndFetchUser(response.authToken);
        setInstitute({
          username: "",
          password: "",
        });
        navigate("/dashboard");
      } else {
        toast.error("Login failed. Unexpected response from server.", { id: "Auth-toast" });
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 400) {
          toast.error("Enter a valid email and password.", { id: "Auth-toast" });
        } else if (err.status === 401 || err.status === 403) {
          toast.error("Invalid email or password.", { id: "Auth-toast" });
        } else {
          toast.error(`${err.message}`, { id: "Auth-toast" });
        }
      } else if (err instanceof Error) {
        toast.error(`${err.message}`, { id: "Auth-toast" });
      } else {
        toast.error("An unknown error occurred during login.", { id: "Auth-toast" });
      }
    } finally {
      setLoading(false);
    }
  };

  const setAdminValue = (e) => {
    setInstitute((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row font-sans">

      {/* LEFT SECTION - Descriptions & Branding */}
      <div className="hidden relative md:flex w-[55%] bg-primary p-12 flex-col justify-between overflow-hidden">
        <div className="opacity absolute top-0 left-0 w-full h-screen bg-black/40 z-0"></div>
        {/* Optional background overlay pattern */}
        <img
          src={Background}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover opacity-40 brightness-0 invert pointer-events-none"
        />

        <div className="relative z-10">
          <img src={Logo} alt="Logo" className="w-auto h-12 mb-16 brightness-0 opacity-20 invert" /> {/* Assuming logo needs to be white on primary background */}

          <div className="space-y-6 text-white max-w-2xl">
            <h1 className="text-5xl font-medium leading-tight tracking-tight">
              Manage your organization seamlessly.
            </h1>
            <p className="w-[80%] text-xl leading-relaxed text-white/80 font-medium">
              This admin portal is designed specifically for institutes to seamlessly add their students, and for organizations to efficiently onboard and manage their employees in one unified space.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-12">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} Your Organization Name. All rights reserved.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION - Login Form */}
      <div className="w-full md:w-[45%] bg-white flex items-center justify-center p-8 sm:p-12 relative">
        <div className="w-full max-w-[440px] flex flex-col">

          {/* Top Hexagon Icon from screenshot */}
          <img src={Logo} alt="" className="size-10 mb-5" />


          <h2 className="text-[40px] font-semibold text-gray-900 mb-2 leading-none">
            Welcome back!
          </h2>
          <p className="text-lg text-gray-800 font-medium mb-10">
            Please enter your credentials to sign in!
          </p>

          <form onSubmit={FormSubmitHandler} className="space-y-6 w-full">

            {/* Email Input */}
            <div className="space-y-2">
              <Label className="text-[15px] font-bold text-gray-600">Username</Label>
              <InputGroup className="w-full h-[8vh]">
                <InputGroupInput
                  type="text"
                  placeholder="admin"
                  value={institute.username}
                  name="username"
                  onChange={setAdminValue}
                />
              </InputGroup>
            </div>

            {/* Password Input */}
            <div className="space-y-2 relative">
              <Label className="text-[15px] font-bold text-gray-600">Password</Label>
              <InputGroup className="w-full relative h-[8vh]">
                <InputGroupInput
                  type={showPassword ? "text" : "password"}
                  placeholder="•••••••••"
                  value={institute.password}
                  name="password"
                  onChange={setAdminValue}
                />

                {/* Eye Slash Icon for Password Visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                  )}
                </button>
              </InputGroup>
            </div>

            {/* Forgot Password Link */}
            {/* <div>
              <a href="#" className="inline-block text-[15px] font-bold text-gray-900 underline hover:text-blue-600 transition-colors">
                Forgot password
              </a>
            </div> */}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 mt-4 rounded-xl bg-primary hover:bg-primary/80 text-white font-bold text-lg flex items-center justify-center transition-colors cursor-pointer"
            >
              {loading ? <Spinner className="size-6 text-white" /> : "Sign In"}
            </Button>

          </form>
        </div>
      </div>

    </div>
  );
};

export default Signin;