import { Box, Button, Divider, Heading, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SidebarMenusButton } from '../../config/constants' 
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import { MainContext } from '../../store/store'
import { toggleSidebar } from '../../store/action'

const Sidebar = () => {

    const {pathname} = useLocation()
    const sideBg = useColorModeValue("gray.100", "gray.900")
    const sideBorder  = useColorModeValue("gray.400", "gray.700")
    const sideHeading = useColorModeValue("gray.700", "white")

    const {state, dispatch} = useContext(MainContext)

  return (
    <Box w={{base: "80%", md : "25%", lg : "20%",}} borderRight={"1px"} borderRightColor={sideBorder} zIndex={"2"} bg={sideBg} p={"10px"} h={"100vh"}  position={{base: "absolute", md: "sticky"}} left={state.openSidebar? "-80vw": "0"} transition={"ease .5s"}>
        
        <Heading color={sideHeading} fontSize={{base: "20px", sm: "22px", md: "25px"}} textAlign={"center"} my={"15px"}>Dashboard</Heading>
        <Divider h={"1.2px"} border={"none"} bg={sideBorder} mb={"20px"}/>
        <Button onClick={() => dispatch(toggleSidebar())} display={{base: "block", md: "none"}} border={"1px"} borderColor={sideBorder} borderLeft={"none"} position={"absolute"} right={"-27px"} variant={"unstyled"} size={"0"} w={"27px"} fontSize={"22px"} top={"50%"} bg={sideBg} overflow={"hidden"} h={"60px"} rounded={"0"} roundedRight={"90%"}>
            <Icon as={state.openSidebar? IoIosArrowForward : IoIosArrowBack}/>
        </Button>
        
        <Stack>
            {SidebarMenusButton.map(item => (
            <Box key={item.id}>
                <Link to={item.path}>
                <Button onClick={() => dispatch(toggleSidebar())} variant={pathname === item.path? "solid" : "outline"} w={"full"} colorScheme='facebook' justifyContent={"start"} gap={"5px"} rounded={"sm"}>
                    <Icon fontSize={"20px"} as={item.icon}></Icon>
                    <Text fontSize={"15px"}>{item.label}</Text>
                </Button>
                </Link>
                {item.id==2 || item.id==4 || item.id==6? <Divider h={"1.2px"} border={"none"} bg={sideBorder} mb={"5px"} mt={"10px"}/> : <></>}
            </Box>
            
            ))}
            
        </Stack>
    </Box>
  )
}

export default Sidebar