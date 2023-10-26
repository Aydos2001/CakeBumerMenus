import { Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { MainContext } from '../store/store'
import { productDetailsShow, selectCategory } from '../store/action'

const CategoryItem = ({item}) => {
  const { state, dispatch } = useContext(MainContext)
  const categoryBg = useColorModeValue("white" , "gray.900")
  const categoryBorder = useColorModeValue("gray.100" , "gray.700")
  
  return (
    <Box bg={categoryBg} onClick={() => (dispatch(selectCategory(item)), dispatch(productDetailsShow("")))} scrollSnapAlign={"start"} cursor={'pointer'}  border={"1px"} borderColor={categoryBorder} shadow={"sm"} transition={"ease-in-out .1s"} rounded={"sm"} _active={{transform : "scale(0.95)"}} minW={"full"} p={"1px"} pr={"20px"}>
      <Flex justifyContent={"start"} alignItems={"center"} minH={"30px"} minW={"full"} gap={"6px"}>
        <Image maxH={"35px"} minH={"35px"} maxW={"45px"} minW={"45px"} border={"2px"} borderColor={categoryBg} rounded={"sm"} src={`https://api.cake-bumer.uz/storage/${item.image_name}`}/>
        <Text fontWeight={"600"} minW={"max-content"}>{state.lang? item.name_ru.length>10? `${item.name_ru.slice(0,9)}... ` : item.name_ru : item.name_eng.length>10? `${item.name_eng.slice(0,9)}... ` : item.name_eng}</Text>
      </Flex>
    </Box>
  )
}

export default CategoryItem