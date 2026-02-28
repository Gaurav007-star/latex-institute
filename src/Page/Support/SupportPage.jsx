import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { MdContactPhone, MdEmail } from "react-icons/md";
import { InputGroup, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import Logo from "@/assets/blackLogo.png";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router";

const SupportPage = () => {
  // 1. ADDED MISSING STATE
  const [institute, setInstitute] = useState({
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  // 2. ADDED MISSING INPUT HANDLER
  const setAdminValue = (e) => {
    setInstitute((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 3. ADDED MISSING SUBMIT HANDLER
  const FormSubmitHandler = async (event) => {
    event.preventDefault();
    // Add your actual authentication/submission logic here
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Send Successfully", { id: "success-support" });
      setInstitute({
        username: "",
        email: "",
        message: ""
      });
    }, 1500); // Mock loading delay
  };

  return (
    <div className="w-full min-h-screen bg-background p-6 space-y-6">
      <Breadcrumb className="col-span-full">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/support">Support</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full min-h-screen bg-background grid md:grid-cols-2 place-items-start gap-2">
        <Card className="w-full border-none bg-transparent">
          <CardContent className="text-[32px] flex flex-col items-start justify-start py-4 space-y-6">
            <CardHeader className={`w-full `}>
              <img src={Logo} alt="Logo" className="size-10 mb-5" />

              <CardTitle className="text-[40px] font-medium text-foreground mb-2 leading-none">
                We are here to help
              </CardTitle>
              <CardDescription className="text-lg text-foreground/50 font-medium leading-6">
                Need support or have a question? We’re here to help anytime. Our team is available 24/7 to assist with any inquiries, concerns, or issues you may have. Your satisfaction is important to us, and we’re committed to providing quick, friendly, and reliable support whenever you need it.
              </CardDescription>
            </CardHeader>
            <CardFooter className={`w-full h-max flex flex-col items-start text-foreground/80 text-lg`}>
              <span className="w-full h-max flex items-center gap-3 bg-secondary/10 py-4 rounded-xl px-2">
                {/* Fixed typo: latexio@gmail.com */}
                <MdEmail className="text-accent text-lg" /> latexio@gmail.com
              </span>
              <span className="w-full h-max flex items-center gap-3 bg-secondary/10 py-4 rounded-xl px-2 mt-2">
                <MdContactPhone className="text-accent text-lg" />
                +91 9586958664
              </span>
            </CardFooter>
          </CardContent>
        </Card>

        <Card className="w-full relative rounded-2xl shadow-lg border border-border border-none sm:border-solid">

          <CardContent className="p-8">
            <form onSubmit={FormSubmitHandler} className="space-y-6 w-full">
              {/* email Input */}
              <div className="space-y-2 relative">
                <Label className="text-[15px] font-medium text-foreground">Subject</Label>
                <InputGroup className="w-full relative h-[8vh]">
                  <InputGroupInput
                    type="text"
                    placeholder="Subject"
                    value={institute.subject}
                    name="subject"
                    onChange={setAdminValue}
                  />
                </InputGroup>
              </div>


              {/* message Input */}
              <div className="space-y-2 relative">
                <Label className="text-[15px] font-medium text-foreground">Query</Label>
                <InputGroup className={`w-full`}>
                  <InputGroupTextarea
                    type="text"
                    placeholder="write your query here"
                    value={institute.message}
                    name="message"
                    onChange={setAdminValue}
                    className="w-full h-[20vh] "
                  />
                </InputGroup>
              </div>

              {/* Submit Button */}
              <CardFooter className="p-0 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-xl bg-primary hover:opacity-90 text-white font-medium text-lg flex items-center justify-center transition-all cursor-pointer"
                >
                  {loading ? <Spinner className="size-6 text-white" /> : "Send"}
                </Button>
              </CardFooter>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>

  );
};

export default SupportPage;