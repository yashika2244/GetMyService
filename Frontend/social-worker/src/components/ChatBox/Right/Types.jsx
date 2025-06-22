// import React, { useState } from "react";
// import { IoMdSend } from "react-icons/io";
// import UseSendMessage from "../../../context/UseSendMessage.js";

// function Types() {
//   const { loading, sendMessages } = UseSendMessage();
//   const [message, setMessage] = useState("");


// const handleSubmit = (e) => {
//   e.preventDefault();
//   if (!message.trim()) return; // empty guard
//   sendMessages(message); 
//   setMessage("");        
// }

//   return (
//     <form
//      onSubmit={handleSubmit}
//     >
//       <div className="flex md:space-x-4 h-[8vh] text-center bg-slate-700 w-full mt-3 ">
//         <div className="md:w-[90%] md:pl-0 pl-2  w-full">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => {
//               setMessage(e.target.value);
//             }}
//             placeholder="Type here"
//             className="  text-white mt-1  py-2  px-3 md:ml-3 rounded-md w-full grow outline-none bg-slate-900"
//           />
//         </div>
//         <button className="text-3xl mt-2 ml-1 rounded-full md:bg-gray-500 w-10 h-10 flex items-center justify-center">
//           <IoMdSend className="text-2xl" />
//         </button>
//       </div>
//     </form>
//   );
// }

// export default Types;



import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import UseSendMessage from "../../../context/UseSendMessage.js";

function Types() {
  const { loading, sendMessages } = UseSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessages(message);
    setMessage("");
  };

  return (

<form onSubmit={handleSubmit} className="w-full bg-slate-700 p-2">
  <div className="flex space-x-2">
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type here"
      className="flex-1 bg-slate-900 text-white p-2 rounded-md outline-none"
    />
    <button className="bg-gray-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
      <IoMdSend className="text-2xl" />
    </button>
  </div>
</form>

  );
}

export default Types;
