import { Box, Divider, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import React from 'react'

const OurMasterChefs = () => {
    return (
        <Box bg={"#ebf2fa"}>
            <Box w={"85%"} mx={"auto"} pt={"30px"} pb={"50px"} maxW={"1400px"}>
                <Flex justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
                    <Text fontSize={{ base: "15px", md: "20px" }} color={"red.500"} fontWeight={"semibold"}>Team Members</Text>
                    <Text fontSize={{ base: "20px", md: "25px" }} fontWeight={"bold"} mt={"20px"}>Our Master Chefs</Text>
                </Flex>
                <Grid gridTemplateColumns={{base :  "1fr",  sm : "1fr 1fr 1fr"}} gap={"10px"} maxW={"100%"} minW={"100%"} mt={"20px"}>
                    <GridItem  display={"flex"} justifyContent={{base : "center", sm  : "end"}} alignItems={"center"}>
                        <Box maxW={"230px"}>
                            <Flex maxW={"full"} shadow={"md"} bg={"white"} rounded={"sm"} p={"5px"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={"20px"}>
                                
                                    <Image minH={"200px"} maxH={"200px"} minW={"full"} maxW={"full"}  src='https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/chef-cooking.jpg?quality=82&strip=all' rounded={"sm"} objectFit={"cover"} />
                                
                                <Box flex={1} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"} gap={"5px"}>
                                    <Text fontSize={{ base: "15px", sm: "16px" }} fontWeight={"semibold"}>Full Name</Text>
                                    <Text fontSize={{ base: "10px", sm: "12px" }} color={"gray.600"} fontWeight={"normal"} mb={"10px"}>Designation</Text>
                                </Box>
                            </Flex>
                        </Box>
                    </GridItem>
                    <GridItem  display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Box maxW={"230px"}>
                            <Flex maxW={"full"} shadow={"md"} bg={"white"} rounded={"sm"} p={"5px"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={"20px"}>
                                
                                    <Image minH={"200px"} maxH={"200px"} minW={"full"} maxW={"full"}  src='https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/chef-cooking.jpg?quality=82&strip=all' rounded={"sm"} objectFit={"cover"} />
                                
                                <Box flex={1} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"} gap={"5px"}>
                                    <Text fontSize={{ base: "15px", sm: "16px" }} fontWeight={"semibold"}>Full Name</Text>
                                    <Text fontSize={{ base: "10px", sm: "12px" }} color={"gray.600"} fontWeight={"normal"} mb={"10px"}>Designation</Text>
                                </Box>
                            </Flex>
                        </Box>
                    </GridItem>
                    <GridItem  display={"flex"} justifyContent={{base : "center", sm  : "start"}} alignItems={"center"}>
                        <Box maxW={"230px"}>
                            <Flex maxW={"full"} shadow={"md"} bg={"white"} rounded={"sm"} p={"5px"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={"20px"}>
                                
                                    <Image minH={"200px"} maxH={"200px"} minW={"full"} maxW={"full"}  src='https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/chef-cooking.jpg?quality=82&strip=all' rounded={"sm"} objectFit={"cover"} />
                                
                                <Box flex={1} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"} gap={"5px"}>
                                    <Text fontSize={{ base: "15px", sm: "16px" }} fontWeight={"semibold"}>Full Name</Text>
                                    <Text fontSize={{ base: "10px", sm: "12px" }} color={"gray.600"} fontWeight={"normal"} mb={"10px"}>Designation</Text>
                                </Box>
                            </Flex>
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    )
}

export default OurMasterChefs