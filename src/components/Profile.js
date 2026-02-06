import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user") || null;
    if (loggedInUser) {
      setLoggedIn(true);
    }
  }, []);

  function logoutHandler() {
    localStorage.clear();
    window.location.href = 'https://switch.com.pk/support/login.php'
    // window.location.reload();
    // Uncomment the following code if you want to make a logout request to the server
    /*
    const token = localStorage.getItem("user");
    axios.post('http://localhost:3000/logout', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(function (response) {
        console.log(response);
        localStorage.clear();
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    */
  }

  return (
    <div className='flex relative gap-4 items-center group'>
      {loggedIn && (
        <button
          id='logoutBtn'
          className='border border-black rounded p-1 mr-2 hover:bg-slate-100 transition-all duration-1'
          type='submit'
          onClick={logoutHandler}
        >
          Logout
        </button>
      )}
      <p className='tracking-wide border-b-2 border-black'>
        {props.username?.charAt(0)?.toUpperCase() + props.username?.slice(1)}
      </p>
    </div>
  );
}

export default Profile;
