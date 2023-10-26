import { MdSunny } from "react-icons/md"; 
import { IoMdClose } from "react-icons/io";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";
import { Box, Button, Flex, Icon, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'

import { MainContext } from "../../store/store";
import { setLangSite, sidebarToggle } from "../../store/action";

const Header = () => {
    const { state, dispatch } = useContext(MainContext)
    const { colorMode, toggleColorMode } = useColorMode()
    const iconColor = useColorModeValue("gray.600", "white")
    const headerBgColor = useColorModeValue("white", "gray.900")
    return (
        <Box w={"full"} px={"5%"} shadow={"md"} zIndex={2} bg={headerBgColor} minH={"65px"} maxH={"65px"} position={"fixed"} top={"0"} left={"0"} borderBottom={"1px"} borderColor={useColorModeValue("gray.200", "gray.700")} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize={"20px"} fontWeight={"bold"}>CAKE BUMER</Text>
            <Flex gap={"20px"}>
                <Button onClick={() => dispatch(setLangSite())}  color={iconColor} variant={"outline"} size={"sm"} rounded={"full"} fontSize={"12px"} minH={"40px"} maxH={"40px"} minW={"40px"} p={"10px"} fontWeight={"600"}>
                    <Text fontSize={"15px"} fontWeight={"semibold"}>{state.lang ? "RU" : "EN"}</Text>
                </Button>
                <Button onClick={() => dispatch(sidebarToggle())} color={iconColor} variant={"outline"} size={"sm"} rounded={"full"} fontSize={"20px"} minH={"40px"} maxH={"40px"} minW={"40px"} p={"10px"} fontWeight={"600"}>
                    <Icon as={state.sidebarMenues ? IoMdClose : AiOutlineBars} />
                </Button>
                <Button onClick={toggleColorMode} variant={"outline"} color={iconColor} size={"sm"} rounded={"full"} minH={"40px"} maxH={"40px"} minW={"40px"} p={"10px"} fontWeight={"600"}>
                    <Icon fontSize={"20px"} as={colorMode === "light" ? BsFillMoonStarsFill : MdSunny} />
                </Button>
            </Flex>
        </Box>
    )
}

export default Header