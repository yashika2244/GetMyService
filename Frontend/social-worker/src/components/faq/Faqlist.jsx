import React from "react";
import { faqs } from "../../assets/data/faq";
import Faq_item from "./Faq_item";

const Faqlist = () => {
  return (
    <section className="bg-gray-100 py-4 md:px-5 rounded-lg shadow-sm">
      <div className="max-w-3xl mx-auto">
       

        {/* FAQ Items */}
        <ul className="space-y-3">
          {faqs.map((item, index) => (
            <Faq_item item={item} key={index} />

          ))}
        </ul>
      </div>
    </section>
  );
};

export default Faqlist;