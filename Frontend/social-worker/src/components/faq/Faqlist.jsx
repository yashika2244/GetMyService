import React from "react";
import { faqs } from "../../assets/data/faq";
import Faq_item from "./Faq_item";

export const Faqlist = () => {
return (
<ul className="space-y-3">
{faqs.map((item, index) => (
<Faq_item item={item} key={index} />
))}
</ul>
);
};

export default Faqlist;