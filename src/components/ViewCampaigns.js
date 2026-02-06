import React, { useState, useEffect } from 'react';
import Campaign from './Campaign';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import AnotherComponent from './AnotherComponent';
import { useNavigate } from 'react-router-dom';


function ViewCampaigns() {

  // When a campaign is deleted 
  const [forceUpdate, setForceUpdate] = useState(false);

  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [inactiveCampaigns, setInactiveCampaigns] = useState([]);

  const [groupedInactiveCampaigns, setGroupedInactiveCampaigns] = useState([]);
  const [groupedActiveCampaigns, setGroupedActiveCampaigns] = useState([]);


  const [others, setOthers] = useState([]);
  const [channel, setChannel] = useState(sessionStorage.getItem('channel') || 'mystatus'); // 'mystatus' | 'nm'
  const [serverIssue, setServerIssue] = useState(false);
  const [showLoader, setShowLoader] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {

    // Fetching all the campaigns from the backend
    const fetchCampaigns = async () => {
      try 
      {
        setShowLoader(true);
        setServerIssue(false);
        setActiveCampaigns([]);
        setInactiveCampaigns([]);
        setGroupedActiveCampaigns([]);
        setGroupedInactiveCampaigns([]);
        const token = localStorage.getItem('user');
        // Fetch all the campaigns
        const url = channel === 'nm' ? `${process.env.REACT_APP_BASE_URL}/nm/viewcampaigns` : `${process.env.REACT_APP_BASE_URL}/viewcampaigns`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data) {
          let data = response.data;
          // backend sometimes returns JSON string
          if (typeof data === 'string') {
            try { data = JSON.parse(data); } catch (e) { /* keep as is */ }
          }

          // If backend returned jwt or invalid string, redirect to login
          if (typeof data === 'string' && data.includes('jwt')) {
            navigate('/login');
            return;
          }

          if (!Array.isArray(data)) {
            // unexpected shape
            console.warn('Unexpected campaigns response:', data);
            data = [];
          }

          console.log('Campaigns data from backend : ', data);

          const activeCamps = data.filter(item => item.isActive === 1);
          const inactiveCamps = data.filter(item => item.isActive === 0);
          const othersList = data.filter(item => item.other === 1);

          setOthers(othersList);
          setActiveCampaigns(activeCamps);
          setInactiveCampaigns(inactiveCamps);
          setShowLoader(false);

          let newGroupedCampaigns = [];
          for (let i = 0; i < inactiveCamps.length; i = i + 3) {
            newGroupedCampaigns.push(inactiveCamps.slice(i, i + 3));
          }
          setGroupedInactiveCampaigns(newGroupedCampaigns);

          let new2GroupedCampaigns = [];
          for (let i = 0; i < activeCamps.length; i = i + 3) {
            new2GroupedCampaigns.push(activeCamps.slice(i, i + 3));
          }
          setGroupedActiveCampaigns(new2GroupedCampaigns);
        }
      }
      catch (error) {
        console.log(error);
        setServerIssue(true);
        setShowLoader(false);
      }
    };

    fetchCampaigns();
  }, [channel]);

  function handleChannelChange(e) {
    const ch = e.target.value;
    setChannel(ch);
    sessionStorage.setItem('channel', ch);
  }

  const deleteCampaign = async (campaign_group_id) => {

    let selectResult = window.confirm("Are you sure you want to delete this campaign");

    if (selectResult == 1) {

      const token = localStorage.getItem('user')

      let deletedCampaigns = groupedInactiveCampaigns.filter((group) => {
        return group[0].campaign_group_id != campaign_group_id
      })

      setGroupedInactiveCampaigns(deletedCampaigns);


      try {
        const url = channel === 'nm' ? `${process.env.REACT_APP_BASE_URL}/nm/deleteCampaign/${campaign_group_id}` : `${process.env.REACT_APP_BASE_URL}/deleteCampaign/${campaign_group_id}`;
        const response = await axios.delete(url, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

      }
      catch (error) {
        console.log('Error in deleting campaign ', error);
      }

    }
    else {
      return;
    }
  };

  return (

    <div className='text-left h-full'>
      <div className='border-b py-3 pl-3 text-white' style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>Campaigns</div>
        <div style={{paddingRight:16}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <div style={{color:'#fff'}}>Channel:</div>
            <div className="channel-toggle" role="radiogroup" aria-label="Channel">
              <input type='radio' id='view-channel-mystatus' name='channel_view' value='mystatus' checked={channel==='mystatus'} onChange={handleChannelChange} />
              <label htmlFor='view-channel-mystatus' className='channel-option'>My Status</label>

              <input type='radio' id='view-channel-nm' name='channel_view' value='nm' checked={channel==='nm'} onChange={handleChannelChange} />
              <label htmlFor='view-channel-nm' className='channel-option'>Notify Me</label>
            </div>
          </div>
        </div>
      </div>

      <div className='px-6 py-4 flex gap-5 flex-col scroll'>

        {/* Table header ------------------ */}
        <div className='grid grid-cols-5 w-full border-b leading-loose text-gray-200'>
          <div style={{ marginLeft: "10px" }}>Campaign Name</div>
          <div style={{ marginLeft: "40px" }}>Campaign Text</div>
          <div style={{ marginLeft: "90px" }}>Start time</div>
          <div style={{ marginLeft: "80px" }}>End time</div>
          <div style={{ marginLeft: "50px" }}>Status</div>
        </div>

        <div className='classs'>

          {!activeCampaigns.length && !inactiveCampaigns.length ? (

            <h3 className='text-2xl text-center text-white mt-6'>
              {showLoader ? <div className='flex justify-center'><RotatingLines strokeColor="grey" width='55' /></div> : (serverIssue ? "Can't load campaigns, maybe Server issue" : 'No Campaigns added.')}
            </h3>
          ) : (
            groupedActiveCampaigns.map((item, i) => {
                return (
                  <AnotherComponent groupedCampaigns={item} deleteCampaign={deleteCampaign} others={others} isactive={1} channel={channel} />
                )
              })
          )

          }
          {inactiveCampaigns.length > 0 && (
            <div className='mt-6'>
              <p className='nonActiveLine text-white'>Non Active Campaigns</p>
            </div>
          )}


          {/* Displaying the inactive campaigns */}
          {
            groupedInactiveCampaigns.map((item, i) => {
              return (

                <AnotherComponent groupedCampaigns={item} deleteCampaign={deleteCampaign} isactive={0} channel={channel} />

              )
            })
          }
        </div>
      </div>
    </div>

  );
}

export default ViewCampaigns;
