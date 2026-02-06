import React, { useEffect, useState } from 'react'
import Error from '../components/Error'
import Main from '../components/Main'
import Navbar from '../components/Navbar'

function Home() {
  const [username, setUserName] = useState('');

  useEffect(() => {
    let username = localStorage.getItem('username');
    setUserName(username);


    if (!localStorage.getItem('user')) {
      // window.location.href = 'https://switch.com.pk/support/login.php'
    }
  }, [])


  return (
    <div>

      <Navbar username={username} />
      <Main />
    </div>
  )
}

export default Home