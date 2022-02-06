import React from "react"
import { BrowserRouter, Routes, Route, useLocation, useHistory } from "react-router-dom"

import { AnimatePresence } from "framer-motion"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import 'animate.css'

import { UserContextProvider } from './contexts/UserContext'
import { UsersContextProvider } from "./contexts/UsersContext"

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from "./pages/Signup"
import UserProfile from "./pages/UserProfile"
import TeamProfile from "./pages/TeamProfile"
import Users from "./pages/Users"
import Teams from "./pages/Teams"
import Policy from "./pages/Policy"
import NotFound from './pages/NotFound'

const App = () => {
  const location = useLocation()
  
  return (
    <UsersContextProvider>
        <UserContextProvider>
        <AnimatePresence exitBeforeEnter>
          {/* <BrowserRouter> */}
            <Routes location={location} key={location.pathname}>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="/team/:id" element={<TeamProfile />} />
              <Route path="/users" element={<Users />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          {/* </BrowserRouter> */}
    </AnimatePresence>
        </UserContextProvider>
      </UsersContextProvider>
  )
}

export default App
