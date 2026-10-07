import React, { useState } from "react";
import { faqs } from "../../assets/data/faq";
import Faq_item from "./Faq_item";

export const Faqlist = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-3.5 sm:space-y-4">
      {faqs.map((item, index) => (
        <Faq_item
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Faqlist;