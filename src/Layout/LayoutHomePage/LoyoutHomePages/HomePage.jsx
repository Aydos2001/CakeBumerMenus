import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import iconImage from "../../../Images/iconWhite.png"
import bgVideo from "../../../Images/bgVideo.mp4"
import { MainContext } from '../../../store/store'

const HomePage = () => {
    const { state, dispatch } = useContext(MainContext)
    useEffect(() => {
        const video = document.getElementById("video");
        video.autoplay = true;
        video.muted = true;
    }, []);

    return (
        <Box position={"relative"} backgroundPosition={"left"} backgroundSize={"cover"} backgroundRepeat={"no-repeat"}>
            <Flex position={"absolute"} w={"full"} bottom={"0"} top={"0"} bg={"rgba(0,0,0,0.5)"} justifyContent={"center"} align={"center"}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
                    <Image src={iconImage} maxH={"200px"} maxW={"60%"} />
                    <Flex justifyContent={"center"} alignItems={"center"} gap={"10px"} mt={"20px"} flexDir={"column"}>
                        <Text color={"white"} textAlign={"center"}>{state.lang? "Роскошные десерты из свежих ингредиентов и сытный Fastfood" : "Luxurious desserts made from fresh ingredients and hearty Fastfood"}</Text>
                        <Text color={"white"} textAlign={"center"}>{state.lang? "Режим работы с 8:30 до 23:00" : "Opening hours: 8:30 to 23:00"}</Text>
                        <Text color={"white"} textAlign={"center"}>{state.lang? "Доставка по городу +(99) 013-77-57" : "Delivery within the city +(99) 013-77-57"}</Text>
                    </Flex>
                </Box>
            </Flex>
            <Box top={"0"} left={"0"} right={"0"} overflow={"hidden"}>
                <video id="video" width={"100%"} loop={true} style={{ objectFit: 'cover', objectPosition: 'center top', minHeight: '50vh', maxHeight: '50vh' }}>
                    <source src={bgVideo} type="video/mp4"></source>
                </video>
            </Box>
        </Box>
    )
}

export default HomePage;
