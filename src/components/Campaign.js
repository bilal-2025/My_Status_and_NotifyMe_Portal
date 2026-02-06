import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import FileSaver from 'file-saver';

import { RotatingLines } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../css/Campaigns.css';
import "../css/ViewCampaigns.css"
import Error from './Error';
import EditModal from '../generics/EditModal';




function Campaign({ deleteCampaign, index, name, starttime, endtime, isactive, footerText, other, groupId, channel }) {


  const [successMsg, setSuccessMsg] = useState(false);

  const [deactivate, setDeactivate] = useState(false);

  const [edit, setEdit] = useState(false);
  const [otherscamps, setOtherCamps] = useState([]);
  const [showDownBtn, setShowDownBtn] = useState(false);
  const [loading, setLoading] = useState(false)

  const startTimeString = starttime;
  const startdate = new Date(startTimeString);
  const startTime = `${startdate.toLocaleDateString()}  ${startdate.getHours().toString().padStart(2, '0')}:${startdate.getMinutes().toString().padStart(2, '0')}:00`;

  const endTimeString = endtime;
  const enddate = new Date(endTimeString);
  const endTime = `${enddate.toLocaleDateString()}  ${enddate.getHours().toString().padStart(2, '0')}:${enddate.getMinutes().toString().padStart(2, '0')}:00`;


  async function downloadHandler(e) {
    e.preventDefault();
    setLoading(true);

    try 
    {
      const url = channel === 'nm' ? `${process.env.REACT_APP_BASE_URL}/nm/downloadfile` : `${process.env.REACT_APP_BASE_URL}/downloadfile`;
      const response = await axios.get(url, {
        params: {
          campaign: name
        },
        responseType: 'blob' // Set the response type to 'blob' to receive a Blob object
      });
      console.log(response)

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, `${name}.xlsx`);
      setLoading(false)
    }
    catch (error) {
      console.log('Error : ', error);
      setLoading(false)

      if (error.response.status === 403) {
        alert('File is not populated yet');
      }
      else {
        alert("File Dosen't exists for this campaign")
      }
      return;
    }
  }




  const deactivateCampaign = (e) => {
    setDeactivate(true);

  
    const token = localStorage.getItem('user');

    const url = channel === 'nm' ? `${process.env.REACT_APP_BASE_URL}/nm/deactivatecampaign` : `${process.env.REACT_APP_BASE_URL}/deactivatecampaign`;
    axios.patch(url, { campaign_group_id: groupId }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    )
      .then((response) => {

        setTimeout(() => {
          window.location.reload();
          setDeactivate(false);
        }, 1500);

      })

      .catch((error) => {
        console.log(error);
      });
  };


  function editHandler() {
    setEdit(true)
  }

  function closeEditModal(e) {
    setEdit(!edit);
  }

  return (

    <tr>
      {successMsg && (
        <Error children={`Campaign Activated`} classes='h-8 flex justify-center opacity-90 items-center text-sm bg-green-400 absolute top-0 left-0 right-0 z-50 transition' />
      )}
      {deactivate && (
        <Error children={`Campaign Deactivated`} classes='h-8 flex justify-center items-center text-sm bg-green-400 absolute top-0 left-0 right-0 z-50' />
      )}

      {/* Name  */}
      <td >
        <span>{name.split("_")[0]}</span>
      </td>


      {/* Audio Player */}
      <td style={{marginLeft:"100px"}}>
        {/* {
          sound_buffer ? (
            <ReactPlayer url={sound_buffer} width='215px' height='30px' controls />
          ) : (
            <></>
          )
        } */}
        {footerText}
      </td>

      {/* Start date in one column */}
  <td>
        {
          index == 1 ? (
            startTime
          ) : (
            <></>
          )
        }

        {
          index == 2 ? (
            other == 1 ? (
              <>
                <i style={{ marginLeft: "60px" }} className="fa fa-download text-xl ml-2 cursor-pointer ml-3" aria-hidden="true" onClick={downloadHandler}></i>
              </>
            ) : (
              <></>
            )
          ) : (
            <></>
          )
        }
      </td>

      {/* End date in one column */}
      <td>
        {
          index == 1 ? (
            endTime
          ) : (
            <></>
          )
        }
      </td>

      <td>

        {/* If campaign is active , DEACTIVATE CAMPAIGN BUTTON */}
        {
          index === 1 ? (


            isactive ? (<label className='flex justify-between' >
              <span className='text-green-500 font-bold text-bold ml-2'>Active</span>
              <span className='ml-20 text-red-500 border px-1 rounded hover:bg-slate-100 cursor-pointer mr-6' onClick={deactivateCampaign}>Deactivate</span>
            </label>
            ) : (
              <></>
            )

          ) : (
            <></>
          )
        }


        {/* If campaign is not active  , EDIT AND DELETE BUTTON */}
        {
          index === 1 && (
            <>
              {

                !isactive && <div className='ml-auto flex'>

                  <a className='mr-3 border border-gray-300 rounded-sm px-2 cursor-pointer hover:bg-gray-100' onClick={editHandler}>Edit</a>

                  <FontAwesomeIcon icon={faTrash} className="trashIcon" onClick={() => {
                    deleteCampaign(groupId)

                  }} />

                </div>
              }
            </>
          )
        }


      </td>

  {edit && <EditModal closeEditModal={closeEditModal} campaignName={name} groupId={groupId} channel={channel} />}

    </tr>


  );
}

export default Campaign;
