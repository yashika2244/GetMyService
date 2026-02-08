import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === "customer") {
      navigate("/cutomer-register");
    } else if (role === "service-provider") {
      navigate("/register-service-provider");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-20 md:mt-0">
      <div className="max-w-4xl w-full">
        {/* Heading Animation */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-800"
          >
            Choose Your Role
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-gray-500 text-sm md:text-base"
          >
            Select how you want to continue and get started in seconds
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Card */}
          <motion.div
            onClick={() => handleRoleSelect("customer")}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Customer"
              className="w-28 h-28 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              I'm a Customer
            </h2>
            <p className="text-gray-600 text-sm">
              Looking for services? Register here and get started easily.
            </p>
            <button className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Continue
            </button>
          </motion.div>

          {/* Service Provider Card */}
          <motion.div
            onClick={() => handleRoleSelect("service-provider")}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
              alt="Service Provider"
              className="w-28 h-28 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              I'm a Service Provider
            </h2>
            <p className="text-gray-600 text-sm">
              Want to offer services? Join us and grow your business.
            </p>
            <button className="mt-5 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Continue
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
