import React from 'react';
import { FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useConversation from '../../stateManage/useConversation.js';

const JobPreferenceModal = ({ onClose,  data }) => {
    const navigate  = useNavigate()
  const { selcetedConversation, setSelcetedConversation } = useConversation()

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-[0.77] flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-lg">

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold mb-4">Service Preferences</h2>
        {data ? (

<div>


        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={data.photo || ""} // your profile image path
            alt="Profile"
            className="w-16 h-16 rounded-full  "
          />
          <div>
            <h3 className="font-semibold">{data.name}</h3>
            <p className="text-sm text-gray-500">is open to work</p>
          </div>
        </div>

        <div className="mb-3">
          <h4 className="font-semibold">About</h4>
          <p className="text-sm text-gray-600">
            {data.about}
          </p>
        </div>

        <div className="mb-3">
          <h4 className="font-semibold">Location types</h4>
          <p className="text-sm text-gray-600">On-site · Hybrid · Remote</p>
        </div>

        <div>
          <h4 className="font-semibold">Locations (on-site)</h4>
          <p className="text-sm text-gray-600">
           {data.location  || "not location available"}
          </p>
          </div>
          
        </div>
          ) : (
          <p>No preference data available.</p>
        )}

        <div className="flex justify-between mt-4">
          <button className="bg-gray-200 px-4 py-2 rounded-lg text-sm">Share profile</button>
          <button className="bg-sky-700 text-white px-4 py-1 rounded-4xl  font-[500]     text-[14px]" onClick={()=>
           { setSelcetedConversation(data)
            navigate('/msg')}}>Message</button>
        </div>
      </div>
    </div>
  );
};

export default JobPreferenceModal;
