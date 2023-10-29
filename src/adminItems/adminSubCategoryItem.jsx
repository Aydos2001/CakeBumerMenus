import { IoIosArrowDown } from "react-icons/io"; 
import React, { useContext } from 'react'
import { MainContext } from '../store/store'
import { Box, Button, Divider, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from '@chakra-ui/react'
import { selectCategory } from "../store/action";

const AdminSubCategoryItem = ({ item }) => {
    const { state, dispatch } = useContext(MainContext)
    const categoryBg = useColorModeValue("white", "gray.900")
    const categoryBorder = useColorModeValue("gray.200", "gray.700")
    const dividerBg = useColorModeValue("blue" , "blue.400")
    
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<IoIosArrowDown />} px={"2px"} size={"md"} border={"1px"} borderColor={categoryBorder} bg={categoryBg} rounded={"sm"} shadow={"sm"} minW={"max-content"}>
                <Box bg={categoryBg} scrollSnapAlign={"start"} cursor={'pointer'}  borderColor={categoryBorder} transition={"ease-in-out .1s"} rounded={"sm"} minW={"full"} pr={"5px"}>
                    <Flex justifyContent={"start"} alignItems={"center"} minH={"30px"} minW={"full"} gap={"6px"}>
                        <Image maxH={"35px"} minH={"35px"} maxW={"45px"} minW={"45px"} border={"2px"} borderColor={categoryBg} rounded={"sm"} src={`https://api.cake-bumer.uz/storage/${item.image_name}`} />
                        <Text fontWeight={"600"} minW={"max-content"}>{state.lang ? item.name_ru.length > 10 ? `${item.name_ru.slice(0, 7)}... ` : item.name_ru : item.name_eng.length > 10 ? `${item.name_eng.slice(0, 7)}... ` : item.name_eng}</Text>
                    </Flex>
                </Box>
                <Divider position={"absolute"} minH={"2px"} border={"none"} bg={state.selectCategory? state.selectCategory?.category_id === item.id? dividerBg : "none" : state.categories[0].lists.length>0? categoryBg : "none"}  w={"97%"}/>
            </MenuButton>
            <MenuList p={"0"} rounded={"sm"} right={"20px"} minWidth={"max-content"}>
                {item.lists.map(item => (
                    <MenuItem p={"5px"} key={item.id}>
                        <Box onClick={() => (dispatch(selectCategory(item)))} key={item.id} bg={categoryBg} _active={{ transform: "scale(0.95)" }} scrollSnapAlign={"start"} cursor={'pointer'} border={"1px"} borderColor={categoryBorder} transition={"ease-in-out .1s"} rounded={"sm"} minW={"full"} p={"1px"} pr={"10px"}>
                            <Flex justifyContent={"start"} alignItems={"center"} minH={"30px"} minW={"full"} gap={"6px"}>
                                <Image maxH={"30px"} minH={"30px"} maxW={"40px"} minW={"40px"} border={"2px"} borderColor={categoryBg} rounded={"sm"} src={`https://api.cake-bumer.uz/storage/${item.image_name}`} />
                                <Text fontWeight={"600"} minW={"max-content"} fontSize={"sm"}>{state.lang ? item.name_ru.length > 10 ? `${item.name_ru.slice(0, 10)}... ` : item.name_ru : item.name_eng.length > 10 ? `${item.name_eng.slice(0, 10)}... ` : item.name_eng}</Text>
                            </Flex>
                        </Box>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>


    )
}

export default AdminSubCategoryItem