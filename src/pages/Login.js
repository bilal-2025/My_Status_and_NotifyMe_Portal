import React, { useState, useEffect } from 'react'
import axios from 'axios';

import jwt_decode from "jwt-decode";
import { RotatingLines } from 'react-loader-spinner';
import img from '../img/switch.jpg'
import { useNavigate } from 'react-router-dom';

function Login({ handler }) 
{

  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [loggedIn, setLoggedIn] = useState();
  const [wrongCred, setWrongCred] = useState();
  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();

  function userHandler(e) 
  {
    setUserName(e.target.value);
  }
  
  function passHandler(e) 
  {
    setPass(e.target.value);
  }

  useEffect(() => {


    const storedToken = localStorage.getItem('user');

    if (storedToken) 
    {
      
      // const decodedToken = jwt_decode(storedToken);

      const decodedToken = jwt_decode(storedToken);

      if (decodedToken.exp * 1000 < Date.now()) 
      {
        // Token is expired, clear it from storage
        localStorage.removeItem('user');
        // setToken(null);
      } 
      else 
      {
        // Token is valid, set it in state
        // setToken(storedToken);
      }
    }
  }, []);

  useEffect(() => {
    // navigate('/');
    if (localStorage.getItem('user')) 
    {
      navigate('/');
    } 
    else if (window.location.pathname === '/campaign_portal/redirect') 
    {
      console.log(window.location.pathname)
      navigate('/campaign_portal/redirect');
    }
    else 
    {
      console.log('else')
      // navigate('/login')
      // window.location.href = 'https://switch.com.pk/support/login.php'
    }
  }, [])

  // When login button is pressed
  async function loginBtnHandler(e) 
  {
    e.preventDefault();

    setShowLoader(true);

    // Sending the request to the backend along with username and password
    axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
      "username": `${userName}`,
      "password": `${pass}`
    }).then(function (response) {

      // Set the loader to false
      setShowLoader(false)
      localStorage.setItem('username', response.data.name)

      if (response.data.result === 'ERROR') 
      {

        setLoggedIn(false);
        setWrongCred(true);
      }
      else 
      {
        let token = response.data.Token;

        setLoggedIn(true);
        setWrongCred(false);
        localStorage.setItem('user', token);
        navigate("/");

      }
    })
      .catch(function (error) {
        
        setWrongCred(true)
      });

    setUserName('');
    setPass('');
  }
  handler(loggedIn);



  return (
    <div className='w-screen h-screen background-clr flex justify-center items-center'>
      <div className='w-72 h-1/2 rounded p-4 pb-6 bg-white shadow-2xl'>
        <div className='mb-16'>MS DYNAMIC CAMPAIGN PORTAL</div>
        <div className='border border-black  md:h-3/4 relative rounded flex justify-center'>
          <div className='w-16 h-16 sm-5 rounded-full absolute -top-8 flex items-center justify-center text-white'>

            <img className='border border-blue-500 rounded-full border-2' src={img} />

          </div>
          <form className='flex justify-center align-center flex-col gap-2 pt-8'>
            <div>
              <input type="text" className='border border-black rounded-sm pl-1 outline-none' placeholder='Username' onChange={userHandler} value={userName} />
            </div>
            <div>
              <input type="password" className='border border-black rounded-sm pl-1 outline-none' placeholder='Password' onChange={passHandler} value={pass} />
            </div>
            <div>
              <button className='bg-blue-700 w-full rounded-sm py-1 my-3 hover:bg-blue-600 text-white hover:shadow-lg flex justify-center items-center' onClick={loginBtnHandler}>
                Login</button>
            </div>

            {wrongCred ? <p className='text-sm text-red-600'>Invalid Credentials</p> : ''}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login