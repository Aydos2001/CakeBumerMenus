import { Box, Button, Divider, Flex, FormControl, FormLabel, Icon, Image, Input, Spinner, Text, Textarea, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import AdminSubCategoryItem from '../adminItems/adminSubCategoryItem';
import AdminCategoryItem from '../adminItems/adminCategoryItem';
import { MainContext } from '../store/store';
import { getAllCategories } from '../store/action';
import { getCategories } from '../services/get-categories';
import { PiImageFill } from "react-icons/pi"

const CreateMenus = () => {

  const { state, dispatch } = useContext(MainContext)
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

  const [menuData, setMenuData] = useState({
    name_ru: '',
    name_eng: '',
    description_ru: '',
    description_eng: '',
    image: null,
    price: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const CardBorder = useColorModeValue("blackAlpha.300", "gray.700")
  const dividerBg = useColorModeValue("blue.500" , "blue.400")
  const toast = useToast()

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // Raqam kiritilgan bo'lsa, qiymatni tekshirib stringga aylang
    let newValue = value;

    // Fayl yuklandi bo'lsa files[0] orqali fayl o'zgarishini o'rnating
    if (name === 'image' && files.length > 0) {
      setMenuData({
        ...menuData,
        [name]: files[0],
      });
    } else {
      setMenuData({
        ...menuData,
        [name]: newValue,
      });
    }
  };

  const id = state.selectCategory? state.selectCategory.id : state.categories[0]?.lists.length>0 ? state.categories[0]?.lists[0]?.id : state.categories[0]?.id
  const categories = state.selectCategory? state.selectCategory.category_id? "subcategories" : "categories" : state.categories[0]?.lists.length>0? "subcategories" : "categories"
  const apiUrl = `https://api.cake-bumer.uz/api/${categories}/${id}/menus`;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name_ru', menuData.name_ru);
      formData.append('name_eng', menuData.name_eng);
      formData.append('description_ru', menuData.description_ru);
      formData.append('description_eng', menuData.description_eng);
      formData.append('price', menuData.price);
      formData.append('image', menuData.image);

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
      setMenuData({
        name_ru: '',
        name_eng: '',
        description_ru: '',
        description_eng: '',
        image: null,
        price: '',
      })
      toast({
        title: "Successfully added",
        status: 'success',
        position: "top-right",
        isClosable: true,
      });

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
                item.lists.length > 0 ? <AdminSubCategoryItem item={item} key={item.id} /> : <AdminCategoryItem item={item} key={item.id} />
              ))}

            </Flex> :
            <Flex w={"full"} justify={"center"} alignItems={"center"} gap={"10px"} minH={"40px"}>
              <Spinner />
              <Text>Loading...</Text>
            </Flex>}
        </Box>
        <Box>
          <Flex gap={"5px"} >
            <Text  fontSize={"18px"} fontWeight={"600"}>Create</Text>
            <Text fontSize={"18px"} fontWeight={"600"} color={dividerBg}>{state.selectCategory ? state.selectCategory.name_ru : state.categories[0]?.lists.length > 0 ? state.categories[0]?.lists[0].name_ru : state.categories[0]?.name_ru}</Text>
            <Text  fontSize={"18px"} fontWeight={"600"}>menu</Text>
          </Flex>
          {menuData.image ? (

            <Image
              p={"5px"}
              src={URL.createObjectURL(menuData.image)}
              alt="Yuborilgan Rasm"
              objectFit={"cover"}
              maxH={"200px"}
              rounded={"sm"}
              border={"1px"}
              borderColor={CardBorder}
              mx={"auto"} // Rasmning maksimal o'lchami
            />


          ) : (<Flex justifyContent={"center"} alignItems={"center"} maxH={"200px"} mx={"auto"} minH={"200px"} maxW={"400px"} border={"1px"} borderColor={CardBorder} rounded={"sm"}>
            <Icon fontSize={"40px"} color={"gray.400"} as={PiImageFill}></Icon>
          </Flex>)}
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="name_ru">Name_ru</FormLabel>
                <Input
                  rounded={"sm"}
                  placeholder='Enter the name'
                  type="text"
                  id="name_ru"
                  name="name_ru"
                  value={menuData.name_ru}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="name_ru">Name_eng</FormLabel>
                <Input
                  rounded={"sm"}
                  placeholder='Enter the name'
                  type="text"
                  id="name_eng"
                  name="name_eng"
                  value={menuData.name_eng}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="description_ru">Description_ru</FormLabel>
                <Textarea
                  rounded={"sm"}
                  placeholder='Enter the Description (не обязательно)'
                  id="description_ru"
                  name="description_ru"
                  value={menuData.description_ru}
                  onChange={handleInputChange}

                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="description_ru">Description_eng</FormLabel>
                <Textarea
                  rounded={"sm"}
                  placeholder='Enter the Description (не обязательно)'
                  id="description_eng"
                  name="description_eng"
                  value={menuData.description_eng}
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
                  value={menuData.price}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="image">Image</FormLabel>
                <Input
                  px={"0"}
                  size={"sm"}
                  border={"none"}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </FormControl>

              <Divider h={"2px"} mb={"5px"} border={"none"} bg={CardBorder} />
              <Flex w={"full"} justifyContent={"end"} mb={"30px"}>
                {error && (
                  <Text color="red.500" textAlign="center">
                    {error}
                  </Text>
                )}
                <Button
                  fontSize={"17px"}
                  type="submit"
                  rounded={"sm"}
                  py={"10px"}
                  px={"30px"}
                  size={"sm"}
                  colorScheme="blue"
                  isLoading={isLoading}
                  loadingText="Send..."
                >
                  Send
                </Button>
              </Flex>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default CreateMenus