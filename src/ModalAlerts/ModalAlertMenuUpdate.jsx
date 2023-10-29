import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Text,
    Spinner,
    Flex,
    useToast,
    Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import { MainContext } from '../store/store';

function ModalAlertMenuUpdate({ id, onOpen, isOpen, onClose, fetchData }) {
    const { state } = useContext(MainContext);
    const toast = useToast();

    const [menuData, setMenuData] = useState({
        name_ru: '',
        name_eng: '',
        description_ru: '',
        description_eng: '',
        image: null,
        price: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isNewLoading, setIsNewLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsNewLoading(true)
        const getDataInput = async () => {
            setMenuData(id)
        };
        getDataInput();
        setIsNewLoading(false)
    }, [id && onClose]);



    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        
        // Fayl yuklandi bo'lsa, files[0] orqali fayl o'zgarishini o'rnating
        if (name === 'image' && files.length > 0) {
            setMenuData({
                ...menuData,
                [name]: files[0],
            });
        } else {
            setMenuData({
                ...menuData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Tokenni local storage dan olib olamiz
            const token = localStorage.getItem("token");

            // Tokenni saqlashni tekshiramiz
            if (!token) {
                setError('Siz tizimga kirilmagansiz. Iltimos, kirin.');
                setIsLoading(false);
                return;
            }

            // API ga o'zgartirishlar yuboriladi (PUT so'rovi)
            const formData = new FormData();
            formData.append('name_ru', menuData.name_ru);
            formData.append('name_eng', menuData.name_eng);
            formData.append('description_ru', menuData.description_ru? menuData.description_ru : "");
            formData.append('description_eng', menuData.description_eng? menuData.description_eng : "");
            formData.append('price', menuData.price);
            formData.append('image', menuData.image);
            formData.append("_method", "PUT")



            // Agar ma'lumotlarni yangilab bo'lsa, "PUT" so'rovi yuboriladi
            if (id.id) {
                const response = await fetch(`https://api.cake-bumer.uz/api/menus/${id.id}`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`, // Tokenni so'rov sarlavhasiga qo'shamiz
                    },
                });

            } else {
                setError('Kategoriya tanlanmagan.');
            }

            setIsLoading(false);
            onClose();
            fetchData(state.selectCategory ? state.selectCategory?.id : state.categories[0]?.lists.length > 0 ? state.categories[0].lists[0].id : state.categories[0]?.id)
            setMenuData({
                name_ru: '',
                name_eng: '',
                description_ru: '',
                description_eng: '',
                image: null,
                price: '',
            })
            toast({
                title: 'Ma\'lumot o\'zgartirildi',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        } catch (error) {
            setError('Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
            console.log(error)
            setIsLoading(false);
        }
    };

    return (
        <Box>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent rounded={"sm"}>
                    <ModalHeader>Update Menu</ModalHeader>
                    <ModalCloseButton />
                    {isNewLoading ?
                        (<Box display={"flex"} w={"full"} h={"300px"} justifyContent={"center"} alignItems={"center"} gap={"20px"}>
                            <Text fontSize={"20px"}>Loading</Text>
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='md'
                            />
                        </Box>) : (
                            <ModalBody>
                                <form onSubmit={handleSubmit}>
                                    <FormControl>
                                        <FormLabel htmlFor="name_ru">Name_ru</FormLabel>
                                        <Input
                                            rounded={"sm"}
                                            placeholder='Enter the name'
                                            type="text"
                                            id="name_ru"
                                            name="name_ru"
                                            value={menuData?.name_ru || ""}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl mt={"5px"}>
                                        <FormLabel htmlFor="name_eng">Name_eng</FormLabel>
                                        <Input
                                            rounded={"sm"}
                                            placeholder='Enter the name'
                                            type="text"
                                            id="name_eng"
                                            name="name_eng"
                                            value={menuData?.name_eng || ""}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl mt={"5px"}>
                                        <FormLabel htmlFor="name_eng">Description_ru</FormLabel>
                                        <Textarea
                                            rounded={"sm"}
                                            placeholder='Enter the Description (не обязательно)'
                                            id="description_ru"
                                            name="description_ru"
                                            value={menuData?.description_ru || ""}
                                            onChange={handleInputChange}

                                        />
                                    </FormControl>

                                    <FormControl mt={"5px"}>
                                        <FormLabel htmlFor="description_eng">Description_eng</FormLabel>
                                        <Textarea
                                            rounded={"sm"}
                                            placeholder='Enter the Description (не обязательно)'
                                            id="description_eng"
                                            name="description_eng"
                                            value={menuData?.description_eng || ""}
                                            onChange={handleInputChange}

                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel htmlFor="price">Price</FormLabel>
                                        <Input
                                            rounded={"sm"}
                                            placeholder='Enter the price'
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={menuData?.price || ""}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl mt={"5px"}>
                                        <FormLabel htmlFor="image">Image</FormLabel>
                                        <Input
                                            border={"none"}
                                            size={"sm"}
                                            px={"0"}
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FormControl>

                                    {error && (
                                        <Text color="red.500" textAlign="center">
                                            {error}
                                        </Text>
                                    )}

                                    <Flex w={"full"} my={"15px"} justifyContent={"end"}>
                                        <Button
                                            size={"sm"}
                                            rounded={"sm"}
                                            px={"30px"}
                                            type="submit"
                                            colorScheme="blue"
                                            isLoading={isLoading}
                                            loadingText="Save..."
                                        >
                                            Save
                                        </Button>
                                    </Flex>
                                </form>
                            </ModalBody>
                        )}
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ModalAlertMenuUpdate;
