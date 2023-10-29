import React, { useContext, useEffect, useState } from 'react'
import { getCategories } from '../services/get-categories';
import { getAllCategories, getSelectSubcategories } from '../store/action';
import { MainContext } from '../store/store';
import { Box, Button, Divider, Flex, FormLabel, Icon, Image, Input, Spinner, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import axios from 'axios';
import AdminCategoryItemSub from '../adminItems/adminCategoryItemSub';
import { PiImageFill } from "react-icons/pi"

const CreateSubcategories = () => {

  const { state, dispatch } = useContext(MainContext)
  const dividerBg = useColorModeValue("blue.500", "blue.400")

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

  const [name_ru, setName_ru] = useState('');
  const [name_eng, setName_eng] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast()
  const CardBorder = useColorModeValue("blackAlpha.300", "gray.700")

  const id = state.selectCategorySub? state.selectCategorySub?.id : state.categories[0]?.id

  const apiUrl = `https://api.cake-bumer.uz/api/categories/${id}/subcategories`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name_ru', name_ru);
      formData.append('name_eng', name_eng);
      formData.append('image_name', image);
  
      // Tokenni local storage dan olib olamiz
      const token = localStorage.getItem("token");
  
      // Tokenni saqlashni tekshiramiz
      if (!token) {
        throw new Error('Siz tizimga kirilmagansiz. Iltimos, kirin.');
      }
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Tokenni so'rov sarlavhasiga qo'shamiz
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setMessage('Data created successfully!');
      setIsLoading(false);
      toast({
        title: "Successfully added",
        status: 'success',
        position: "top-right",
        isClosable: true,
      });
      setName_ru('');
      setName_eng('');
      setImage(null);
    } catch (error) {
      console.error('Xatolik: ' + error.message);
      setMessage('Xatolik yuz berdi.');
      setIsLoading(false);
    }
  };


  return (
    <Box>
      <Flex justifyContent={"center"} flexDir={"column"} gap={"5px"}>
        <Box overflowX={"auto"} w={"full"} minH={"50px"}>
          {state.categories.length > 0 ?
            <Flex pr={"5px"} alignItems={"start"} gap={"10px"}>
              {state.categories.map(item => (
                <AdminCategoryItemSub item={item} key={item.id} />
              ))}

            </Flex> :
            <Flex w={"full"} justify={"center"} alignItems={"center"} gap={"10px"} minH={"40px"}>
              <Spinner />
              <Text>Loading...</Text>
            </Flex>}
        </Box>
        <Box>
          <Flex gap={"5px"} mb={"10px"}>
            <Text fontSize={"18px"} fontWeight={"600"}>Create</Text>
            <Text fontSize={"18px"} fontWeight={"600"} color={dividerBg}>{state.selectCategorySub ? state.selectCategorySub.name_ru : state.categories[0]?.name_ru}</Text>
            <Text fontSize={"18px"} fontWeight={"600"}>Subcategories</Text>
          </Flex>
        </Box>
        <Box>
          {image ? (
            <Image
              p={"5px"}
              src={URL.createObjectURL(image)}
              alt="Yuborilgan Rasm"
              objectFit={"cover"}
              maxH={"200px"}
              rounded={"sm"}
              border={"1px"}
              borderColor={CardBorder}
              mx={"auto"} // Rasmning maksimal o'lchami
            />
          ) :
            (
              <Flex justifyContent={"center"} alignItems={"center"} maxH={"200px"} mx={"auto"} minH={"200px"} maxW={"400px"} border={"1px"} borderColor={CardBorder} rounded={"sm"}>
                <Icon fontSize={"40px"} color={"gray.400"} as={PiImageFill}></Icon>
              </Flex>)}
          <form onSubmit={handleSubmit}>
            <div>
              <FormLabel fontWeight={"500"} htmlFor="name_ru">Name_ru</FormLabel>
              <Input
                placeholder='Enter the name ru'
                rounded={"sm"}
                type="text"
                id="name_ru"
                value={name_ru}
                onChange={(e) => setName_ru(e.target.value)}
                required
              />
            </div>
            <Box my={"10px"}>
              <div>
                <FormLabel fontWeight={"500"} htmlFor="name_eng">Name_eng</FormLabel>
                <Input
                  placeholder='Enter the name ru'
                  rounded={"sm"}
                  type="text"
                  id="name_eng"
                  value={name_eng}
                  onChange={(e) => setName_eng(e.target.value)}
                  required
                />
              </div>
            </Box>
            <Box my={"10px"}>
              <div>
                <FormLabel fontWeight={"500"} htmlFor="image">Image:</FormLabel>
                <Input
                  px={"0"}
                  size={"sm"}
                  border={"none"}
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  required
                />
              </div>
            </Box>
            <Divider h={"2px"} my={"10px"} border={"none"} bg={CardBorder} />
            <Flex w={"full"} justifyContent={"end"} mt={"10px"}>
              <Button
                fontSize={"17px"}
                py={"5px"}
                px={"30px"}
                size={"sm"}
                isLoading={isLoading}
                loadingText="Send..."
                rounded={"sm"}
                colorScheme='blue'
                type="submit">Send</Button>
            </Flex>
          </form>

        </Box>
      </Flex>
    </Box>
  )
}

export default CreateSubcategories