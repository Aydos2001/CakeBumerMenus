import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useReducer } from 'react'
import Header from './LayoutPages/Header'
import Home from './LayoutPages/Home'
import Sidebar from './LayoutPages/Sidebar'
import { MainContext } from '../store/store'
import bgImage from "../Images/bg.png"
const Layout = () => {
    
  return (
    <Box height={"100vh"} overflow={"hidden"} fontFamily={"montserrat"} backgroundImage={bgImage} backgroundSize={"400px"}>
        <Header/>
        <Flex gap={"15px"} position={"fixed"} top={"65px"} left={"0"} right={"0"} bottom={"0px"} w={"100%"} mx={"auto"} alignItems={"start"} bg={"transparent"}>
            <Home/>
        </Flex>
        <Sidebar/>
    </Box>
  )
}

export default Layout