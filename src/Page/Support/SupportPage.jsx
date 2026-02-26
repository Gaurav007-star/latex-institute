import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { MdContactPhone, MdEmail } from "react-icons/md";

const SupportPage = () => {
  return (
    <div className="w-full h-max bg-background p-5">
      <Card>
        <CardContent
          className={`text-[32px] flex flex-col items-center justify-center`}
        >
          <h1 className="flex items-center justify-center gap-2">
            <MdEmail className="text-primary" /> Email : latexio.gmail.com
          </h1>
          <h2 className="flex items-center justify-center gap-2">
            <MdContactPhone className="text-primary" />
            Contact : 9586958664
          </h2>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportPage;
