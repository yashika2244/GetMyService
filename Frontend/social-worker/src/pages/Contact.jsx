import React from "react";
import contact from "../assets/contact-us.gif";
function Contact() {
  return (
    // <section className="min-h-screen md:mt-6 flex items-start justify-start bg-gradient-to-b from-blue-50 to-white py-12 px-3  md:px-6">
    <section className="md:px-5 px-2 xl:px-0 mt-16 mb-28 md:mt-25 md:mb-32 ">
      <div className="max-w-[1100px] md:mt-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-3  md:p-4 animate-fade-in backdrop-blur-lg">
            {/* Title Section */}
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Contact Us
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Got a technical issue? Want to send feedback about a beta feature?
            </p>
            {/* Form */}
            <form action="" className="space-y-6 mt-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold"
                >
                  Your Email
                </label>
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all "
                />
              </div>
              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-semibold"
                >
                  Your Subject
                </label>
                <input
                  type="text"
                  placeholder="Let us know how we can help you"
                  className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                />
              </div>
              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold"
                >
                  Your Message
                </label>
                <textarea
                  placeholder="Leave a comment..."
                  className="w-full mt-1 px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  id=""
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button className="bg-red-600 hover:bg-red-700 text-white text-lg md:px-25 px-10 md:py-2 py-2 rounded-full font-semibold shadow-md transition-transform hover:scale-[0.9] cursor-pointer duration-300">
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/*=======img box ==========*/}
          <div className="hidden lg:block border border-blue-50  max-w-[500px] rounded-2xl  ">
            <figure>
              <img src={contact} alt="" className="w-full rounded-md " />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
