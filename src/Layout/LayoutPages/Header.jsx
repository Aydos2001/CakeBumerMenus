import { BsMoonStars } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { AiOutlineBars } from "react-icons/ai";
import { Box, Button, Flex, Icon, Image, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import icon_image from "../../Images/icon.png"

import { MainContext } from "../../store/store";
import { setLangSite, sidebarToggle } from "../../store/action";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const { state, dispatch } = useContext(MainContext)
    const { colorMode, toggleColorMode } = useColorMode()
    const iconColor = useColorModeValue("gray.600", "white")
    const headerBgColor = useColorModeValue("white", "gray.900")
    const { pathname } = useLocation()
    useEffect(() => {
        if (colorMode === "dark") {
            toggleColorMode()
        } else {
            ""
        }
    }, [colorMode])
    return (
        <Box w={"full"} px={"5%"} shadow={"md"} fontFamily={"montserrat"} zIndex={2} bg={"white"} minH={"65px"} maxH={"65px"} position={"sticky"} top={"-2px"} left={"0"} borderBottom={"1px"} borderColor={"blackAlpha.200"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
                <Image src={icon_image} maxW={"100px"} maxH={"40"} />
            </Box>
            <Flex gap={"15px"} justifyContent={"center"} alignItems={"center"}>
                <Flex gap={"15px"} justifyContent={"center"} alignItems={"center"} mr={"10%"}>
                    <Link to={"/"}>
                        <Button variant={"unstyled"} fontSize={"15px"} fontWeight={"500"} color={pathname === "/" ? "red.600" : "gray.700"}>Home</Button>
                    </Link>
                    <Link to={"/menu"}>
                        <Button  fontSize={"15px"} fontWeight={"500"} color={"white"} colorScheme="red" size={"sm"} rounded={"sm"}>Menu</Button>
                    </Link>
                </Flex>
                <Button onClick={() => dispatch(setLangSite())} color={"red"} variant={"outline"} size={"sm"} rounded={"full"} colorScheme="red" fontSize={"12px"} minH={"40px"} maxH={"40px"} minW={"40px"} p={"10px"} fontWeight={"600"}>
                    <Text fontSize={"12px"} fontWeight={"semibold"}>{state.lang ? "RU" : "EN"}</Text>
                </Button>
                <Button onClick={() => dispatch(sidebarToggle())} color={"red"} variant={"outline"} size={"sm"} rounded={"full"} colorScheme="red"  fontSize={"20px"} minH={"40px"} maxH={"40px"} minW={"40px"} p={"10px"} fontWeight={"600"}>
                    <Icon as={state.sidebarMenues ? IoMdClose : AiOutlineBars} />
                </Button>
            </Flex>
        </Box>
    )
}

export default Header