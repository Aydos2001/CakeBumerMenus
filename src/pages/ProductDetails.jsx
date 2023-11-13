import { BiArrowBack } from "react-icons/bi";
import { Box, Button, Divider, Flex, Grid, GridItem, Icon, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { productDetailsShow } from '../store/action'


const ProductDetails = ({state, dispatch}) => {
 
  return (
    <Box>
      <Button size={"sm"} fontSize={"18px"} colorScheme="red" bg={"red.300"} color={"white"} rounded={"sm"} onClick={() => dispatch(productDetailsShow(""))}>
        <Icon as={BiArrowBack} />
      </Button>
      <Flex w={"full"} justifyContent={"center"} alignItems={"start"} gap={"10px"} flexDir={"column"}>
        <Text fontSize={"25px"} fontWeight={"semibold"}>{state.lang ? state.productDetails?.name_ru : state.productDetails?.name_eng}</Text>
        <Flex justifyContent={"center"} alignItems={"end"} gap={"10px"}>
          <Text fontSize={"20px"} fontWeight={"500"}>{state.lang? "цена:" : "price:"}</Text>
          <Text fontSize={"22px"} fontWeight={"semibold"}>{Number(state.productDetails?.price)?.toLocaleString()}</Text>
          <Text fontSize={"20px"} fontWeight={"500"}>{state.lang? "сум" : "swm"}</Text>
        </Flex>
        <Image src={state.productDetails ? `https://api.cake-bumer.uz/storage/${state.productDetails?.image}` : ""} border={"1px"} borderColor={"red.300"} p={"5px"} w={"full"} maxH={{ base: "250px", md: "300px", lg: "350px" }} objectFit={"cover"} rounded={"sm"} />
        <Text fontSize={"18px"} fontWeight={"500"}>{state.lang ? state.productDetails?.description_ru : state.productDetails?.description_eng}</Text>
        <Text textAlign={"center"} fontSize={"20px"} fontWeight={"semibold"} w={"full"}>{state.allImages.filter(item_image => item_image.menu_id == state.productDetails?.id).length>0? state.lang? "Картинки" : "Pictures" : ""}</Text>
        <Divider h={"1px"} border={"none"} bg={"red"}/>
        <Grid my={"10px"} gridTemplateColumns={state.allImages.filter(item_image => item_image.menu_id == state.productDetails?.id)?.length>1? {base : "1fr", sm : "1fr 1fr", md : "1fr 1fr 1fr"} : "1fr"} gap={"10px"} w={"full"}>
          {state.allImages?.filter(item_image => item_image.menu_id == state.productDetails?.id).map(item => (
            <GridItem key={item.id}>
              <Image src={state.allImages ? `https://api.cake-bumer.uz/storage/${item?.name}` : ""} border={"1px"} borderColor={useColorModeValue("gray.200", "gray.600")} p={"5px"} rounded={"sm"} maxH={"150px"} minH={"150px"} w={"full"} objectFit={"cover"}/>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Box>
  )
}

export default ProductDetails