import { AiFillYoutube } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { CgFacebook } from "react-icons/cg";
import { Box, Button, Divider, Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <Box  bg={"blackAlpha.900"} color={"white"} px={"20px"} py={{base : "20px", md : "40px"}}>
      <Flex justifyContent={"space-around"} alignItems={"center"} gap={"20px"} flexDir={{base : "column", md : "row"}}>
        <Flex alignItems={{base : "center", md : "start"}} flexDir={"column"} textAlign={{base : "center", md : "start"}}>
          <Text fontSize={{base : "25px", md : "30px"}} fontWeight={"semibold"}>CAKE BUMER</Text>
          <Flex justifyContent={"center"} gap={"10px"}>
            <Link to={"/"}><Button variant={"link"} color={"gray.300"} fontWeight={"400"}>Home</Button></Link>
            <Link to={"/menu"}><Button variant={"link"} color={"gray.300"} fontWeight={"400"}>Menu</Button></Link>
          </Flex>
        </Flex>

        <Box>
        <Flex justifyContent={"center"} alignItems={"center"} gap={"10px"}>
          <Button rounded={"full"} w={"25px"} variant={"outline"} colorScheme="red" _hover={{bg : "red", border :"red.400", color : "whiteAlpha.700"}}>
            <Icon fontSize={"20px"} as={CgFacebook} />
          </Button>
          <Button rounded={"full"} w={"25px"} variant={"outline"} colorScheme="red" _hover={{bg : "red", border :"red.400", color : "whiteAlpha.700"}}>
            <Icon fontSize={"20px"} as={AiOutlineTwitter} />
          </Button>
          <Button rounded={"full"} w={"25px"} variant={"outline"} colorScheme="red" _hover={{bg : "red", border :"red.400", color : "whiteAlpha.700"}}>
            <Icon fontSize={"20px"} as={FaTelegramPlane} />
          </Button>
          <Button rounded={"full"} w={"25px"} variant={"outline"} colorScheme="red" _hover={{bg : "red", border :"red.400", color : "whiteAlpha.700"}}>
            <Icon fontSize={"20px"} as={AiOutlineInstagram} />
          </Button>
          <Button rounded={"full"} w={"25px"} variant={"outline"} colorScheme="red" _hover={{bg : "red", border :"red.400", color : "whiteAlpha.700"}}>
            <Icon fontSize={"20px"} as={AiFillYoutube} />
          </Button>
        </Flex>

        <Box my={"10px"}>
          <Text color={"gray.300"} textAlign={"center"}>CakeBumer © 2023 All Right Reserved</Text>
        </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default FooterPage