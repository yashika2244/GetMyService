import React from 'react'
import Beset_s_card from './Beset_s_card'
import {services} from './../../assets/data/Best_S'


const Best_s_list = () => {
  return (
    <>
       <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-5 lg:gap-[30px] mt-[30px] '>

{services.map((service)=>(
<Beset_s_card key={service.id} service={service}/>


))}

</div>

    </>
  )
}

export default Best_s_list