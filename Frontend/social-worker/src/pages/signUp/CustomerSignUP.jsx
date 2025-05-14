

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import signup from '../../assets/signup.gif'
// // import signup from "../assets/signup.gif";

// import uploadImageToClodinary from "../../../utils/uploadCloudinary";
// import { BASE_URL } from "../../config";
// import { Link } from "react-router-dom";

// function SignUp() {
//   const [selectedfile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     photo: selectedfile,
//     gender: "male",
//     role: "customer",
//   });
//   const [errorMessage, setErrorMessage] = useState(null); // For displaying error
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileInputChange = async (event) => {
//     const file = event.target.files[0];
//     try {
//       const data = await uploadImageToClodinary(file);
//       setPreviewUrl(data.url);
//       setSelectedFile(data.url);
//       setFormData({ ...formData, photo: data.url });
//     } catch (error) {
//       setErrorMessage("Error uploading image, please try again.");
//     }
//   };

//   const submitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       const requestBody = JSON.stringify(formData);
//       const res = await fetch(`${BASE_URL}/api/auth/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: requestBody,
//       });

//       const { message } = await res.json();

//       if (!res.ok) {
//         throw new Error(message);
//       }

//       navigate("/login"); // Redirect to login on success
//     } catch (error) {
//       setErrorMessage(error.message); // Show the error to the user
//       console.error("Error in registration:", error);
//     }
//   };

//   return (
//     <section className="md:px-5 px-2 xl:px-0 mt-16 mb-28 md:mt-28 md:mb-32">
//       <div className="max-w-[1100px] md:mt-8 mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2">
//           <div className="hidden lg:block bg-sky-600 max-w-[500px] rounded-2xl">
//             <figure>
//               <img src={signup} alt="" className="w-full rounded-md" />
//             </figure>
//           </div>

//           <div className="rounded-md border border-gray-200 p-2 lg:pl-16 md:py-1">
//             <h3 className="text-slate-900 text-[22px] md:text-[30px] leading-9 font-bold md:mb-4">
//               Create an <span className="text-sky-600">account</span>
//             </h3>

//             <form onSubmit={submitHandler}>
//               <div className="mb-5">
               
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Full Name"
//                   name="name"
//                   className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none placeholder:text-slate-600 rounded-md cursor-pointer text-gray-600 text-[20px]"
//                   required
//                 />
//               </div>

//               <div className="mb-5">
//                 <input
//                   type="email"
//                   placeholder="Enter your Email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none placeholder:text-slate-600 rounded-md cursor-pointer text-gray-600 text-[20px]"
//                   required
//                 />
//               </div>

//               <div className="mb-5">
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   name="password"
//                   className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none placeholder:text-slate-600 rounded-md cursor-pointer text-gray-600 text-[20px]"
//                   required
//                 />
//               </div>

//               <div className="mb-5 flex items-center justify-between">
              

//                 <label className="text-slate-900 font-bold text-[16px] leading-7">
//                   Gender
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleInputChange}
//                     className="text-gray-600 font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                   >
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </select>
//                 </label>
//               </div>

//               <div className="mb-5 flex items-center gap-3">
//                 {previewUrl && (
//                   <figure className="w-[50px] h-[50px] rounded-full border-2 border-solid border-sky-600 flex items-center justify-center overflow-hidden">
//                     <img
//                       className="w-full h-full object-cover rounded-full"
//                       src={previewUrl}
//                       alt="Preview"
//                     />
//                   </figure>
//                 )}

//                 <div className="relative w-[120px] h-[40px]">
//                   <input
//                     type="file"
//                     name="photo"
//                     id="customfile"
//                     onChange={handleFileInputChange}
//                     accept=".jpg, .png, .gif, .jpeg,.avif"
//                     className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
//                   />
//                   <label
//                     htmlFor="customfile"
//                     className="absolute md:ml-4 top-0 left-0 w-full h-full flex items-center px-[0.7rem] py-0.375rem text-[15px] leading-6 overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg truncate cursor-pointer transition-all transition-transform hover:scale-[0.9] duration-300"
//                   >
//                     Upload Picture
//                   </label>
//                 </div>
//               </div>

//               <div className="flex justify-center md:mt-8">
//                 <button className="bg-red-600 hover:bg-red-700 text-white text-[20px] py-1 md:text-[20px] md:px-20 px-22 rounded-[10px] font-[600] transition-all transition-transform hover:scale-[0.9] duration-300 cursor-pointer">
//                   Sign up
//                 </button>
//               </div>
//               {errorMessage && (
//                 <p className="mt-3 text-red-600 text-center">{errorMessage}</p>
//               )}
//               <p className="mt-5 text-gray-500 text-center">
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-sky-600 font-medium ml-1 border-b">
//                   Login
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default SignUp;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signup from '../../assets/signup.gif';
import uploadImageToClodinary from "../../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";

function CustomerSignUp() {
  const [selectedfile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "male",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    try {
      const data = await uploadImageToClodinary(file);
      setPreviewUrl(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
    } catch (error) {
      setErrorMessage("Error uploading image, please try again.");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register-customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "customer" }),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      navigate("/login"); // Redirect to login
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error in registration:", error);
    }
  };

  return (
    <section className="md:px-5 px-2 xl:px-0 mt-16 mb-28 md:mt-28 md:mb-32">
      <div className="max-w-[1100px] md:mt-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-sky-600 max-w-[500px] rounded-2xl">
            <figure>
              <img src={signup} alt="Signup" className="w-full rounded-md" />
            </figure>
          </div>

          <div className="rounded-md border border-gray-200 p-2 lg:pl-16 md:py-8 ">
            <h3 className="text-slate-900 text-[22px] md:text-[30px] leading-9 font-bold md:mb-6 mb-2 ">
              Create a <span className="text-sky-600">  Customer   account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5  md:text-[20px] text-[17px] ">
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  name="name"
                  className="w-full px-4 py-3 border-b border-[#0066ff61] rounded-md text-gray-600 outline-none "
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-[#0066ff61] rounded-md text-gray-600 text-[20px] outline-none"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  name="password"
                  className="w-full px-4 py-3 border-b border-[#0066ff61] rounded-md text-gray-600 text-[20px] outline-none"
                  required
                />
              </div>

              <div className=" flex justify-between">
                <label className="text-slate-900 font-bold md:text-[16px] text-[14px]">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="md:ml-3 md:px-4 py-2 md:text-[16px] text-[14px] text-gray-700 rounded-md outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
                 <div className="mb-5 flex items-center gap-3">
                {previewUrl && (
                  <figure className="md:w-[50px] md:h-[50px] w-[35px] h-[35px rounded-full border-2 border-sky-600 overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </figure>
                )}

                <div className="relative w-[120px] h-[40px]">
                  <input
                    type="file"
                    name="photo"
                    id="customfile"
                    onChange={handleFileInputChange}
                    accept=".jpg, .png, .gif, .jpeg,.avif"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customfile"
                    className="absolute top-0 left-0 w-full h-full flex items-center md:text-[15px] text-[14px]  justify-center bg-blue-600 text-white font-bold rounded-lg  cursor-pointer hover:bg-blue-700 transition"
                  >
                    Upload Picture
                  </label>
                </div>
              </div>

              </div>

             
              <div className="flex justify-center md:mt-4">
                <button className="bg-red-600 hover:bg-red-700 text-white text-[20px] py-1 px-20 rounded-[10px] font-semibold transition-transform hover:scale-[0.95]">
                  Sign up
                </button>
              </div>

              {errorMessage && (
                <p className="mt-3 text-red-600 text-center">{errorMessage}</p>
              )}

              <p className="mt-3 text-gray-500 text-center text-[14px]">
                Already have an account?{" "}
                <Link to="/login" className="text-sky-600 font-medium border-b ml-1 text-[15px]">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerSignUp;


