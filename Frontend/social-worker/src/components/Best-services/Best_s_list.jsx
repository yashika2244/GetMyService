import React from "react";
import Beset_s_card from "./Beset_s_card";
import { useAccounts } from "../../context/AppContext";

const Best_s_list = () => {
  const { accounts, loading, error } = useAccounts();

  
  
   const requiredServiceIds = ["684a55b35f86ba8897f3282c", "684a56105f86ba8897f32849", "684a56865f86ba8897f32885"]; 
     const selectedServices = accounts.filter(service => requiredServiceIds.includes(service._id));
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-5 lg:gap-[30px] mt-[30px]  ">
        {selectedServices.map((service, index) => (
          <Beset_s_card key={service.id || index} service={service} />
        ))}
      </div>
    </>
  );
};

export default Best_s_list;
