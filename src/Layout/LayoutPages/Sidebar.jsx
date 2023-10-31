import { Box, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { MainContext } from '../../store/store'
import { setMenuProducts } from '../../store/action'

const Sidebar = () => {
  const { state, dispatch } = useContext(MainContext)
  const borderColor = useColorModeValue("gray.300", "gray.700")
  const sidebarBgColor = useColorModeValue("white", "gray.900")

  const data = state.selectAllMenu;
  
  const result = data.reduce((acc, item) => {
    const existingItem = acc.find((x) => x.id === item.id);
    if (existingItem) {
      existingItem.number = (existingItem.number || 1) + 1;
    } else {
      acc.push({ id: item.id, ru: item.ru, eng: item.eng, number: 1 });
    }
    
    return acc;
  }, []);

  useEffect(() => {
    dispatch(setMenuProducts(result))
  },[state.selectCategory])
  

  return (
    <Box position={"fixed"} bg={sidebarBgColor} shadow={"md"} right={"10px"} overflowY={"auto"} minW={"300px"} top={state.sidebarMenues ? "70px" : "-100%"} minH={"85vh"} maxH={"80vh"} border={"1px"} rounded={"sm"} borderColor={borderColor} p={"15px"} transition={"ease-in-out .3s"}>
      <Text fontSize={"18px"} textAlign={"center"} mb={"15px"} fontWeight={"semibold"}>{state.lang? "Меню" : "Menu"}</Text>
  
      <Flex flexDir={"column"} gap={"5px"} >
        {result.map((item) => (
          
          <Box key={item.id}>
            <Flex justifyContent={"space-between"} alignItems={"center"} gap={"10px"} fontWeight={"400"}>
              <Text fontSize={"16px"}>{state.lang? item.ru.length>23? `${item.ru.slice(0,22)}... ` : item.ru : item.eng.length>23? `${item.eng.slice(0,22)}... ` : item.eng}</Text>
              <Text>{item.number}</Text>
            </Flex>
            <Divider />
          </Box>
        )).reverse()}
      </Flex>
    </Box>
  )
}

export default Sidebar