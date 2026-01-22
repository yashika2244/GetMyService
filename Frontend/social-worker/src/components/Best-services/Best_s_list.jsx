import { motion } from "framer-motion";
import Beset_s_card from "./Beset_s_card";
import { useAccounts } from "../../context/AppContext";

const Best_s_list = () => {
  const { accounts, loading } = useAccounts();

  const requiredServiceIds = [
    "684a55b35f86ba8897f3282c",
    "684a56105f86ba8897f32849",
    "684a56865f86ba8897f32885",
  ];

  const selectedServices = accounts.filter((service) =>
    requiredServiceIds.includes(service._id)
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <ServiceSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {selectedServices.map((service, index) => (
        <Beset_s_card key={service._id || index} service={service} />
      ))}
    </motion.div>
  );
};

export default Best_s_list;
