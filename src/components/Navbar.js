import React from 'react'
import Logo from './Logo'
import Profile from './Profile'

function Navbar(props) {
  return (
    <div className='h-14 w-screen bg-slate-200 flex items-center justify-between px-8 border-b border-blue-900 shadow-2xl'>
        <Logo/>
        <Profile username={props.username}/>
    </div>
  )
}

export default Navbar;