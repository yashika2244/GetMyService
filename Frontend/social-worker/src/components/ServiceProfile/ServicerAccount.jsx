import React from "react";
import ServicerDashboard from "./dashboard/ServicerDashboard";

/**
 * ServicerAccount Component
 * Transforms the existing servicer account into a modern SaaS-style dashboard.
 * Preserves existing routes, auth context, real MongoDB APIs, and interactions.
 */
const ServicerAccount = () => {
  return <ServicerDashboard />;
};

export default ServicerAccount;
