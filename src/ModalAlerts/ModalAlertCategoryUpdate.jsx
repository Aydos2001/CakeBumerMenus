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
} from '@chakra-ui/react';
import axios from 'axios';
import { MainContext } from '../store/store';

function ModalAlertCategory({ id, onOpen, isOpen, onClose }) {
    const { state } = useContext(MainContext);
    const toast = useToast();

    const [categoriesData, setCategoriesData] = useState({
        name_ru: '',
        name_eng: '',
        image_name: null, // Faylni saqlash uchun null qilinadi
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isNewLoading, setIsNewLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // API orqali tanlangan ID-ga oid ma'lumotlarni yuklash uchun qo'shing
        const fetchData = async () => {
            onOpen;
            try {
                setIsNewLoading(true);
                const response = await axios.get(
                    `https://api.cake-bumer.uz/api/categories/${id ? id : state.categories[0].id}`
                );
                const data = response.data.data;

                setCategoriesData(data); // API dan olingan ma'lumotlarni joylashtiring
                setIsNewLoading(false);
            } catch (error) {
                console.error('Ma\'lumotlarni yuklashda xato:', error);
                setIsNewLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        console.log(files)
        // Fayl yuklandi bo'lsa, files[0] orqali fayl o'zgarishini o'rnating
        if (name === 'image_name' && files.length > 0) {
            setCategoriesData({
                ...categoriesData,
                [name]: files[0],
            });
        } else {
            setCategoriesData({
                ...categoriesData,
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
            
            formData.append('name_ru', categoriesData.name_ru);
            formData.append('name_eng', categoriesData.name_eng);
            formData.append('image_name', categoriesData.image_name);
            formData.append("_method", "PUT")

            

            // Agar ma'lumotlarni yangilab bo'lsa, "PUT" so'rovi yuboriladi
            if (id) {
                const response = await fetch(`https://api.cake-bumer.uz/api/categories/${id}`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                      Authorization: `Bearer ${token}`, // Tokenni so'rov sarlavhasiga qo'shamiz
                    },
                  });
                  console.log(response)
            } else {
                setError('Kategoriya tanlanmagan.');
            }

            setIsLoading(false);
            onClose();

            toast({
                title: 'Ma\'lumot o\'zgartirildi',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        } catch (error) {
            setError('Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
            setIsLoading(false);
        }
    };

    return (
        <Box>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent rounded={"sm"}>
                    <ModalHeader>Update categories</ModalHeader>
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
                                            value={categoriesData.name_ru}
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
                                            value={categoriesData.name_eng}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FormControl>

                                    <FormControl mt={"5px"}>
                                        <FormLabel htmlFor="image_name">Image</FormLabel>
                                        <Input
                                            border={"none"}
                                            size={"sm"}
                                            px={"0"}
                                            type="file"
                                            id="image_name"
                                            name="image_name"
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

export default ModalAlertCategory;
