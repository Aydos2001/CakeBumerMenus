import { Box, Button, Card, CardBody, Divider, Flex, Icon, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { MdDelete } from "react-icons/md"
import { BiSolidEditAlt } from "react-icons/bi"

const AdminMenuItem = ({ item, handleOpenModal }) => {
    
    const CardBg = useColorModeValue("white", "gray.900")
    const CardBorder = useColorModeValue("blackAlpha.300", "gray.700")
    const nameColor = useColorModeValue("blue.600", "white")
    return (
        <Card rounded={"sm"} border={"1px"} h={"full"} borderColor={CardBorder} bg={CardBg} shadow={"md"}>
            <CardBody p={"10px"} display={"flex"} justifyContent={"space-between"} flexDirection={"column"}>
                <Box>
                    <Image src={`https://api.cake-bumer.uz/storage/${item.image}`} rounded={"sm"} w={"full"} minH={"180px"} maxH={"180px"} bg={"white"} objectFit={"cover"} />
                    <Box>
                        <Text fontWeight={"600"} fontSize={"15px"} color={nameColor} py={"2px"}>ru: {item.name_ru}</Text>
                        <Text fontWeight={"600"} fontSize={"15px"} color={nameColor} py={"2px"}>eng: {item.name_eng}</Text>
                    </Box>
                    <Text fontSize={"12px"} fontWeight={"semibold"}>Desription ru</Text>
                    <Box border={"1px"} borderColor={CardBorder} rounded={"sm"} shadow={"sm"} px={"5px"} maxH={"80px"} minH={"80px"} overflowY={"auto"}>
                        <Text fontWeight={"600"} color={"slategray"} fontSize={"13px"} py={"7px"}>{item.description_ru? item.description_ru : "not provided"}</Text>
                    </Box>
                    <Text fontSize={"12px"} fontWeight={"semibold"}>Desription eng</Text>
                    <Box border={"1px"} borderColor={CardBorder} rounded={"sm"} shadow={"sm"} px={"5px"} maxH={"80px"} minH={"80px"} overflowY={"auto"}>
                        <Text fontWeight={"600"} color={"slategray"} fontSize={"13px"} py={"7px"}>{item.description_eng? item.description_eng : "not provided"}</Text>
                    </Box>
                </Box>
                <Flex alignItems={"center"} gap={"5px"} mt={"10px"}>
                    <Text fontWeight={"700"} color={nameColor}>{Number(item.price)?.toLocaleString()}</Text>
                </Flex>
                <Box>
                    <Divider h={"1px"} my={"10px"} border={"none"} bg={CardBorder} />
                    <Flex justifyContent={"center"} alignItems={"center"} gap={"5px"}>
                        <Button flex={"1"} onClick={() => handleOpenModal("delete", item.id)} variant={"solid"} size={"sm"} rounded={"sm"} fontSize={"15px"} colorScheme='red'>
                            <Icon fontSize={"17px"} as={MdDelete} />
                            <Text>Delete</Text>
                        </Button>
                        <Button flex={"1"} onClick={() => handleOpenModal("edit", item)} variant={"solid"} size={"sm"} rounded={"sm"} fontSize={"15px"} colorScheme='blue'>
                            <Icon fontSize={"17px"} as={BiSolidEditAlt} />
                            <Text>Update</Text>
                        </Button>
                    </Flex>
                </Box>
            </CardBody>
        </Card>
    )
}

export default AdminMenuItem