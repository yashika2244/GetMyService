
// export default AddServiceSection;
import React, { useState } from "react";

const AddServiceSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
<div className="flex flex-col mt-2  bg-gradient-to-b from-blue-50 to-gray-100 p-6">
  {/* Header Section */}
  <div className="text-center md:mt-2 mt-6">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
      Add Your Own Service
    </h2>
    <p className="mt-2 text-gray-600 text-sm md:text-base max-w-xl mx-auto">
      Provide your unique services and help people in need.
    </p>
  </div>

  {/* Service Card Section */}
  <div className="flex items-center justify-center md:mt-7 mt-8">
    <div className="p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition text-center">
      <h3 className="text-lg font-semibold">Your Custom Service</h3>
      <p className="text-gray-600 mt-2 text-sm">
        Add any service you want to offer.
      </p>
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 cursor-pointer transition-transform hover:scale-[0.9] duration-300 "
      >
        Add Service
      </button>
    </div>
  </div>
</div>



      {/* Modal Popup (Centered) */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg text-center">
            <h3 className="text-lg font-semibold">Add Your Service</h3>
            <input
              type="text"
              placeholder="Service Name"
              className="w-full mt-3 p-2 border rounded-md"
            />
            <textarea
              placeholder="Service Description"
              className="w-full mt-3 p-2 border rounded-md"
            ></textarea>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
};

export default AddServiceSection;

