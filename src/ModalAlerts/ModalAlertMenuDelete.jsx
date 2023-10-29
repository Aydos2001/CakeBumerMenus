import React, { useContext, useState } from 'react';
import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { MainContext } from '../store/store';

function ModalAlertMenuDelete({ id, onOpen, isOpen, onClose, fetchData }) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { state, dispatch } = useContext(MainContext)

    const handleDelete = async () => {
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
      
          // API ga DELETE so'rovini yuboriladi
          await axios.delete(
            `https://api.cake-bumer.uz/api/menus/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Tokenni so'rov sarlavhasiga qo'shamiz
              },
            }
          );
      
          setIsLoading(false);
          fetchData(state.selectCategory ? state.selectCategory?.id : state.categories[0]?.lists.length > 0 ? state.categories[0].lists[0].id : state.categories[0]?.id)
          onClose(); // Modalni yopish
        } catch (error) {
          setError('Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
          setIsLoading(false);
        }
      };
      
    return (
        <Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent rounded={"sm"}>
                    <ModalHeader>Delete</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize="lg"  mb="4">
                            Do you want to delete data?
                        </Text>
                        {error && (
                            <Text color="red.500" textAlign="center">
                                {error}
                            </Text>
                        )}
                        <Flex w={"full"} justifyContent={"end"} my={"5px"}>
                        <Button
                            rounded={"sm"}
                            size={"sm"}
                            colorScheme="red"
                            onClick={handleDelete}
                            isLoading={isLoading}
                            loadingText="Delete..."
                        >
                            Delete
                        </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ModalAlertMenuDelete;
