import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Appbar from './components/Appbar'
import Balance from './components/Balance'
import { Users } from './components/Users'
import { SendMoney } from './pages/SendMoney'
import { Dashboard } from './pages/Dashboard'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Sendsuccess } from './pages/Sendsuccess'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/moneytransfer" element={<SendMoney />} />
          <Route path="/sendsuccess" element={<Sendsuccess />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
