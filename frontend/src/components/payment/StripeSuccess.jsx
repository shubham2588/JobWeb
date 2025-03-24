// import { CheckCircleIcon } from "@heroicons/react/solid";
import { PAYMENT_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "@/redux/authSlice";
import { useSelector } from "react-redux";

const StripeSuccess = () => {
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const savePayment = async () => {
    const response = await axios({
      method: "post",
      url: `${PAYMENT_API_END_POINT}/verify-payment`,
      data: {
        session_id: sessionId,
      },
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log("response===: ", response);
    if (response.data.success) {
      const userId = user._id;
      console.log("userId: ", userId);
      const updatedUser = await axios({
        method: "post",
        url: `${USER_API_END_POINT}/update/${userId}`,
        data: {
          premium: true,
        },
        withCredentials: true,
      });
      if (updatedUser.data.success) {
        dispatch(setUser(updatedUser.data.user));
        toast.success("Your account is premium");
      }
    }
  };

  useEffect(() => {
    if (sessionId) {
      savePayment();
    }
  }, [sessionId]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        {/* <CheckCircleIcon className="w-20 h-20 text-blue-500 mx-auto" /> */}
        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mt-2">
          Thank you for your subscription. Your payment was processed
          successfully.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default StripeSuccess;
