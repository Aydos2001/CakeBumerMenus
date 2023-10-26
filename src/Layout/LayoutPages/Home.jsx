import { Box, Flex, Spinner, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import Categories from '../../pages/Categories'
import Products from '../../pages/Products'
import { getCategories } from '../../services/get-categories'
import { getAllCategories } from '../../store/action'
import { MainContext } from '../../store/store'


const Home = () => {
  const { state, dispatch } = useContext(MainContext)
  
  const borderColor = useColorModeValue("gray.300", "gray.700")

  useEffect(() => {
    getCategories(dispatch)
      .then(data => {
        const categories = data;
        
        dispatch(getAllCategories(categories))
      })
      .catch(error => {
        console.error("Ma'lumotlarni olishda xatolik yuz berdi:", error);
      });
  }, [])

  return (
    <>
      {state.isLoading ?
        <Flex w={"full"} minH={"80vh"} justify={"center"} alignItems={"center"} gap={"10px"}>
          <Spinner/>
          <Text>Loading...</Text>
        </Flex>
        :
        <Flex w={"full"} border={"1px"} rounded={"md"} borderColor={borderColor} p={"5px"} h={"full"} gap={"5px"}>
          <Categories />
          <Products />
        </Flex>}
    </>
  )
}

export default Home