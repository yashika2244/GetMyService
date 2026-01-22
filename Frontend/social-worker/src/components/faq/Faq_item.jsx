import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const Faq_item = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`rounded-xl px-5 py-4 cursor-pointer transition-all duration-300 border
${
  isOpen
    ? "bg-blue-600 border-blue-500 text-white"
    : "bg-white border-gray-200 text-blue-950 hover:bg-gray-50"
}`}
    >
      {/* Question */}
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-semibold text-sm md:text-base">{item.question}</h4>
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full transition
${isOpen ? "bg-white text-blue-600" : "bg-gray-100 text-gray-700"}`}
        >
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>

      {/* Answer */}
      <div
        className={`overflow-hidden transition-all duration-300
${isOpen ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p
          className={`text-sm leading-6 ${isOpen ? "text-blue-50" : "text-gray-600"}`}
        >
          {item.content}
        </p>
      </div>
    </div>
  );
};

export default Faq_item;
