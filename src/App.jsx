import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Passwordrecovery from './Pages/Passwordrecovery'
import Otpgenerator from './Pages/Otpgenerator'
import Confirmpassword from './Pages/Confirmpassword'

function App() {


  return (
    <>
      {/* <Register/> */}
      <Login/>
      {/* /* <Passwordrecovery/> */}
      {/* <Otpgenerator/> 
      <Confirmpassword/> */}
    </>
  )
}

export default App
