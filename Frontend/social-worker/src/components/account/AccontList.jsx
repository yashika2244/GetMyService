


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {BASE_URL,token} from '../../config.js'

// function AccountList () {
//   // const [accounts, setAccounts] = useState([]);  // State to hold service data
//   // const [loading, setLoading] = useState(true);  // Loading state
//   // const [error, setError] = useState(null);  // Error state
//   // const navigate = useNavigate();

//   // // Fetch data when the component mounts
//   // useEffect(() => {
//   //   const fetchAccounts = async () => {
//   //     try {
//   //       const response = await fetch(`${BASE_URL}/api/services`); // Replace with your backend API URL

//   //       if (!response.ok) {
//   //         throw new Error("Failed to fetch data");
//   //       }

//   //       const data = await response.json();
//   //       console.log("Fetched Data:", data);
//   //       setAccounts(data);  // Store the fetched services in state
//   //       setLoading(false);  // Stop loading
//   //     } catch (err) {
//   //       setError("Failed to load service data");
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchAccounts();
//   // }, []);  // Empty array ensures this runs only once when the component mounts

//   // if (loading) {
//   //   return <div>Loading...</div>;  // Display loading text while fetching data
//   // }

//   // if (error) {
//   //   return <div>{error}</div>;  // Display error if data fetch fails
//   // }
//   const [loading, setLoading] = useState(true);  // Loading state
//   const [error, setError] = useState(null);  // Error state
//   const [accounts, setAccounts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const token = localStorage.getItem("token");  // Get token from localStorage
//         if (!token) {
//           setError("No token found.");
//           return;
//         }

//         const response = await fetch(`${BASE_URL}/api/services`, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`, // Add token to Authorization header
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const data = await response.json();
//         setAccounts(data);  // Store the fetched services in state
//         setLoading(false);  // Stop loading
//       } catch (err) {
//         setError("Failed to load service data");
//         setLoading(false);
//       }
//     };

//     fetchAccounts();
//   }, []);  // Empty array ensures this runs only once when the component mounts

//   if (loading) {
//     return <div>Loading...</div>;  // Display loading text while fetching data
//   }

//   if (error) {
//     return <div>{error}</div>;  // Display error if data fetch fails
//   }
//   return (
//     <section className="mt-4 md:ml-6 ">
//       <div className="flex flex-col gap-4">
//         {accounts.map((account) => (
//           <div key={account._id} className="flex items-center gap-4">
//            <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow-sm">
//               <img
//                 src={account.photo}  // Display service photo
//                 alt={account.title}  // Alt text for the image
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h2
//             className="text-base font-medium cursor-pointer"
//               onClick={() =>
//                 navigate("/chat", {
//                   state: {
//                     name: account.name,
//                     photo: account.photo,
//                     id: account._id,
//                     loc: account.loc,
//                     peragraph: account.peragraph,
//                     accounts: accounts,
//                   },
//                 })
//               }
//             >
//                {account.name ? account.name : "Service Name Not Available"} {/* Updated field */}
//             </h2>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default AccountList;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../config.js'; // Assuming BASE_URL is defined in your config file

function AccountList() {
  const [accounts, setAccounts] = useState([]);  // State to hold service data
  const [loading, setLoading] = useState(true);   // Loading state
  const [error, setError] = useState(null);       // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token");  // Get token from localStorage
        if (!token) {
          setError("No token found.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${BASE_URL}/api/services`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Add token to Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data: " + response.statusText);
        }

        const data = await response.json();
        if (data.length === 0) {
          setError("No services available.");
        } else {
          setAccounts(data);  // Store the fetched services in state
        }
        setLoading(false);  // Stop loading
      } catch (err) {
        setError("Failed to load service data: " + err.message);  // Capture error message
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);  // Empty array ensures this runs only once when the component mounts

  // If data is loading, show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If an error occurs, show error message
  if (error) {
    return <div className="text-red-500">{error}</div>;  // Display error message with styling
  }

  return (
    <section className="mt-4 md:ml-6">
      <div className="flex flex-col gap-4">
        {accounts.map((account) => (
          <div key={account._id} className="flex items-center gap-4">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow-sm">
              <img
                src={account.photo || '/path/to/default/image.jpg'}  // Handle missing photo by providing a default image
                alt={account.title || "Service Name Not Available"}
                className="w-full h-full object-cover"
              />
            </div>
            <h2
              className="text-base font-medium cursor-pointer"
              onClick={() =>
                navigate("/chat", {
                  state: {
                    name: account.name,
                    photo: account.photo,
                    id: account._id,
                    loc: account.loc,
                    peragraph: account.peragraph,
                    accounts: accounts,
                  },
                })
              }
            >
              {account.name || "Service Name Not Available"} {/* Ensure service name is always available */}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AccountList;
