import React, { useState } from "react";
import { Button } from "../ui/button";
import { PiCheckCircleDuotone } from "react-icons/pi";
import clsx from "clsx";
import { CustomMainModal } from "../custom/CustomMainModal";

const pricingPlans = [
  {
    name: "Basic",
    price: {
      monthly: 59,
      yearly: 708,
    },
    description:
      "Ideal for individuals or small teams. Includes essential task and project management features.",
    features: [
      "Task management",
      "Basic management tools",
      "Report generator",
      "Email support",
    ],
  },
  {
    name: "Standard",
    price: {
      monthly: 79,
      yearly: 948,
    },
    description:
      "Perfect for growing teams. Offers advanced features for better productivity and collaboration.",
    features: [
      "Task management",
      "Advance management tools",
      "Report generator",
      "Chat & email support",
      "Files sharing",
    ],
  },
  {
    name: "Pro",
    recommended: true,
    price: {
      monthly: 129,
      yearly: 1548,
    },
    description:
      "Best for large teams. Includes premium features and dedicated support for optimal workflow.",
    features: [
      "Task management",
      "Advance management tools",
      "Detailed report generator",
      "24/7 chat & email support",
      "Files sharing",
      "Advanced security protocols",
      "Third party service integration",
    ],
  },
];

const Pricing = () => {
  const [selectedPrice, setSelectedPrice] = useState("monthly");

  return (
    <div className="w-full h-max p-5 bg-secondary">
      <div className="pricing-plan-main-wrapper w-full h-max bg-background p-5 rounded-xl">
        <div className="top-section w-full h-max text-[24px] font-semibold flex items-center justify-between">
          <span>Pricing</span>
          <div className="toggle-price w-max h-max flex items-center p-2 bg-muted rounded-xl">
            <Button
              variant={"outline"}
              className={clsx(
                `w-[100px] bg-secondary hover:text-primary transition-all duration-200 cursor-pointer border-none rounded-xl`,
                selectedPrice === "monthly" && "bg-primary text-secondary"
              )}
              id="monthly"
              onClick={() => setSelectedPrice("monthly")}
            >
              Monthly
            </Button>

            <Button
              variant={"outline"}
              className={clsx(
                `w-[100px] bg-secondary hover:text-primary transition-all duration-200 cursor-pointer border-none rounded-xl`,
                selectedPrice === "yearly" && "bg-primary text-secondary"
              )}
              id="yearly"
              onClick={() => setSelectedPrice("yearly")}
            >
              Yearly
            </Button>
          </div>
        </div>

        <div className="plan-section w-full h-max grid grid-cols-3">
          {pricingPlans.map((plan, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  "w-full h-[500px] flex flex-col justify-between border-r border-secondary-foreground/20 p-4 text-secondary-foreground shadow-lg rounded-none",
                  index === 2 && "border-none"
                )}
              >
                {/* Header */}
                <div className="relative mb-8 text-left">
                  <h1 className="block font-sans text-sm leading-5 uppercase ">
                    {plan.name}
                  </h1>

                  <p className="block font-sans text-sm leading-5 font-normal text-muted-foreground mt-5 mb-3">
                    {plan.description}
                  </p>

                  <div className="price-title-section w-full h-max border-b pb-4">
                    <span className="text-[30px]">
                      $
                      {selectedPrice === "monthly"
                        ? plan.price.monthly
                        : plan.price.yearly}
                    </span>
                    /
                    <span>
                      {selectedPrice === "monthly" ? "month" : "yearly"}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2 mt-4">
                    {plan.features.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-1 text-sm"
                      >
                        <PiCheckCircleDuotone className="size-5 text-secondary-foreground" />
                        <p className="block font-sans">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <div className="w-full h-max">
                  <CustomMainModal
                    trigger={
                      <Button
                        variant={"outline"}
                        className={`w-full h-[8vh] bg-secondary hover:bg-primary/50 hover:text-secondary transition-all duration-200 cursor-pointer`}
                      >
                        Buy Now
                      </Button>
                    }
                    Content={<h1>In Progress...</h1>}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
