import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useReducer } from 'react'
import Header from './LayoutPages/Header'
import Home from './LayoutPages/Home'
import Sidebar from './LayoutPages/Sidebar'
import { MainContext } from '../store/store'

const Layout = () => {
    
  return (
    <Box height={"100vh"} overflow={"hidden"}>
        <Header/>
        <Flex gap={"15px"} position={"fixed"} top={"80px"} left={"0"} right={"0"} bottom={"10px"} w={"95%"} mx={"auto"} alignItems={"start"}>
            <Home/>
        </Flex>
        <Sidebar/>
    </Box>
  )
}

export default Layout