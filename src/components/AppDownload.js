import React from 'react';
import AppQrCode from "../images/app_qr_code.png";

function AppDownload() {
  return (
    <div className='flex flex-col items-center gap-y-5 my-12 py-10 bg-[#d8d1f0] border-black border-t border-b px-2'>
        <h2 className='text-md font-semibold'><span className='text-2xl font-bold text-primary'>FillKart</span> app only on Playstore</h2>
        <span className='flex items-center gap-x-3'><img src={AppQrCode} className="w-24" alt="" /><p className='text-xl text-primary font-semibold'>SCAN QR CODE</p></span>
        <p className='font-semibold text-md text-center' >Download our app and get early discounts only for you!</p>
    </div>
  )
}

export default AppDownload