import React from 'react'
import Serviceslist from "../components/Services/Serviceslist";


function Services() {
  return (
    <div className=" service_container  bg-gradient-to-b from-blue-50 to-white ">
        <div className="mt-8 md:mt-14 ">
          <h1 className="font-[700] leading-8 text-[35px] text-center md:pt-3 pt-6 text-slate-800">
            {" "}
            Our Some Services
          </h1>

          <div className="flex justify-center md:mt-4 mt-4">
            <p className="md:text-[18px]  text-slate-600 lg:w-1/3 text-center">
              World class care for everyone. Our Service system offers
              unmatched, expert services care.
            </p>{" "}
          </div>
        </div>
        {/* service list start */}
        <section className=" flex w-full justify-center">
          <div className="md:mt-8 mt-3 flex  max-w-[1000px] ">
            <Serviceslist />
          </div>
        </section>
      </div>
  )
}

export default Services
