import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import React from 'react'

const AboutPage = () => {
  return (
    <Box bg={"white"}>
      <Flex w={"85%"} flexDir={{base : "column" , sm : "row"}} maxW={"1400px"} mx={"auto"} py={"40px"} justifyContent={"center"} alignItems={"center"} gap={"10px"}>
        <Box flex={"1"}>
          <Grid gridTemplateColumns={"1fr 1fr"} gap={"5px"} maxW={"100%"} minW={"100%"}>
            <GridItem display={"flex"} justifyContent={"end"} >
              <Image src='https://media.timeout.com/images/106000654/image.jpg' objectFit={"cover"} h={"full"} w={"90%"} rounded={"sm"} />
            </GridItem>
            <GridItem position={"relative"}>
              <Image src='https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?cs=srgb&dl=pexels-pixabay-262978.jpg&fm=jpg' position={"absolute"} objectFit={"cover"} left={"0"} h={"80%"} bottom={"0"} rounded={"sm"} />
            </GridItem >
            <GridItem position={"relative"}>
              <Image src='https://media.istockphoto.com/id/1307190527/photo/happy-waiter-serving-food-to-group-of-friends-in-a-pub.jpg?s=612x612&w=0&k=20&c=EDqQ0oBcpFGV25p61vWUF5N-6lRJdbmZmQMe5kyuxyA=' position={"absolute"} objectFit={"cover"} right={"0"} h={"80%"} top={"0"} rounded={"sm"} />
            </GridItem>
            <GridItem >
              <Image src='https://eastlondongirl.com/wp-content/uploads/2020/02/fcae238f-0aa1-4b6c-ac9f-138ac6a23fb5-600x800.jpg' h={"full"} w={"90%"}  objectFit={"cover"} rounded={"sm"} />
            </GridItem>
          </Grid>

        </Box>
        <Box flex={"1"}>
          <Text fontSize={{base : "15px", md : "20px"}} color={"red.500"} fontWeight={"semibold"}>About Us</Text>
          <Text fontSize={{base: "25px", md : "30px"}} fontWeight={"bold"} mt={"20px"}>Welcome to Cake Bumer</Text>
          <Text color={"gray.600"} fontSize={{base : "12px", md : "15px"}} my={{base : "5px", md : "10px"}}>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem sit.</Text>
          <Text color={"gray.600"} fontSize={{base : "12px", md : "15px"}} my={{base : "5px", md : "10px"}}>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</Text>
          <Flex w={"full"} justifyContent={"space-between"} gap={"5px"}>
          <Box mt={"20px"}>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Box borderLeft={"2px"} borderColor={"red.500"}>
                <Text fontSize={{base : "25px" , md : "30px"}} fontWeight={"bold"} py={"5px"} px={{base : "10px", md :  "15px"}}>15</Text>
              </Box>
              <Box>
                <Text fontSize={{base : "12px", md : "15px"}}>Years of</Text>
                <Text fontSize={{base : "12px" , md : "15px"}} fontWeight={"semibold"}>EXPERIENCE</Text>
              </Box>
            </Flex>
          </Box>
          <Box mt={"20px"}>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Box borderLeft={"2px"} borderColor={"red.500"}>
                <Text fontSize={{base : "25px" , md : "30px"}} fontWeight={"bold"} py={"5px"} px={{base : "10px", md :  "15px"}}>50</Text>
              </Box>
              <Box>
                <Text fontSize={{base : "12px", md : "15px"}}>Popular</Text>
                <Text fontSize={{base : "12px" , md : "15px"}} fontWeight={"semibold"}>MASTER CHEFS</Text>
              </Box>
            </Flex>
          </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default AboutPage