import React from 'react';
import AddPassword from "../components/addpass";
import AddCards from '@/components/addcard';
import UpiDetail from '@/components/upidetail';
import Datadisplay from '@/components/datadisplay';

const page = () => (
  <>
    <div className='flex flex-col h-full w-full border border-white/40 m-5 p-5'>
    <h1 className='text-center text-3xl p-6'>Enter your Precisious Detials here..</h1>
      <div className='flex flex-row sm:flex-col max-md:flex-col lg:flex-row justify-between w-full border border-white/60 p-3'>

        <div>
          <AddCards />
        </div>
        <div className=''>
          <UpiDetail />          
        </div>
        <div>
          <AddPassword />
        </div>

      </div>
      <div>
        <Datadisplay/>
      </div>
      {/* <div className='flex flex-row'> */}
        {/* <div> */}
          {/* <ShowCards/> */}
          {/* ShowCards */}
        {/* </div> */}
        {/* <div> */}
          {/* <ShowPassword/> */}
          {/* ShowPassword */}
        {/* </div> */}
      {/* </div> */}
    </div>
  </>
)

export default page