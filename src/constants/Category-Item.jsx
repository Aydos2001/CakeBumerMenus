import { Box, Flex, Image, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { MainContext } from '../store/store'
import { productDetailsShow, selectCategory } from '../store/action'

const CategoryItem = ({item}) => {
  const { state, dispatch } = useContext(MainContext)
  const categoryBg = useColorModeValue("white" , "gray.900")
  const categoryBorder = useColorModeValue("gray.100" , "gray.700")
  const { colorMode } = useColorMode()
  const active = state.selectCategory? state.selectCategory.category_id? false : state.selectCategory?.id === item.id? true : false  : state.categories[0].lists.length>0? state.categories[0]?.lists[0]?.id === item.id? true : false : state.categories[0].id === item.id? true : false
  
  return (
    <Box bg={active? "red.600" : "transparent"} fontFamily={"montserrat"} onClick={() => (dispatch(selectCategory(item)), dispatch(productDetailsShow("")))} scrollSnapAlign={"start"} cursor={'pointer'}   _active={{transform : "scale(0.95)"}} minW={"full"} p={"1px"} pl={"10px"} pr={"20px"}>
      <Flex justifyContent={"start"} alignItems={"center"} minH={"30px"} minW={"full"} gap={"2px"}>
        <Image maxH={"35px"} minH={"35px"} maxW={"45px"} minW={"45px"} p={"2px"} rounded={"sm"} src={`https://api.cake-bumer.uz/storage/${item.image_name}`} objectFit={"contain"} filter={"invert(100%)"}/>
        <Text fontWeight={"500"} minW={"max-content"} color={"white"}>{state.lang? item.name_ru.length>8? `${item.name_ru.slice(0,7)}... ` : item.name_ru : item.name_eng.length>8? `${item.name_eng.slice(0,7)}... ` : item.name_eng}</Text>
      </Flex>
    </Box>
  )
}

export default CategoryItem