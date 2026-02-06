import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import NM from './pages/NM';
import { Routes, Route, useNavigate } from 'react-router-dom'
import LoginByPortal from './pages/LoginByPortal';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate()

  function handler(loggedIn) {
    setLoggedIn(loggedIn);
  }

  useEffect(() => {
    // const loggedInUser = localStorage.getItem("user");
    const loggedInUser = localStorage.getItem("user") || null;
    if (loggedInUser) 
    {
      const foundUser = loggedInUser;
      setUser(foundUser);
      setLoggedIn(true);

      // navigate('/campaign_portal')
    } 
    else if (window.location.pathname === '/campaign_portal/redirect') {
      console.log(window.location.pathname)
      navigate('/campaign_portal/redirect')
    } 
    else 
    {
      // navigate('/login')
      // window.location.href = 'https://switch.com.pk/support/login.php'
    }

    if (!localStorage.getItem('user')) {
      // window.location.href = 'https://switch.com.pk/support/login.php'
    }

  }, []);

  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/nm' element={<NM />}></Route>
        <Route path='/login' element={<Login handler={handler} />}></Route>
        <Route path='/redirect' element={<LoginByPortal />}></Route>
      </Routes>
    </div>
  );
}

export default App;
