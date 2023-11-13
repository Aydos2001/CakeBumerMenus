import React, { useContext } from 'react'
import CategoryItem from './Category-Item'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Image, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { MainContext } from '../store/store'
import { productDetailsShow, selectCategory } from '../store/action'

const AccordionCategory = ({ item }) => {
    const { state, dispatch } = useContext(MainContext)
    const categoryBg = useColorModeValue("white", "gray.900")
    const categoryBorder = useColorModeValue("gray.100", "gray.700")
    const { colorMode } = useColorMode()
    const active = state.selectCategory ? state.selectCategory?.category_id === item.id ? true : false : state.categories[0].lists.length > 0 ? state.categories[0]?.lists[0]?.id === item.lists.id ? true : false : state.categories[0].id === item.id ? true : false
    
    return (
        <Accordion allowMultiple justifyContent={"center"} w={"full"} fontFamily={"montserrat"}>
            <AccordionItem borderTop={"none"} borderBottom={"none"} pb={"5px"}>
                <AccordionButton p={"0"} position={"relative"} rounded={"sm"} _active={{ transform: "scale(0.95)" }}>
                    <Box bg={active ? "red.600" : "transparent"} color={"white"} scrollSnapAlign={"start"} cursor={'pointer'} transition={"ease-in-out .1s"} minW={"full"} p={"1px"} pl={"10px"} pr={"25px"}>
                        <Flex justifyContent={"start"} alignItems={"center"} minH={"30px"} minW={"full"} gap={"6px"}>
                            <Image maxH={"35px"} minH={"35px"} maxW={"45px"} minW={"45px"} p={"2px"} rounded={"sm"} src={`https://api.cake-bumer.uz/storage/${item.image_name}`} objectFit={"contain"} filter={"invert(100%)"} />
                            <Text fontWeight={"500"} minW={"max-content"}>{state.lang ? item.name_ru.length > 9 ? `${item.name_ru.slice(0, 8)}... ` : item.name_ru : item.name_eng.length > 9 ? `${item.name_eng.slice(0, 8)}... ` : item.name_eng}</Text>
                        </Flex>
                    </Box>
                    <AccordionIcon position={"absolute"} right={"2px"} color={"white"} />
                </AccordionButton>

                <AccordionPanel p={"2px"} mt={"2px"} rounded={"sm"} pt={"3px"} display={"flex"} justifyContent={"space-evenly"} gap={"3px"} alignItems={"start"} flexDir={"column"} bg={active ? "red.600" : "blackAlpha.200"}>
                    {item.lists.map(item_list => (
                        <Box onClick={() => (dispatch(selectCategory(item_list)), dispatch(productDetailsShow("")))} key={item_list.id} color={"white"} _active={{ transform: "scale(0.95)" }} scrollSnapAlign={"start"} cursor={'pointer'} transition={"ease-in-out .1s"}  minW={"full"} p={"1px"} ml={"30px"} pr={"9px"}>
                            <Flex justifyContent={"start"} alignItems={"center"} minH={"30px"} minW={"full"} gap={"1px"}>
                                <Image maxH={"30px"} minH={"30px"} maxW={"40px"} minW={"40px"} p={"2px"} rounded={"sm"} src={`https://api.cake-bumer.uz/storage/${item_list.image_name}`} objectFit={"contain"} filter={"invert(100%)"} />
                                <Text fontWeight={"500"} minW={"max-content"} fontSize={"sm"}>{state.lang ? item_list.name_ru.length > 10 ? `${item_list.name_ru.slice(0, 9)}... ` : item_list.name_ru : item_list.name_eng.length > 10 ? `${item_list.name_eng.slice(0, 9)}... ` : item_list.name_eng}</Text>
                            </Flex>
                        </Box>
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default AccordionCategory