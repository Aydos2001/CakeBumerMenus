import { BsMoonStars } from "react-icons/bs"; 
import { MdSunny } from "react-icons/md"; 
import { IoMdClose } from "react-icons/io";
import { AiOutlineBars } from "react-icons/ai";
import { Box, Button, Flex, Icon, Image, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import icon_image from "../../Images/icon.png"

import { MainContext } from "../../store/store";
import { setLangSite, sidebarToggle } from "../../store/action";

const Header = () => {
    const { state, dispatch } = useContext(MainContext)
    const { colorMode, toggleColorMode } = useColorMode()
    const iconColor = useColorModeValue("gray.600", "white")
    const headerBgColor = useColorModeValue("white", "gray.900")

    useEffect(() => {
        if(colorMode==="dark") {
            toggleColorMode()
        } else {
            ""
        }
    }, [colorMode])
    return (
        <Box w={"full"} px={"5%"} shadow={"md"} fontFamily={"montserrat"}  zIndex={2} bg={"white"} minH={"65px"} maxH={"65px"} position={"fixed"} top={"0"} left={"0"} borderBottom={"1px"} borderColor={"blackAlpha.200"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
                <Image src={icon_image} maxW={"100px"} maxH={"40"}/>
            </Box>
            <Flex gap={"20px"}>
                <Button onClick={() => dispatch(setLangSite())}  color={"gray.800"}   size={"sm"} rounded={"full"} colorScheme="whiteAlpha" fontSize={"12px"} minH={"40px"} maxH={"40px"} minW={"40px"} p={"10px"} fontWeight={"600"}>
                    <Text fontSize={"12px"} fontWeight={"semibold"}>{state.lang ? "RU" : "EN"}</Text>
                </Button>
                <Button onClick={() => dispatch(sidebarToggle())} color={"gray.800"}  size={"sm"}  rounded={"full"} colorScheme="whiteAlpha" fontSize={"20px"} minH={"40px"} maxH={"40px"} minW={"40px"} p={"10px"} fontWeight={"600"}>
                    <Icon as={state.sidebarMenues ? IoMdClose : AiOutlineBars} />
                </Button>
            </Flex>
        </Box>
    )
}

export default Header