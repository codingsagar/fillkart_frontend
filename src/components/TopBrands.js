import React from 'react'
import {SiDell,SiPuma,SiNike,SiIntel,SiSamsung,SiAsus,SiJbl,SiMotorola} from "react-icons/si";

import {AiFillApple} from "react-icons/ai";

const styleLogo ={
  placeSelf:"center",
}


const TopBrands = () => {
  return (
    //#E5DEFF
    <div className='bg-[#d8d1f0] flex flex-col my-10 items-center gap-y-10 justify-center py-10'>
        <h2 className='text-xl font-bold'>Products from all top brands</h2>
        <div className='grid grid-cols-3 gap-x-12 md:grid-cols-4 text-white md:gap-20 mb-4 items-center gap-10'>
        <SiDell size={60} color="#3287c1" style={styleLogo}/>
        <SiPuma size={60} color="#e63129" style={styleLogo}/>
        <SiNike size={60} color="#333333" style={styleLogo}/>
        <SiIntel size={60} color="#0071c5" style={styleLogo}/>
        <SiSamsung size={60} color="#124599" style={styleLogo}/>
        <SiAsus size={60} color="#00539b" style={styleLogo}/>
        <AiFillApple size={60} color="#555555" style={styleLogo}/>
        <SiJbl size={60} color="#FF6600" style={styleLogo}/>
        <SiMotorola size={60} color="#5c92fa" className='md:hidden' style={styleLogo}/>
        </div>
    </div>
  )
}

export default TopBrands