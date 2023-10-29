import React, { useContext, useEffect, useState } from 'react'
import { getCategories } from '../services/get-categories';
import { getAllCategories } from '../store/action';
import { MainContext } from '../store/store';
import { Box, Button, Card, CardBody, Divider, Flex, Grid, GridItem, Icon, Image, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import { BiSolidEditAlt } from "react-icons/bi"
import { PiPlusCircleThin } from "react-icons/pi"
import { MdDelete } from "react-icons/md"
import { Link } from 'react-router-dom';
import ModalAlertCategory from '../ModalAlerts/ModalAlertCategoryUpdate';
import ModalAlertDelete from '../ModalAlerts/ModalAlertCatDelete';


const Categories = () => {

    const { state, dispatch } = useContext(MainContext);
    const CardBg = useColorModeValue("white", "gray.900")
    const CardBorder = useColorModeValue("blackAlpha.300", "gray.700")
    const nameColor = useColorModeValue("blue.600", "white")

    const [editDes, setEditDes] = useState();
    const [modalType, setModalType] = useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleOpenModal = (type, id) => {
        setModalType(type);
        setEditDes(id);

        if (type === "delete") {
            setDeleteModalOpen(true);
        } else if (type === "edit") {
            setEditModalOpen(true);
        }
    };

    const handleCloseModals = () => {
        setDeleteModalOpen(false);
        setEditModalOpen(false);
        getCategories(dispatch)
            .then(data => {
                const categories = data;

                dispatch(getAllCategories(categories))
            })
            .catch(error => {
                console.error("Ma'lumotlarni olishda xatolik yuz berdi:", error);
            });
    };

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
        state.isLoading && state.categories.length === 0?
            <Flex w={"full"} minH={"80vh"} justify={"center"} alignItems={"center"} gap={"10px"}>
                <Spinner />
                <Text>Loading...</Text>
            </Flex>
            :
            <Grid
                gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr 1fr",  lg: "1fr 1fr 1fr 1fr" }}
                gap={"10px"}
            >
                {state.categories.map(item => (
                    <GridItem key={item.id}>
                        <Card rounded={"sm"} border={"1px"} h={"full"} borderColor={CardBorder} bg={CardBg} shadow={"md"}>
                            <CardBody p={"10px"} display={"flex"} justifyContent={"space-between"} flexDirection={"column"}>
                                <Box>
                                    <Image src={`https://api.cake-bumer.uz/storage/${item.image_name}`} rounded={"sm"} w={"full"} minH={{base : "250px" , sm : "220px", md : "250px"}} maxH={{base : "250px" , sm : "220px", md : "250px"}} bg={"white"} objectFit={"cover"} />
                                    <Text fontWeight={"600"} color={nameColor} fontSize={"17px"} py={"3px"}>ru : {item.name_ru}</Text>
                                    <Text fontWeight={"600"} color={nameColor} fontSize={"17px"} py={"3px"}>eng : {item.name_eng}</Text>
                                </Box>

                                <Box>
                                    <Divider h={"1px"} my={"10px"} border={"none"} bg={CardBorder} />
                                    <Flex justifyContent={"center"} alignItems={"center"} gap={"5px"}>
                                        <Button flex={"1"} onClick={() => handleOpenModal("delete", item.id)} variant={"solid"} size={"sm"} rounded={"sm"} fontSize={"15px"} colorScheme='red'>
                                            <Icon fontSize={"17px"} as={MdDelete} />
                                            <Text>Delete</Text>
                                        </Button>
                                        <Button flex={"1"} onClick={() => handleOpenModal("edit", item.id)} variant={"solid"} size={"sm"} rounded={"sm"} fontSize={"15px"} colorScheme='blue'>
                                            <Icon fontSize={"17px"} as={BiSolidEditAlt} />
                                            <Text>Update</Text>
                                        </Button>
                                    </Flex>
                                </Box>
                            </CardBody>
                        </Card>
                    </GridItem>
                ))}
                <GridItem >
                    <Card rounded={"sm"} border={"1px"} borderColor={CardBorder} bg={CardBg} shadow={"md"} h={"full"} minH={"350px"}>
                        <CardBody p={"7px"} rounded={"sm"}>
                            <Flex justifyContent={"center"} flexDirection={"column"} gap={"10px"} alignItems={"center"} height={"full"} w={"full"}>
                                <Link to={"/Admin/create-categories"}>
                                    <Button h={"100px"} w={"100px"} rounded={"full"}>
                                        <Icon fontSize={"50px"} fontWeight={"200"} as={PiPlusCircleThin} />
                                    </Button>
                                </Link>
                                <Text>Create new categories</Text>
                            </Flex>
                        </CardBody>
                    </Card>
                </GridItem>
                <ModalAlertCategory
                    id={editDes}
                    isOpen={isEditModalOpen}
                    onClose={handleCloseModals}
                    modalType={modalType}
                />
                <ModalAlertDelete
                    id={editDes}
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseModals}
                    modalType={modalType}
                />
            </Grid>
    )
}

export default Categories