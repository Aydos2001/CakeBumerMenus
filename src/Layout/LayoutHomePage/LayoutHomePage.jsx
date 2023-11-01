import { Box } from '@chakra-ui/react'
import React from 'react'
import HomePage from './LoyoutHomePages/HomePage'
import AboutPage from './LoyoutHomePages/AboutPage'
import FooterPage from './LoyoutHomePages/FooterPage'

const LayoutHomePage = () => {
  return (
    <Box overflowY={"auto"}>
      <HomePage/>
      <AboutPage/>
      <FooterPage/>
    </Box>
  )
}

export default LayoutHomePage