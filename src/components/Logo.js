import React from 'react';
import logo from '../img/switch.jpg'

function Logo() {
  return (
    <>
      <div className='flex items-center gap-2'>
        <div className='w-10 h-10 bg-blue-600 rounded-full'>
          {/* <img
            className='rounded-full border border-2 border-blue-500'
            src={`https://media.licdn.com/dms/image/C4E0BAQGTcYMDPOSYSw/company-logo_200_200/0/1660800473670?e=1687996800&v=beta&t=p-FWWB1v7VX2rNfzXSuDS610BT24t5f56jpKmBDiyZE`}
            alt='Switch logo'
          /> */}
          <img className='rounded-full border border-2 border-blue-500' src={logo}></img>
        </div>
        MS DYNAMIC CAMPAIGN PORTAL
      </div>
    </>
  );
}

export default Logo;
