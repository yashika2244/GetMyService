

// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { BASE_URL } from '../../config.js'; // Assuming BASE_URL is defined in your config file

// // function AccountList() {
// //   const [accounts, setAccounts] = useState([]);  // State to hold service data
// //   const [loading, setLoading] = useState(true);   // Loading state
// //   const [error, setError] = useState(null);       // Error state
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchAccounts = async () => {
// //       try {
// //         const token = localStorage.getItem("token");  // Get token from localStorage
// //         if (!token) {
// //           setError("No token found.");
// //           setLoading(false);
// //           return;
// //         }

// //         const response = await fetch(`${BASE_URL}/api/services`, {
// //           method: "GET",
// //           headers: {
// //             "Authorization": `Bearer ${token}`, // Add token to Authorization header
// //           },
// //         });

// //         if (!response.ok) {
// //           throw new Error("Failed to fetch data: " + response.statusText);
// //         }

// //         const data = await response.json();
// //         if (data.length === 0) {
// //           setError("No services available.");
// //         } else {
// //           setAccounts(data);  // Store the fetched services in state
// //         }
// //         setLoading(false);  // Stop loading
// //       } catch (err) {
// //         setError("Failed to load service data: " + err.message);  // Capture error message
// //         setLoading(false);
// //       }
// //     };

// //     fetchAccounts();
// //   }, []);  // Empty array ensures this runs only once when the component mounts

// //   // If data is loading, show loading state
// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   // If an error occurs, show error message
// //   if (error) {
// //     return <div className="text-red-500">{error}</div>;  // Display error message with styling
// //   }

// //   return (
// //     <section className="mt-4 md:ml-6">
// //       <div className="flex flex-col gap-4">
// //         {accounts.map((account) => (
// //           <div key={account._id} className="flex items-center gap-4">
// //             <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow-sm">
// //               <img
// //                 src={account.photo || '/path/to/default/image.jpg'}  // Handle missing photo by providing a default image
// //                 alt={account.title || "Service Name Not Available"}
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>
// //             <h2
// //               className="text-base font-medium cursor-pointer"
// //               onClick={() =>
// //                 navigate("/chat", {
// //                   state: {
// //                     name: account.name || "Service Name Not Available",  // Use fallback if name is missing
// //                     photo: account.photo || '/path/to/default/image.jpg',  // Default photo if missing
// //                     id: account._id,
// //                     loc: account.location || "Location not available",  // Fallback for location
// //                     about: account.about || "No information available", // Fallback for about
// //                     accounts: accounts,
// //                     rating: account.totalRating || "No rating",  // Fallback for rating
// //                     experience: account.experience || "Experience not available",  // Fallback for experience
// //                   }
// //                 })
// //               }
// //             >
// //               {account.name || "Service Name Not Available"} 
// //             </h2>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }

// // export default AccountList;



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAccounts } from "../../context/AppContext";
// // Make sure you wrapped your App in <AccountProvider>
// function AccountList() {
//   const { accounts, loading, error } = useAccounts();
//   const navigate = useNavigate();


//   const defaultPhoto = "/path/to/default/image.jpg";
//   const handleNavigate = (account) => {
//     navigate("/chat", {
//       state: {
//         name: account.name || "Service Name Not Available",
//         photo: account.photo || defaultPhoto,
//         id: account._id,
//         loc: account.location || "Location not available",
//         about: account.about || "No information available",
//         accounts:accounts,
//         rating: account.totalRating || "No rating",
//         experience: account.experience || "Experience not available",
//       },
//     });
//   };

//   console.log("accounts:", accounts);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <section className="mt-4 md:ml-6">
//       <div className="flex flex-col gap-4">
//         {accounts.length === 0 ? (
//           <p className="text-gray-500">No services available.</p>
//         ) : (
//           accounts.map((account) => (
//             <div key={account._id} className="flex items-center gap-4">
//               <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow-sm">
//                 <img
//                   src={account.photo || defaultPhoto}
//                   alt={account.name || "Service Name Not Available"}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <h2
//                 className="text-base font-medium cursor-pointer"
//                 onClick={() => handleNavigate(account)}
//               >
//                 {account.name || "Service Name Not Available"}
//               </h2>
//             </div>
//           ))
//         )}
//       </div>
//     </section>
//   );
// }

// export default AccountList;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAccounts } from "../../context/AppContext";

function AccountList() {
  const { accounts, loading, error } = useAccounts();
  const navigate = useNavigate();

  const defaultPhoto = "/path/to/default/image.jpg";

  const handleNavigate = (account) => {
    navigate("/chat", {
      state: {
        name: account.name || "Service Name Not Available",
        photo: account.photo || defaultPhoto,
        id: account._id,
        loc: account.location || "Location not available",
        about: account.about || "No information available",
        accounts: accounts,
        rating: account.totalRating || "No rating",
        experience: account.experience || "Experience not available",
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section className="mt-4 md:ml-6">
      <div className="flex flex-col gap-4">
        {accounts.length === 0 ? (
          <p className="text-gray-500">No services available.</p>
        ) : (
          accounts.map((account) => (
            <div key={account._id} className="flex items-center gap-4">
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow-sm">
                <img
                  src={account.photo || defaultPhoto}
                  alt={account.name || "Service Name Not Available"}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2
                className="text-base font-medium cursor-pointer"
                onClick={() => handleNavigate(account)}
              >
                {account.name || "Service Name Not Available"}
              </h2>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default AccountList;
