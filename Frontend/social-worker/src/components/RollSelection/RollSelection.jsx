import React from "react";
import { useNavigate } from "react-router-dom";

const RollSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === "customer") {
      navigate("/cutomer-register");
    } else if (role === "service-provider") {
      navigate("/register-service-provider");
    }
  };

  return (

<div className="flex items-center justify-center h-screen px-4 ">
  <div className="border-2 border-gray-300 rounded-lg p-8  flex flex-col items-center gap-6 shadow-md">
    <h1 className="text-2xl md:text-3xl font-bold text-center">
      Choose Your Role
    </h1>

    <div className="flex flex-col md:flex-row gap-4">
      <button
        onClick={() => handleRoleSelect("customer")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        I'm a Customer
      </button>
      <button
        onClick={() => handleRoleSelect("service-provider")}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
      >
        I'm a Service Provider
      </button>
    </div>
  </div>
</div>

  );
};

export default RollSelection;
