import React, { useContext } from 'react'
import CategoryItem from './Category-Item'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react'
import { MainContext } from '../store/store'
import { productDetailsShow, selectCategory } from '../store/action'

const AccordionCategory = ({ item }) => {
    const { state, dispatch } = useContext(MainContext)
    const categoryBg = useColorModeValue("white" , "gray.900")
    const categoryBorder = useColorModeValue("gray.100", "gray.700")
    
    return (
        <Accordion allowMultiple justifyContent={"center"} w={"full"}>
            <AccordionItem borderTop={"none"} pb={"5px"}>
                <AccordionButton p={"0"} position={"relative"} rounded={"md"} _active={{ transform: "scale(0.95)" }}>
                    <Box bg={categoryBg} scrollSnapAlign={"start"} cursor={'pointer'} border={"1px"} borderColor={categoryBorder} shadow={"sm"} transition={"ease-in-out .1s"} rounded={"sm"} minW={"full"} p={"1px"} pr={"25px"}>
                        <Flex justifyContent={"start"} alignItems={"center"} minH={"30px"} minW={"full"} gap={"6px"}>
                            <Image maxH={"35px"} minH={"35px"} maxW={"45px"} minW={"45px"} border={"2px"} borderColor={categoryBg} rounded={"sm"} src={`https://api.cake-bumer.uz/storage/${item.image_name}`} />
                            <Text fontWeight={"600"} minW={"max-content"}>{state.lang ? item.name_ru.length > 10 ? `${item.name_ru.slice(0, 7)}... ` : item.name_ru : item.name_eng.length > 10 ? `${item.name_eng.slice(0, 7)}... ` : item.name_eng}</Text>
                        </Flex>
                    </Box>
                    <AccordionIcon position={"absolute"} right={"2px"} />
                </AccordionButton>

                <AccordionPanel p={"2px"} mt={"2px"} rounded={"sm"} pt={"3px"} display={"flex"} justifyContent={"space-evenly"} gap={"3px"} alignItems={"start"} flexDir={"column"} bg={categoryBg}>
                    {item.lists.map(item => (
                        <Box onClick={() => (dispatch(selectCategory(item)), dispatch(productDetailsShow("")))} key={item.id} bg={categoryBg} _active={{ transform: "scale(0.95)" }} scrollSnapAlign={"start"} cursor={'pointer'} border={"1px"} borderColor={categoryBorder} shadow={"sm"} transition={"ease-in-out .1s"} rounded={"sm"} minW={"full"} p={"1px"} pr={"10px"}>
                            <Flex justifyContent={"start"} alignItems={"center"} minH={"30px"} minW={"full"} gap={"6px"}>
                                <Image maxH={"30px"} minH={"30px"} maxW={"40px"} minW={"40px"} border={"2px"} borderColor={categoryBg} rounded={"sm"} src={`https://api.cake-bumer.uz/storage/${item.image_name}`} />
                                <Text fontWeight={"600"} minW={"max-content"} fontSize={"sm"}>{state.lang ? item.name_ru.length > 10 ? `${item.name_ru.slice(0, 10)}... ` : item.name_ru : item.name_eng.length > 10 ? `${item.name_eng.slice(0, 10)}... ` : item.name_eng}</Text>
                            </Flex>
                        </Box>
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default AccordionCategory