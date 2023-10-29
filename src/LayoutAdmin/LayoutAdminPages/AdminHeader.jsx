import { FiLogOut } from "react-icons/fi"; 
import { Box, Button, Flex, HStack, Icon, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { BiMoon, BiSun } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { SidebarMenusButton } from '../../config/constants'


const AdminHeader = ({handleLogout}) => {

  const { pathname } = useLocation()
  const headerObject = SidebarMenusButton.find(item => item.path === pathname)


  const { colorMode, toggleColorMode } = useColorMode()
  const headerBg = useColorModeValue("blackAlpha.200", "gray.900")
  const headerBorder = useColorModeValue("blackAlpha.300", "gray.700")

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} px={"20px"} bg={headerBg} border={"1px"} borderColor={headerBorder} h={"70px"} w={"full"} rounded={{ base: "0", sm: "sm" }}>
      <HStack spacing={"20px"}>
        <Icon as={headerObject.icon} p={"5px"} fontSize={"40px"} bg={"blue.400"} color={"white"} rounded={"sm"} />
        <Text fontSize={"20px"} fontWeight={"600"} >{headerObject.label}</Text>
      </HStack>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"10px"}>
        <Link to={"/"}>
          <Button variant={"link"} colorScheme='blue'>View site</Button>
        </Link>
        <Button rounded={"full"} w={"25px"} onClick={toggleColorMode}>
          <Icon as={colorMode === "light" ? BiMoon : BiSun}></Icon>
        </Button>
        <Button onClick={handleLogout} colorScheme="red" size="sm" rounded={"full"} p={"0"}>
          <Icon fontSize={"18px"} as={FiLogOut}/>
        </Button>
      </Box>
    </Flex>
  )
}

export default AdminHeader