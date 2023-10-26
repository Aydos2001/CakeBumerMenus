import {Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { MainContext } from '../store/store'
import CategoryItem from '../constants/Category-Item'
import AccordionCategory from '../constants/AccordionCategory'



const Categories = () => {
  const { state, dispatch } = useContext(MainContext)

  return (
    <Box overflowY={"auto"} minW={"max-content"}>
      <Flex pr={"5px"} alignItems={"start"} gap={"10px"} overflowY={"auto"} scrollSnapType={"y"} flexDir={"column"}>
        {state.categories.map(item => (
          item.lists.length>0? <AccordionCategory item={item} key={item.id}/> : <CategoryItem item={item} key={item.id}/>
        ))}
        
      </Flex>
    </Box>
  )
}

export default Categories