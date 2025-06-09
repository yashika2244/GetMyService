

import React from 'react';
import { BsArrowRightCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useAccounts } from '../../context/AppContext';

const ServiceCard = () => {
  const { accounts, loading, error } = useAccounts();

  console.log(accounts)

  if (loading) return <div className="text-center py-10">Loading services...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Failed to load services.</div>;

 const colors = ['bg-pink-500', 'bg-green-500', 'bg-yellow-400', 'bg-purple-600', 'bg-red-500', 'bg-blue-500'];
  return (
    <section className="   py-3 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-2 md:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
          {accounts.slice(0, 6).map((service, index) => (
            <div
              key={service.id || Math.random()}
              className="relative bg-white shadow-lg rounded-xl p-2 md:p-6 border border-gray-200 transition-transform hover:scale-105"
            >
              <h2 className="text-xl font-bold text-gray-800">{service.name || 'No Title'}</h2>
              <p className="text-gray-600 text-[13px] mt-2">
                {service.description || 'World-class care for everyone. Our health system offers unmatched expert health care.'}
              </p>
              <div className="flex items-center justify-between mt-2 md:mt-5">
                <Link
                  to={`/Service-profile/${service._id}`}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition"
                >
                  <BsArrowRightCircle className="md:text-4xl text-3xl" />
                </Link>
                {/* <div
                  className={`md:w-10 md:h-10 w-7 h-7 flex items-center justify-center rounded-full ${service.color || 'bg-gray-400'} text-white font-bold text-lg`}
                >
                  {service.id || '?'}
                </div> */}

                 <div
                  // className={`md:w-10 md:h-10 w-7 h-7 flex items-center justify-center rounded-full ${service.color || 'bg-gray-400'} text-white font-bold text-lg`}
                      className={`md:w-10 md:h-10 w-7 h-7 flex items-center justify-center rounded-full ${colors[index % colors.length]} text-white font-bold text-lg`}
                >
                  {index + 1} {/* Shows 1,2,3... */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCard;
