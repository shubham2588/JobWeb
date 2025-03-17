import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { Link } from "react-router-dom";

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Premium = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Choose Your Payment Method
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pay with Stripe */}
        <button className="w-60 p-4 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition">
          {" "}
          <Link to="/premium/stripe">Pay with Stripe</Link>
        </button>

        {/* Pay with Razorpay */}
        <button className="w-60 p-4 bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-indigo-700 transition">
          Pay with Razorpay
        </button>

        {/* Pay with Google Pay */}
        <button className="w-60 p-4 bg-green-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-green-700 transition">
          Pay with Google Pay
        </button>

        {/* Pay with PhonePe */}
        <button className="w-60 p-4 bg-purple-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-purple-700 transition">
          Pay with PhonePe
        </button>
      </div>
    </div>
  );
};

export default Premium;
