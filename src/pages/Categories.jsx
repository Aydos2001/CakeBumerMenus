import { Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../store/store';
import CategoryItem from '../constants/Category-Item';
import AccordionCategory from '../constants/AccordionCategory';

const Categories = () => {
  const { state, dispatch } = useContext(MainContext);

  return (
    <Box overflowY={"auto"} minW={"max-content"} pb={"5px"} pt={"15px"} bg={"red.500"}>
      <Flex alignItems={"start"} gap={"10px"} flexDir={"column"}>
        {state.categories.map(item => (
          item.lists.length > 0 ? <AccordionCategory item={item} key={item.id} /> : <CategoryItem item={item} key={item.id} />
        ))}
      </Flex>
    </Box>
  );
};

export default Categories;
