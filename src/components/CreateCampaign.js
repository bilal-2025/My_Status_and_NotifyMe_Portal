import React, { useState, useEffect } from "react"; // not-optimized
import axios from "axios";
import Error from "./Error";
import { RotatingLines } from "react-loader-spinner";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";

function CreateCampaign() 
{
  const [channel, setChannel] = useState(sessionStorage.getItem('channel') || 'mystatus'); // 'mystatus' or 'nm'
  const [service1, setService1] = useState();
  const [service2, setService2] = useState();
  const [service3, setService3] = useState();


  const [footerText1, setFooterText1] = useState();
  const [footerText2, setFooterText2] = useState();
  const [footerText3, setFooterText3] = useState();


  // Audio files
  const [file1, setFile1] = useState();
  const [selectAudio1, setSelectAudio1] = useState(false);

  const [file2, setFile2] = useState();
  const [selectAudio2, setSelectAudio2] = useState(false);

  const [file3, setFile3] = useState();
  const [selectAudio3, setSelectAudio3] = useState(false);

  // Type of the campaign whether primary secondary or default
  const [type1, setType1] = useState("primary");
  const [type2, setType2] = useState("secondary");
  const [type3, setType3] = useState("default");

  const [successMsg, setSuccessMsg] = useState(null);

  // Start and end time 
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [msgFromRes, setMsgFromRes] = useState("");
  const [onFailure, setOnFailure] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const [other1, setOther1] = useState("");
  const [other2, setOther2] = useState("");
  const [other3, setOther3] = useState("");

  const navigate = useNavigate();

  


  useEffect(() => {

    // Getting the user from the local storage
    const storedToken = localStorage.getItem('user');

    if (storedToken) 
    {

      try 
      {
          const decodedToken = jwt_decode(storedToken);

          if (decodedToken.exp * 1000 < Date.now()) 
          {
            // Token is expired, clear it from storage
            localStorage.removeItem('user');
          }
      }
      catch (error) 
      {
        localStorage.removeItem('user');
      }
    }
    else 
    {
      navigate("/login")
    }
  }, []);

  const [redirectToAnotherComponent, setRedirectToAnotherComponent] = useState(false);

  function handleService1(e) 
  {
    setService1(e.target.value);
  }
  function handleService2(e) 
  {
    setService2(e.target.value);
  }
  function handleService3(e) 
  {
    
    setService3(e.target.value);
  }

  

  function handleType1(e) 
  {
    
    setType1(e.target.value);
  }
  function handleType2(e) 
  {
    
    setType2(e.target.value);
  }
  function handleType3(e) {
    
    setType3(e.target.value);
  }



  // Start time of the campaign
  function startTimeHandler(e) {
    console.log("Start time value changed");
    setStartTime(e.target.value);
  }
  // End time of the campaign
  function endTimeHandler(e) {
    console.log("End time value changed");
    setEndTime(e.target.value);
  }

  function handleOther1(e) {
    console.log("Other-1 value changed");
    setOther1(e.target.value);
  }

  function handleOther2(e) {
    console.log("Other-2 value changed");
    setOther2(e.target.value);
  }

  function handleOther3(e) {
    console.log("Other-3 value changed");
    setOther3(e.target.value);
  }

  

  async function submitHandler(e) 
  {

    e.preventDefault();


    setShowLoader(true);

    // Fetching user from the local storage
    const storedToken = localStorage.getItem("user");

    // Any field cannot be empty , user must fill all the fields ...
    if (!footerText1 || !footerText2 || !footerText3 || !service1 || !service2 || !service3 || !type1 || !type2 || !type3 || !startTime || !endTime) {

      window.alert("Please fill all the fields");

      setShowLoader(false);

      setTimeout(() => {
        setSuccessMsg(false);
        setOnFailure(false);
        setShowLoader(false);
        setSelectAudio1(false);
        
      }, 3000);
      return;
    }

    

    // The two services cannot be same
    if (service1 == service2 || service1 == service3 || service2 == service3) 
    {

      window.alert("All the service names must be different");

      setShowLoader(false);

      setTimeout(() => {
        setSuccessMsg(false);
        setOnFailure(false);
        setShowLoader(false);
        setSelectAudio1(false);
      }, 3000);
      return;
    }

    // If the user selects the same start and the end time for the campaigns
    if (startTime == endTime) 
    {
      window.alert("Select different Start and End time");

      setShowLoader(false);

      setTimeout(() => {
        setSuccessMsg(false);
        setOnFailure(false);
        setShowLoader(false);
        setSelectAudio1(false);
      }, 3000);
      return;
    }

    if(endTime < startTime)
    {
         
      window.alert("End date cannot be less than the start date");

      setShowLoader(false);

      setTimeout(() => {
        setSuccessMsg(false);
        setOnFailure(false);
        setShowLoader(false);
        setSelectAudio1(false);
      }, 3000);
      return;
    }
      

    // All the three services types should be different , primary , secondary and default , any two cannot be same
    if (type1 == type2 || type2 == type3 || type1 == type3) 
    {
      window.alert("All the types must be different");

      setShowLoader(false);

      setTimeout(() => {
        setSuccessMsg(false);
        setOnFailure(false);
        setShowLoader(false);
        setSelectAudio1(false);
      }, 3000);

      return;
    }

    const formData = new FormData();

    if (service1 === "other") 
    {
      formData.append("other1", other1);
    } 
    else 
    {
      formData.append("campaignname1", service1);
    }


    if (service2 === "other") 
    {
      formData.append("other2", other2);
    }
    else 
    {
      formData.append("campaignname2", service2);
    }

    if (service3 === "other") 
    {
      formData.append("other3", other3);
    }
    else 
    {
      formData.append("campaignname3", service3);
    }

    // Convert the time string to a Date object
    const currentTime = new Date(startTime);
    // Add 3 minutes to the current time
    currentTime.setMinutes(currentTime.getMinutes() + 3);

    

    // Format the updated time back to the desired format (YYYY-MM-DDTHH:mm)
    const updatedTimeString = currentTime.toISOString();


    formData.append("startTime", startTime);
    formData.append("endTime", endTime);

    // Appending the campaign types whether primary , secondary or default
    formData.append("type1", type1);
    formData.append("type2", type2);
    formData.append("type3", type3);

    formData.append("footerText1",footerText1);
    formData.append("footerText2",footerText2);
    formData.append("footerText3",footerText3);


    // Making request to the backend ,sending the form data 
    const endpoint = channel === 'nm' ? `${process.env.REACT_APP_BASE_URL}/nm/upload` : `${process.env.REACT_APP_BASE_URL}/upload`;

    await axios.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${storedToken}`,
      },
    }).then(function (response) {

      if (response.data === "All files uploaded Successfully") 
      {
        setSuccessMsg(true);
        setRedirectToAnotherComponent(true);

        setTimeout(() => {
          window.location.reload();
        }, 4000);

      }
      else 
      {

        console.log("Response : ",response);
        
        setMsgFromRes(response.data);
        setOnFailure(true);
      }

      setShowLoader(false);
    })
      .catch(function (error) {
        setShowLoader(false);

        if (error.message == "Network Error") 
        {
          window.alert("Network Error . Maybe Server Closed ...");
        }
      });


    setTimeout(() => {
      setSuccessMsg(false);
      setOnFailure(false);
      setShowLoader(false);
      setSelectAudio1(false);
    }, 4000);
  }

  function handleChannelChange(e) {
    const ch = e.target.value;
    setChannel(ch);
    sessionStorage.setItem('channel', ch);
  }

  return (
    <div>

      {/* If all the campaigns added to the backend successfully */}
      {successMsg && (
        <Error
          children="Campaign Added successfully"
          classes={`h-8 flex justify-center items-center font-base bg-green-400 absolute top-0 left-0 right-0 z-50`}
        />
      )}

      {onFailure && (
        <Error
          children={msgFromRes}
          classes={`h-8 flex justify-center items-center font-base bg-red-400 absolute top-0 left-0 right-0 z-50 transition`}
        />
      )}
      
      <form encType="multipart/form-data" className="text-left h-full">
        <div className="px-6 py-4 flex gap-5">
          <div>
            <label style={{color:'#fff', marginRight:8}}>Channel:</label>
            <label style={{color:'#fff', marginRight:8}}><input type="radio" name="channel" value="mystatus" checked={channel==='mystatus'} onChange={handleChannelChange}/> My Status</label>
            <label style={{color:'#fff'}}><input type="radio" name="channel" value="nm" checked={channel==='nm'} onChange={handleChannelChange}/> Notify Me</label>
          </div>
        </div>
        {service1 === "other" ?
          <>
            <div className="border-b text-white py-3 pl-3">
              Create New Campaign
            </div>
            

            <div className="px-6 py-4 flex gap-5">
              <div className="flex items-center flex-col gap-2">
                <p className="text-gray-100 opacity-80">Enter Service</p>
                <input
                  type="text"
                  className="px-4 py-2 rounded"
                  name="other"
                  placeholder="Enter entity..."
                  onChange={handleOther1}
                  value={other1}
                />
              </div>

              

              <div className="flex items-center flex-col gap-2">
                  <p className="text-gray-200 opacity-80">Enter footer text</p>
                  
                  <textarea className="bg-white flex items-center rounded pl-2 h-10" rows="4" cols="50" placeholder="Enter footer text" value={footerText1} onChange={(e)=>{setFooterText1(e.target.value)}} style={{textAlign:"center"}}>

                  </textarea>

                </div>
              

              <div className="flex items-center flex-col gap-2">
                <p className="text-gray-100 opacity-80">Select Type</p>

                <select
                  name="campaigntype"
                  value={type1}
                  id="services"
                  className="px-4 py-2 rounded"
                  onChange={handleType1}
                  defaultValue="">
                  <option value="primary">primary</option>

                </select>
              </div>
            </div>

            {selectAudio1 &&
              window.alert("Please select audio file, Start Time & End time")}
          </>
          : (
            <>
              {successMsg && (
                <Error
                  children="Campaign Added successfully"
                  classes={`h-8 flex justify-center items-center font-base bg-green-400 absolute top-0 left-0 right-0 z-50`}
                />
              )}
              {onFailure && (
                <Error
                  children={msgFromRes}
                  classes={`h-8 flex justify-center items-center font-base bg-red-400 absolute top-0 left-0 right-0 z-50 transition`}
                />
              )}
              <div className="border-b text-white py-3 pl-3">
                Create New Campaign
              </div>




              {/* --------------------------------------------------- LINE - 1 ------------------------------------------ */}

              <div className="px-6 py-4 flex gap-5">
                <div className="flex items-center flex-col gap-2">
                  <p className="text-gray-100 opacity-80">Select Service</p>
                  <select
                    name="campaignname1"
                    value={service1}
                    id="services"
                    className="px-4 py-2 rounded"
                    onChange={handleService1}
                    defaultValue="">
                    <option value="" disabled>
                      Select Service
                    </option>
                    <option value="vip">vip</option>
                    {channel === 'nm' ? <option value="ms">My Status</option> : <option value="nm">Notify Me</option>}
                    <option value="cbn">Callback Notification</option>
                  
                  </select>
                </div>
                

                <div className="flex items-center flex-col gap-2">
                  <p className="text-gray-200 opacity-80">Enter footer text</p>
                  
                  <textarea className="bg-white flex items-center rounded pl-2 h-10" rows="4" cols="50" placeholder="Enter footer text" value={footerText1} onChange={(e)=>{setFooterText1(e.target.value)}} style={{textAlign:"center"}}>

                  </textarea>

                </div>

                
                <div className="flex items-center flex-col gap-2">
                  <p className="text-gray-100 opacity-80">Select Type</p>

                  <select
                    name="type1"
                    value={type1}
                    id="services"
                    className="px-4 py-2 rounded"
                    onChange={handleType1}
                    defaultValue="">
                    <option value="primary">primary</option>

                  </select>
                </div>
              </div>

              {
                selectAudio1 && window.alert("Please select audio file, Start Time & End time")
              }
            </>
          )}

        {service2 == "other" ? (
          <>
            {successMsg && (
              <Error
                children="Campaign Added successfully"
                classes={`h-8 flex justify-center items-center font-base bg-green-400 absolute top-0 left-0 right-0 z-50`}
              />
            )}

            {onFailure && (
              <Error
                children={msgFromRes}
                classes={`h-8 flex justify-center items-center font-base bg-red-400 absolute top-0 left-0 right-0 z-50 transition`}
              />
            )}

            <div className="px-6 py-4 flex gap-5">
              <div className="flex items-center flex-col gap-2">
                <p className="text-gray-100 opacity-80">Enter Service</p>
                <input
                  type="text"
                  className="px-4 py-2 rounded"
                  name="other"
                  placeholder="Enter entity..."
                  onChange={handleOther2}
                  value={other2}
                />
              </div>

              <div className="flex items-center flex-col gap-2">
                  <p className="text-gray-200 opacity-80">Enter footer text</p>
                  
                  <textarea value={footerText2} onChange={(e)=>{setFooterText2(e.target.value)}} className="bg-white flex items-center rounded pl-2 h-10" rows="4" cols="50" placeholder="Enter footer text" style={{textAlign:"center"}}></textarea>

                </div>


              <div className="flex items-center flex-col gap-2">
                <p className="text-gray-100 opacity-80">Select Type</p>

                <select
                  name="campaigntype"
                  value={type2}
                  id="services"
                  className="px-4 py-2 rounded"
                  onChange={handleType2}
                  defaultValue="">
                  <option value="secondary">secondary</option>

                </select>
              </div>
            </div>
            {selectAudio1 &&
              window.alert("Please select audio file, Start Time & End time")}
          </>
        ) : (
          <>
            <div className="px-6 py-4 flex gap-5">
              <div className="flex items-center flex-col gap-2">
                <p className="text-gray-100 opacity-80">Select Service</p>
                <select
                  name="campaignname2"
                  id="services"
                  className="px-4 py-2 rounded"
                  onChange={handleService2}
                  defaultValue="">
                  <option value="" disabled>
                    Select Service
                  </option>
                  <option value="vip">vip</option>
                  {channel === 'nm' ? <option value="ms">My Status</option> : <option value="nm">Notify Me</option>}
                  <option value="cbn">Callback Notification</option>
                  
                  
                </select>
              </div>

              
              <div className="flex items-center flex-col gap-2">
                  <p className="text-gray-200 opacity-80">Enter footer text</p>
                  
                  <textarea value={footerText2} onChange={(e)=>{setFooterText2(e.target.value)}} className="bg-white flex items-center rounded pl-2 h-10" rows="4" cols="50" placeholder="Enter footer text" style={{textAlign:"center"}}></textarea>

                </div>

              
              <div className="flex items-center flex-col gap-2">
                <p className="text-gray-100 opacity-80">Select Type</p>

                <select
                  name="campaigntype"
                  value={type2}
                  id="services"
                  className="px-4 py-2 rounded"
                  onChange={handleType2}
                  defaultValue="">

                  <option value="secondary">secondary</option>

                </select>
              </div>
            </div>
          </>
        )}

        {service3 == "other" ? (
          <>
            <>
              {successMsg && (
                <Error
                  children="Campaign Added successfully"
                  classes={`h-8 flex justify-center items-center font-base bg-green-400 absolute top-0 left-0 right-0 z-50`}
                />
              )}

              {onFailure && (
                <Error
                  children={msgFromRes}
                  classes={`h-8 flex justify-center items-center font-base bg-red-400 absolute top-0 left-0 right-0 z-50 transition`}
                />
              )}

              <div className="px-6 py-4 flex gap-5">
                <div className="flex items-center flex-col gap-2">
                  <p className="text-gray-100 opacity-80">Enter Service</p>
                  <input
                    type="text"
                    className="px-4 py-2 rounded"
                    name="other"
                    placeholder="Enter entity..."
                    onChange={handleOther3}
                    value={other3}
                  />
                </div>

                              
              <div className="flex items-center flex-col gap-2">
                  <p className="text-gray-200 opacity-80">Enter footer text</p>
                  
                  <textarea value={footerText3} onChange={(e)=>{setFooterText3(e.target.value)}} className="bg-white flex items-center rounded pl-2 h-10" rows="4" cols="50" placeholder="Enter footer text" style={{textAlign:"center"}}></textarea>

                </div>


                <div className="flex items-center flex-col gap-2">
                  <p className="text-gray-100 opacity-80">Select Type</p>

                  <select
                    name="campaigntype"
                    value={type3}
                    id="services"
                    className="px-4 py-2 rounded"
                    onChange={handleType3}
                    defaultValue="">
                    <option value="default">default</option>
                  </select>
                </div>
              </div>

              {selectAudio1 &&
                window.alert("Please select audio file, Start Time & End time")}
            </>
          </>
        ) : (
          <>
            {/* ------------------------------------------------- LINE-3 --------------------------------- */}
            <div className="px-6 py-4 flex gap-5">
              <div className="flex items-center flex-col gap-2">
                <p className="text-gray-100 opacity-80">Select Service</p>
                <select
                  name="campaignname3"
                  value={service3}
                  id="services"
                  className="px-4 py-2 rounded"
                  onChange={handleService3}
                  defaultValue="">
                  <option value="" disabled>
                    Select Service
                  </option>
                  <option value="smartCall">Smart Call</option>
                  <option value="myStatus">My Status</option>
                  <option value="smartSms">Smart sms</option>
                  <option value="vip">vip</option>
                  <option value="nm">Notify Me</option>
                  <option value="collectCall">Collect Call</option>
                  <option value="bkk">Bhakabar Kissan</option>
                  <option value="jm">Jazz Mosafir</option>
                  <option value="cbn">Callback Notification</option>
                  <option value="ff">Fit Flex</option>
                  <option value="ww">Weather Walay</option>
                  <option value="busuu">Busuu</option>
                  
                  
                  <option value="other" >Others</option>
                </select>

              </div>


              
              <div className="flex items-center flex-col gap-2">
                  <p className="text-gray-200 opacity-80">Enter footer text</p>
                  
                  <textarea value={footerText3} onChange={(e)=>{setFooterText3(e.target.value)}} className="bg-white flex items-center rounded pl-2 h-10" rows="4" cols="50" placeholder="Enter footer text" style={{textAlign:"center"}}></textarea>

                </div>


              {/* ------------------------------------------------ NEW FIELD ------------------------------------------- */}
              <div className="flex items-center flex-col gap-2">
                <p className="text-gray-100 opacity-80">Select Type</p>

                <select
                  name="type1"
                  value={type3}
                  id="services"
                  className="px-4 py-2 rounded"
                  onChange={handleType3}
                  defaultValue="">
                  <option value="default">default</option>
                </select>
              </div>
            </div>
          </>
        )}

        

        {/* --------------------------------------------- START AND END TIME ------------------------------------------------ */}
        <div className="px-6 py-4 flex gap-5">
          <div className="flex items-center flex-col gap-2">
            <p className="text-gray-200 opacity-80">Start Time</p>
            <input
              name="startTime"
              type="datetime-local"
              id="time1"
              className="rounded p-2"
              onChange={startTimeHandler}
            />
          </div>

          <div className="flex items-center flex-col gap-2">
            <p className="text-gray-200 opacity-80">End Time</p>
            <input
              name="endTime"
              type="datetime-local"
              id="time2"
              className="rounded p-2"
              onChange={endTimeHandler}
            />
          </div>
        </div>


        


        {/* -------------------------------------------------- SUBMIT BUTTON --------------------------------------------- */}

        <div className="px-0 py-4 flex gap-5">
          <div className="flex items-center flex-col gap-2 ml-10">
            <p>&nbsp;</p>
            <button
              className="rounded active:bg-slate-500 p-2 bg-white px-10 py-2 duration-100 hover:bg-slate-300"
              onClick={submitHandler}>
              {showLoader ? (
                <RotatingLines strokeColor="grey" width="26" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCampaign;
