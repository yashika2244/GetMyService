import React from 'react'
import { Pagination } from "swiper/modules";
import { Swiper, } from 'swiper/react'
import { SwiperSlide } from 'swiper/react'
import "swiper/css/pagination"
import 'swiper/css'

function CustomerRiview() {
  return (
   <div className='mt-[30px] lg:mt-[55px]'>
        <Swiper modules={[Pagination]} spaceBetween={30} slidesPerView={1} pagination={{clickable:true}}
        breakpoints={
            {
                640: {
                    slidesPerView:1,
                    spaceBetween:0,
                },
                768:{
                    slidesPerView:2,
                    spaceBetween:20,
                },
                1024:{slidesPerView:3,
                    spaceBetween:30,
                },
            }
        }>
            <SwiperSlide>
                <div className='py-[30px] px-5 rounded-xl '>
                    <div className='flex items-center gap-[13px]'>
                        <img src="https://cdn2.iconfinder.com/data/icons/business-618/64/rl_71_avatar_person_employee_client_customer-1024.png" alt="" />
                    </div>
                    <h4 className='text-[18px] leading-[30px] font-semibold text-gray-900'>Muhibar Rahman</h4>

                </div>
            </SwiperSlide>


        </Swiper>
      
    </div>
  )
}

export default CustomerRiview
