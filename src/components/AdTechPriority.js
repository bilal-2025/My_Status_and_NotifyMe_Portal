
// import React, { useState, useEffect } from 'react';
// import Campaign from './Campaign';
// import axios from 'axios';
// import { RotatingLines } from 'react-loader-spinner';
// import AnotherComponent from './AnotherComponent';
// import { useNavigate } from 'react-router-dom';

// const AdTechPriority = async() => {
//   const [adTechPriority, setAdTechPriority] = useState(false);
//   // try{
//   //   const token = localStorage.getItem('user');
//   //   // Fetch all the campaigns
//   //   const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/viewcampaigns`, {
//   //     headers: {
//   //       Authorization: `Bearer ${token}`
//   //     }
//   //   });
//   // }
//   // catch(error){
//   //   console.log(error);
//   // }
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">AdTech Priority</h1>
//       <p className="mt-4">
//         This is the content related to AdTech Priority. You can manage your AdTech campaigns and strategies here.
//       </p>
//       {/* Add more relevant content, forms, or components as needed */}
//     </div>
//   );
// };

// export default AdTechPriority;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AdTechPriority = () => {
  const navigate = useNavigate();
  const [adTechPriority, setAdTechPriority] = useState(null); // Store the user's selection
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To manage error state
  const [channel, setChannel] = useState(sessionStorage.getItem('channel') || 'mystatus');

  const handleSelectionChange = (event) => {
    setAdTechPriority(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate selection: require user to pick Yes or No
    if (!adTechPriority) {
      window.alert('Please select priority (Yes or No)');
      return;
    }

    setLoading(true);
    setError(null); // Reset error state

    try {
      const token = localStorage.getItem('user');
      const userName = localStorage.getItem('username');
      const url = channel === 'nm' ? `${process.env.REACT_APP_BASE_URL}/nm/submitAdTechPriority` : `${process.env.REACT_APP_BASE_URL}/submitAdTechPriority`;
      const response = await axios.post(url,{ adTechPriority,userName},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Response:', response.data);
      
      window.alert(response.data.message);
      
    } 
    catch (err) 
    {
      console.error('Error submitting:', err);
      setError('An error occurred while submitting your choice.');
    } 
    finally 
    {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">AdTech Priority</h1>
      <p className="mt-4">
        Set the AdTech to Top Priority
      </p>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:12, display:'flex', alignItems:'center', gap:10}}>
          <div style={{color:'#fff'}}>Channel:</div>
          <div className="channel-toggle" role="radiogroup" aria-label="Channel">
            <input type="radio" id="adtech-channel-mystatus" name="channel" value="mystatus" checked={channel==='mystatus'} onChange={(e)=>{ setChannel(e.target.value); sessionStorage.setItem('channel', e.target.value); }} />
            <label htmlFor="adtech-channel-mystatus" className="channel-option">My Status</label>

            <input type="radio" id="adtech-channel-nm" name="channel" value="nm" checked={channel==='nm'} onChange={(e)=>{ setChannel(e.target.value); sessionStorage.setItem('channel', e.target.value); }} />
            <label htmlFor="adtech-channel-nm" className="channel-option">Notify Me</label>
          </div>
        </div>

        <div className="mt-4">
          <div className="segmented-toggle" role="radiogroup" aria-label="AdTech Priority">
            <input type="radio" id="adtech-yes" name="adtech-priority" value="yes" checked={adTechPriority === 'yes'} onChange={handleSelectionChange} />
            <label htmlFor="adtech-yes" className="segmented-option">Yes</label>

            <input type="radio" id="adtech-no" name="adtech-priority" value="no" checked={adTechPriority === 'no'} onChange={handleSelectionChange} />
            <label htmlFor="adtech-no" className="segmented-option">No</label>
          </div>
        </div>

        <div className="mt-4">
          <button type="submit" className="app-button">Submit</button>
        </div>
        {loading && <p className="mt-2">Submitting...</p>}
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AdTechPriority;

