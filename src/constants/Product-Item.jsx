import { BiMinus } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

import { Box, Button, Card, CardBody, Divider, Flex, Icon, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { MainContext } from "../store/store";
import { deleteSelectMenu, productDetailsShow, setSelectMenu } from "../store/action";

const ProductItem = ({ item }) => {


  const CardBg = useColorModeValue("white", "gray.900")
  const CardBorder = useColorModeValue("gray.400", "gray.800")
  const { state, dispatch } = useContext(MainContext)

  const addData = state.menuProducts?.find(item_menu => item_menu.id === item.id && item_menu.ru === item.name_ru)
  const countData = state.menuProducts?.find(item_count => item_count.id === item.id && item_count.ru === item.name_ru)

  const [add, setAdd] = useState(addData ? true : false)
  const [count, setCount] = useState(countData ? countData.number + 1 : 1)


  function addMenu(item) {
    setCount(count + 1)
    dispatch(setSelectMenu({ id: item.id, ru: item.name_ru, eng: item.name_eng }))

  }

  function deleteMenu(item) {
    setCount(count - 1 <= 0 ? 1 : count - 1)
    setAdd(count === 2 ? false : true)
    if (add) {
      dispatch(deleteSelectMenu({ id: item.id, ru: item.name_ru, eng: item.name_eng }))
    }
  }

  function Add() {
    setAdd(true)
    setCount(count + 1)
    dispatch(setSelectMenu({ id: item.id, ru: item.name_ru, eng: item.name_eng }))
  }

  return (
    <Card rounded={"sm"} h={"full"} bg={CardBg} shadow={"lg"} overflow={"hidden"} w={"full"}>
      <CardBody p={"0px"} >

        <Image src={`https://api.cake-bumer.uz/storage/${item.image}`} backdropBrightness={"50"} alt="1" w={"full"} minH={"165px"} maxH={"165px"} bg={"white"} objectFit={"cover"} rounded={"sm"} />
        <Box position={"absolute"} display={"flex"} rounded={"sm"} alignItems={"end"} bg={"linear-gradient(180deg, rgba(254,254,254,0.0544712885154062) 52%, rgba(0,0,0,0.5175245098039216) 52%)"} w={"full"} top={"0"} left={"0"} height={"full"} zIndex={"2"}>
          <Flex p={"10px"} w={"full"} alignItems={"start"} justifyContent={"start"} gap={"10px"}>
            <Flex w={"full"} flexDir={"column"} justifyContent={"end"} minH={"160px"} gap={"5px"}>
              <Text onClick={() => dispatch(productDetailsShow(item))} cursor={"pointer"} pt={"20px"} fontSize={"20px"} fontWeight={"600"} color={"white"}>{state.lang ? item.name_ru.length > 16 ? `${item.name_ru.slice(0, 15)}... ` : item.name_ru : item.name_eng.length > 16 ? `${item.name_eng.slice(0, 15)}... ` : item.name_eng}</Text>
              <Flex justifyContent={"space-between"} alignItems={"end"} gap={"5px"} w={"full"} minH={"30px"}>
                <Flex justifyContent={"start"} alignItems={"center"} gap={"5px"}>
                  <Text fontSize={"18px"} fontWeight={"400"} color={"whiteAlpha.900"}>{state.lang ? "цена:" : "price:"}</Text>
                  <Text fontSize={"18px"} fontWeight={"400"} color={"white"} bg={"red.500"} px={"5px"} rounded={"sm"}>{Number(item.price)?.toLocaleString()}</Text>
                </Flex>
                <Box>
                  <Button colorScheme="white" onClick={() => Add(item)} p={"0"} display={add ? "none" : "flex"} rounded={"full"} variant={"outline"} color={"white"} fontSize={"18px"} maxH={"32px"} border={"2px"} maxW={"32px"} size={"sm"}>
                    <Icon as={AiOutlinePlus} />
                  </Button>
                  <Flex justifyContent={"center"} alignItems={"center"} display={add ? "flex" : "none"} gap={"5px"}>
                    <Button border={"2px"} _active={{ transform: "scale(.9)" }} onClick={() => deleteMenu(item)} colorScheme="white" p={"2px"} rounded={"full"} variant={"outline"} color={"white"} fontSize={"18px"} maxH={"28px"} maxW={"28px"} size={"base"}>
                      <Icon as={BiMinus} />
                    </Button>
                    <Text color={"white"} fontWeight={"600"}>{count - 1}</Text>
                    <Button border={"2px"} _active={{ transform: "scale(.9)" }} onClick={() => addMenu(item)} colorScheme="white" p={"2px"} rounded={"full"} variant={"outline"} color={"white"} fontSize={"18px"} maxH={"28px"} maxW={"28px"} size={"base"}>
                      <Icon as={AiOutlinePlus} />
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </CardBody>
    </Card>
  )
}

export default ProductItem