import { Box, Button, Divider, Flex, FormControl, FormLabel, Icon, Image, Input, Textarea, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import { PiImageFill } from "react-icons/pi"
import React, { useState } from 'react'


const CreateCategories = () => {

  const [name_ru, setName_ru] = useState('');
  const [name_eng, setName_eng] = useState('');
  const [image_name, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast()

  
  const CardBorder = useColorModeValue("blackAlpha.300", "gray.700")

  const apiUrl = "https://api.cake-bumer.uz/api/categories";

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name_ru', name_ru);
      formData.append('name_eng', name_eng);
      formData.append('image_name', image_name);
  
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

      {image_name ? (

        <Image
        p={"5px"}
          src={URL.createObjectURL(image_name)}
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
            <FormLabel fontWeight={"500"} htmlFor="image_name">Image:</FormLabel>
            <Input
              px={"0"}
              size={"sm"}
              border={"none"}
              type="file"
              id="image_name"
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
  )
}

export default CreateCategories