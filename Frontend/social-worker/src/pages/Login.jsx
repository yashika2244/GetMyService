import React from 'react'
import { Link } from 'react-router-dom'


function Login() {




  return (

  
    <section className='md:px-5 px-2 lg:px-0 mt-16 mb-32 md:mt-24 '>
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
      <h3 className="mx-2 text-slate-900 text-[22px] leading-9 font-bold md:mb-8">
        Hello! <span className="text-sky-600">Welcome</span> Back 🎉
      </h3>
      <form className='"py-4 px-3 md:py-0"'>
        <div className='mb-5 '>
     

          <input type="email"

          placeholder='Enter Your Email'
          name="email"
          className="w-full px-4  py-3 border-b border-[#0066ff61] rounded-md outline-[#1d365c61]  "
          required
          />
        </div>
        <div className='mb-5'>
          <input type="password"
          placeholder='Password'
          name="password"
          className="w-full px-4 py-3 border-b border-[#0066ff61] rounded-md outline-[#1d365c61]"
          required
          />
        </div>

        <div className="flex justify-center md:mt-8">
          <button type='submit' className="bg-blue-600 hover:bg-blue-700 text-white text-[20px] py-1 md:py-2 md:px-40 px-22 rounded-[10px] font-[600] flex items-center justify-center cursor-pointer transition-all hover:scale-[0.9] duration-300">
            Login
          </button>

        </div>
        <p className="mt-5 text-gray-500 text-center"> Don't have an account? {' '}
          <Link to="/register" className="text-sky-600 font-medium ml-1 border-b"> Register
          </Link>
          
        </p>
      </form>
      </div>
    </section>
  )
}

export default Login
