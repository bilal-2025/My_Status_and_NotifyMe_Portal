
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
        <div style={{marginBottom:12}}>
          <label style={{marginRight:8}}>Channel:</label>
          <label style={{marginRight:8}}><input type="radio" value="mystatus" checked={channel==='mystatus'} onChange={(e)=>{ setChannel(e.target.value); sessionStorage.setItem('channel', e.target.value); }}/> My Status</label>
          <label><input type="radio" value="nm" checked={channel==='nm'} onChange={(e)=>{ setChannel(e.target.value); sessionStorage.setItem('channel', e.target.value); }}/> Notify Me</label>
        </div>
        <div className="mt-4">
          <label>
            <input
              type="radio"
              value="yes"
              checked={adTechPriority === 'yes'}
              onChange={handleSelectionChange}
            />
            Yes
          </label>
          <label className="ml-4">
            <input
              type="radio"
              value="no"
              checked={adTechPriority === 'no'}
              onChange={handleSelectionChange}
            />
            No
          </label>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
        {loading && <p className="mt-2">Submitting...</p>}
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AdTechPriority;

