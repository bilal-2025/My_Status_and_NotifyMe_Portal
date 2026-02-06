// import React, { useEffect, useState } from 'react';
// import Button from './Button';
// import CreateCampaign from './CreateCampaign';
// import ViewCampaigns from './ViewCampaigns';

// const Content = () => {
//   const [view, setView] = useState(true);
//   const [createCampBtn, setCreateCampBtn] = useState(true); // to add active class to btn
//   const [viewCampBtn, setViewCampBtn] = useState(false); // to add active class to btn

//   const [states, setStates] = useState({
//     viewCampBtn: false,
//     createCampBtn: true,
//     view: true,
//   });

//   const handleCreateCampaign = () => {
//     setStates((prev) => ({
//       view: true,
//       createCampBtn: true,
//       viewCampBtn: false,
//     }));
//   };

//   const handleViewCampaigns = () => {
//     setStates((prev) => ({
//       view: false,
//       viewCampBtn: true,
//       createCampBtn: false,
//     }));
//   };

//   useEffect(() => {
//     let statesJson = sessionStorage.getItem('states');
//     let sessionStates = JSON.parse(statesJson);
//     if (sessionStates) {
//       setStates((prev) => ({
//         ...sessionStates,
//       }));
//     }
//   }, []);

//   useEffect(() => {
//     sessionStorage.setItem('states', JSON.stringify(states));
//   }, [states]);

//   return (
//     <div className="p-12 flex w-full relative">
//       <div className="border-l border-t border-b w-72 pt-6 rounded-sm">
//         <button
//           className={`border text-white px-5 py-2 rounded w-48 mb-3 hover:bg-white-500 transition-bg duration-200 hover:border-white hover:text-black hover:bg-white active:bg-gray-400 ${
//             states.createCampBtn ? 'btnActive' : ''
//           }`}
//           onClick={handleCreateCampaign}
//         >
//           Create Campaigns
//         </button>
//         <button
//           className={`border text-white px-5 py-2 rounded w-48 mb-3 hover:bg-white-500 transition-bg duration-200 hover:border-white hover:text-black hover:bg-white active:bg-gray-400 ${
//             states.viewCampBtn ? 'btnActive' : ''
//           }`}
//           onClick={handleViewCampaigns}
//         >
//           View Campaigns
//         </button>
//       </div>
//       <div className="border w-full rounded-sm">
//         {!states.view ? <ViewCampaigns /> : <CreateCampaign />}
//       </div>

    

//     </div>
//   );
// };

// export default Content;



import React, { useEffect, useState } from 'react';
import CreateCampaign from './CreateCampaign';
import ViewCampaigns from './ViewCampaigns';
import AdTechPriority from './AdTechPriority';

const Content = () => {
  const [states, setStates] = useState({
    createCampBtn: true,
    viewCampBtn: false,
    adTechPriorityBtn: false,
    view: true,
  });

  const handleCreateCampaign = () => {
    setStates({
      view: true,
      createCampBtn: true,
      viewCampBtn: false,
      adTechPriorityBtn: false,
    });
  };

  const handleViewCampaigns = () => {
    setStates({
      view: false,
      viewCampBtn: true,
      createCampBtn: false,
      adTechPriorityBtn: false,
    });
  };

  const handleAdTechPriority = () => {
    setStates({
      view: false, // Set to false to show the AdTech Priority content
      createCampBtn: false,
      viewCampBtn: false,
      adTechPriorityBtn: true,
    });
  };

  useEffect(() => {
    const statesJson = sessionStorage.getItem('states');
    const sessionStates = JSON.parse(statesJson);
    if (sessionStates) {
      setStates((prev) => ({
        ...sessionStates,
      }));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('states', JSON.stringify(states));
  }, [states]);

  return (
    <div className="p-12 flex w-full relative">
      <div className="border-l border-t border-b w-72 pt-6 rounded-sm">
        <button
          className={`border text-white px-5 py-2 rounded w-48 mb-3 hover:bg-white-500 transition-bg duration-200 hover:border-white hover:text-black hover:bg-white active:bg-gray-400 ${
            states.createCampBtn ? 'btnActive' : ''
          }`}
          onClick={handleCreateCampaign}
        >
          Create Campaigns
        </button>
        <button
          className={`border text-white px-5 py-2 rounded w-48 mb-3 hover:bg-white-500 transition-bg duration-200 hover:border-white hover:text-black hover:bg-white active:bg-gray-400 ${
            states.viewCampBtn ? 'btnActive' : ''
          }`}
          onClick={handleViewCampaigns}
        >
          View Campaigns
        </button>
        <button
          className={`border text-white px-5 py-2 rounded w-48 mb-3 hover:bg-white-500 transition-bg duration-200 hover:border-white hover:text-black hover:bg-white active:bg-gray-400 ${
            states.adTechPriorityBtn ? 'btnActive' : ''
          }`}
          onClick={handleAdTechPriority}
        >
          AdTech Priority
        </button>
      </div>
      <div className="border w-full rounded-sm">
        {!states.view ? (
          states.adTechPriorityBtn ? (
            <AdTechPriority />
          ) : (
            <ViewCampaigns />
          )
        ) : (
          <CreateCampaign />
        )}
      </div>
    </div>
  );
};

export default Content;

