import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import Serviceslist from "../components/Services/Serviceslist";
import About from "../components/About/About";
import Best_s_list from "../components/Best-services/Best_s_list";
import Add_own_service from "../components/add_own_service/Add_own_service";
import Faqlist from "../components/faq/Faqlist";

function Home() {
  let navigate = useNavigate();
  const getDetail = () => {
    navigate("/find-service");
  };

  return (
    <div>
      <div className="hero_container lg:pb-24 pb-4   flex flex-col md:flex-row  lg:justify-center gap-4 lg:gap-16 ">
        <div className="lg:max-w-[500px] mx-1  md:mx-3 lg:pt-[50px] md:pt-[5px]  mt-12 ">
          <div className="flex flex-col lg:gap-3">
            <h1 className="font-[700] text-[18px] mt-2 md:text-[30px] leading-6 md:leading-9">
              Let's Make It Easy To Get
            </h1>
            <h1 className="font-[700] text-[18px]  md:text-[30px] leading-6 md:leading-9">
              {" "}
              Any Services !
            </h1>

            <p className="md:text-[20px] md:mt-4   ">
              {" "}
              Lorem ipsum dolor sit amet consectetur, adipisi cing elit . Animi
              quibusdam voluptate reiciendis temp ore exercita tionem dolor ali
              quam, quod rem asp eriores amet corrupti omnis possimus quidem
              consequatur neque sit?
              <span className="hidden">
                {" "}
                <span className="hidden md:block">
                  {" "}
                  Et natus eaque dolo remque sapi ente unde, itaque quo
                  architecto earum quam voluptates animi rem veniam simi lique
                  sint, tempore aspernatur pariatur optio dignissimos eligendi
                  molestiae. Minus, rerum optio. Repudiandae eligendi pariatur
                  at minus consequatur, esse rerum? Nostrum, laudantium{" "}
                </span>
              </span>
              ipsam, suscipit necessitatibus illum facilis asperiores soluta
              iusto dolore harum sunt. Quibusdam sed exercitationem lab
            </p>
            <span className="ml-0 flex justify-center  sm:block">
              <button
                onClick={getDetail}
                className="mt-5 bg-red-600 text-white text-xl font-semibold px-10 py-1 rounded-lg hover:bg-red-700  cursor-pointer transition-transform hover:scale-[0.9] duration-300  md:py-2"
              >
                Get Details →
              </button>
            </span>
          </div>
        </div>

        <div className="md:flex gap-4 hidden mx-1 min-w-[450px] lg:max-w-[520px] lg:pt-[50px] md:mt-16 w-11/12   md:pt-[5px] justify-center">
          <img
            src="images/worker-4.jpg"
            alt="img"
            className="w-1/2 h-4/6 rounded-xl"
          />
          <div className="mt-10 flex flex-col gap-4">
            <img src="images/worker-2.jpeg" alt="img" className="rounded-xl" />
            <img
              src="images/resto-2.jpeg"
              alt="img"
              className="h-[300px] object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
      {/* process container */}

      <div className="flex  justify-center bg-gradient-to-b from-blue-50 to-white md:py-8">
        <div className="process_container w-full max-w-[1100px] flex flex-col mt-1 md:mt-6 px-4 text-center">
          <div className="w-full">
            <div className="flex justify-center">
              <h1 className="font-semibold text-[23px] md:font-bold md:text-[35px] leading-8 md:leading-[60px] text-gray-800">
                Providing The Best Services
              </h1>
            </div>
            <div className="flex justify-center mt-2">
              <p className="text-[15px] md:text-[15px] lg:w-1/3 text-gray-600">
                World-class care for everyone. Our service system offers
                unmatched expert service care.
              </p>
            </div>
          </div>

          <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3  md:flex-row w-full justify-center mt-5 md:mt-10 gap-3 md:gap-8 lg:gap-12">
            <div className="process_box bg-white shadow-lg rounded-lg p-1 md:p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center md:mb-4">
                <img
                  src="/images/package-delivery.png"
                  alt="Find a Doctor"
                  className="w-16 h-16"
                />
              </div>
              <h1 className="font-bold text-[15px] md:text-[20px] leading-4 md:leading-8 text-center text-gray-800">
                Find a Services
              </h1>
              <p className="text-[9px] md:text-[16px] md:leading-7 text-center text-gray-600">
                World-class care for everyone. Our service system offers
                unmatched expert service care.
              </p>
              <Link to="/services" className="flex justify-center mt-1 md:mt-3">
                <BsArrowRightCircle className="text-[20px] md:text-[40px] text-blue-500 hover:text-blue-700  cursor-pointer transition-colors duration-300" />
              </Link>
            </div>

            <div className=" bg-white shadow-lg rounded-lg  p-1 md:p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center md:mb-4">
                <img
                  src="/images/icon02.png"
                  alt="Find a Location"
                  className="w-16 h-16"
                />
              </div>
              <h1 className="font-bold text-[15px] md:text-[20px] md:leading-8 text-center text-gray-800">
                Find a Location
              </h1>
              <p className="text-[9px] md:text-[16px] md:leading-7 text-center text-gray-600">
                World-class care for everyone. Our service system offers
                unmatched expert service care.
              </p>
              <Link
                to="/locations"
                className="flex justify-center mt-1 md:mt-3"
              >
                <BsArrowRightCircle className="text-[20px] md:text-[40px] text-blue-500 hover:text-blue-700 transition-colors duration-300" />
              </Link>
            </div>

            <div className="process_box bg-white shadow-lg rounded-lg p-1 md:p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center md:mb-4">
                <img
                  src="/images/icon03.png"
                  alt="Book Appointment"
                  className="w-16 h-16"
                />
              </div>
              <h1 className="font-bold text-[15px] md:text-[20px]  md:leading-8 text-center text-gray-800">
                Book Appointment
              </h1>
              <p className="text-[9px] md:text-[16px] md:leading-7 text-center text-gray-600">
                World-class care for everyone. Our serices system offers
                unmatched expert health care. Book Now!
              </p>
              <Link
                to="/appointments"
                className="flex justify-center mt-1 md:mt-3"
              >
                <BsArrowRightCircle className="text-[20px] md:text-[40px] text-blue-500 hover:text-blue-700 transition-colors duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* about serices */}
      <About />
      {/* out services section */}
      <section className="doctor_section flex justify-center mx-3 ">
        <div className="max-w-[1800px] ">
          <div className="mt-8 md:mt-12 ">
            <h1 className="font-[700] leading-8 text-[30px] text-center">
              {" "}
              Our Best Services
            </h1>

            <div className="flex justify-center mt-2  ">
              <p className="   lg:w-1/3 text-center">
                World class care for everyone. Our Service system offers
                unmatched, expert work.
              </p>{" "}
            </div>
          </div>

          <div className=" ">
            <Best_s_list />
          </div>
        </div>
      </section>
      {/* other part */}

      <div className=" service_container md:mt-18  ">
        <div className="mt-8 md:mt-15">
          <h1 className="font-[700] leading-8 text-[30px] text-center">
            {" "}
            Our Some services
          </h1>

          <div className="flex justify-center mt-2">
            <p className="md:text-[px]   lg:w-1/3 text-center">
              World class care for everyone. Our Service system offers
              unmatched, expert services care.
            </p>{" "}
          </div>
        </div>
        {/* service list start */}
        <section className=" flex w-full justify-center">
          <div className="md:mt-12 mt-3 flex  max-w-[1000px] ">
            <Serviceslist />
          </div>
        </section>
      </div>

      {/* other section */}

      <Add_own_service />

      {/*  faq section */}
      <section className="bg-gray-50  py-12 px-4 rounded-lg shadow-md">
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-48 max-w-[1100px] w-full">
            {/* Left Side Image - Hidden on Small Screens */}
            <div className="hidden mt-1   md:block flex-shrink-0">
              <img
                src="/images/question.jpg"
                alt=""
                className="max-w-sm h-[450px] rounded-lg shadow-lg object-cover"
              />
            </div>
            {/* Right Side - FAQ Section */}
            <div className="w-full">
              <h2 className="font-bold px-2 text-xl md:text-3xl text-gray-900 leading-tight mb-1">
                Frequently Asked Questions About Our Services
              </h2>
              <Faqlist />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
