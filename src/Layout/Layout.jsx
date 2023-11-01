import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useReducer } from 'react'
import Header from './LayoutPages/Header'
import Home from './LayoutPages/Home'
import Sidebar from './LayoutPages/Sidebar'
import { MainContext } from '../store/store'
import bgImage from "../Images/bg.png"
import { Outlet } from 'react-router-dom'
const Layout = () => {
    
  return (
    <Box height={"100vh"} overflowY={"auto"} fontFamily={"montserrat"} backgroundImage={bgImage} backgroundSize={"400px"}>
        <Header/>
        <Outlet/>
        <Sidebar/>
    </Box>
  )
}

export default Layout