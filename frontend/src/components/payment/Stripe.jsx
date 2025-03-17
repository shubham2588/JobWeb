import { PAYMENT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React from "react";

const plans = [
  {
    id: "monthly",
    name: "standard",
    price: 49,
    duration: "month",
    description: "Perfect for short-term commitments.",
    bgColor: "bg-white",
    textColor: "text-gray-700",
    btnBgColor: "bg-blue-600",
    btnTextColor: "text-white",
    hoverBg: "hover:bg-blue-700",
    borderColor: "border-gray-200",
  },
  {
    id: "yearly",
    name: "standard",
    price: 490,
    duration: "year",
    description: "Save $98 with the annual plan!",
    bgColor: "bg-blue-600 text-white",
    textColor: "text-white",
    btnBgColor: "bg-white",
    btnTextColor: "text-blue-600",
    hoverBg: "hover:bg-gray-200",
    borderColor: "border-blue-600",
  },
];

const handlePayment = async (duration, pkg) => {
  console.log("pkg: ", pkg);
  console.log("duration: ", duration);
  try {
    const response = await axios.post(
      `${PAYMENT_API_END_POINT}/create-subscription`,
      {
        plan_name: pkg,
        duration: duration,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    if (response.data) {
      window.location.href = response.data?.session?.url;
    }
    console.log(response.data);
  } catch (error) {
    console.error("Payment error:", error);
  }
};

const Stripe = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Choose Your Plan
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`w-80 p-6 rounded-2xl shadow-lg border ${plan.bgColor} ${
              plan.borderColor
            } hover:shadow-xl transition ${
              plan.id === "yearly" ? "transform scale-105" : ""
            }`}
          >
            <h3 className={`text-xl font-semibold ${plan.textColor}`}>
              {plan.name}
            </h3>
            <p className={`text-4xl font-bold mt-2 ${plan.textColor}`}>
              ${plan.price}{" "}
              <span className="text-lg">{`/${plan.duration}`}</span>
            </p>
            <p className={`mt-4 ${plan.textColor}`}>{plan.description}</p>
            <button
              onClick={() => handlePayment(plan.duration, plan.name)}
              className={`mt-6 w-full py-3 rounded-lg text-lg font-semibold ${plan.btnBgColor} ${plan.btnTextColor} ${plan.hoverBg} transition`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stripe;
