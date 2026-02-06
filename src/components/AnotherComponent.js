import React from 'react';
import Campaign from './Campaign';
import "../css/ViewCampaigns.css"

const AnotherComponent = ({ groupedCampaigns, deleteCampaign, isactive, channel }) => {

  return (
    <div className='flex flex-col w-full bg-white rounded my-4  px-4 py-2 items-start'>
      <table >
        {
          groupedCampaigns.map((item, i) => {

            return (
                <Campaign key={i} index={i} name={item.campaignname} starttime={item.starttime} isactive={isactive} endtime={item.endtime} deleteCampaign={deleteCampaign} footerText={item.footerText} other={item.other} groupId={item.campaign_group_id} channel={channel} />
            )
          })
        }
      </table>
    </div>

  );
};

export default AnotherComponent