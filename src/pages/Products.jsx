import { Box, Flex, Grid, GridItem, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../store/store';
import ProductItem from '../constants/Product-Item';
import axios from 'axios';
import { getSelectMenus } from '../store/action';
import ProductDetails from './ProductDetails';

const Products = () => {
  const { state, dispatch } = useContext(MainContext);
  const borderColor = useColorModeValue("gray.300", "gray.700");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataId = state.selectCategory ? state.selectCategory.id : state.categories[0]?.lists.length > 0 ? state.categories[0].lists[0].id : state.categories[0]?.id;

  const scrollToTop = () => {
    const boxElement = document.getElementById("productsBox"); // Box elementining ID-si
    if (boxElement) {
      boxElement.scrollTop = 0;
    }
  };

  useEffect(() => {
    fetchData(fetchDataId);
    scrollToTop(); // Saqlash

  }, [state.selectCategory ? state.selectCategory.category_id ? state.selectCategory : state.selectCategory.id : state.selectCategory]);


  useEffect(() => {
    scrollToTop();
  }, [state.productDetailsShow])

  const fetchData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const urlCatMenu = `https://api.cake-bumer.uz/public/api/categories/${id}/menus`;
      const urlSubMenu = `https://api.cake-bumer.uz/public/api/subcategories/${id}/menus`;
      const getRequest = state.selectCategory ? state.selectCategory.category_id ? urlSubMenu : urlCatMenu : state.categories[0].lists.length > 0 ? urlSubMenu : urlCatMenu;
      const response = await axios.get(getRequest);
      const data = response.data;
      dispatch(getSelectMenus(data.data));
      
    } catch (err) {
      setError(err);
      dispatch(getSelectMenus([]))
    } finally {
      setLoading(false);
    }
  };

  const nameCategory = state.lang
    ? state.selectCategory
      ? state.selectCategory.name_ru
      : state.categories[0]?.lists.length > 0
      ? state.categories[0].lists[0].name_ru
      : state.categories[0]?.name_ru
    : state.selectCategory
    ? state.selectCategory.name_eng
    : state.categories[0].lists.length > 0
    ? state.categories[0].lists[0].name_eng
    : state.categories[0].name_eng;

  return (
    <Box
      id="productsBox" // ID ni belgilash
      px={"10px"}
      py={"5px"}
      overflowY={"auto"}
      w={"full"}
    >
      {loading ? (
        <Flex w={"full"} minH={"80vh"} justify={"center"} alignItems={"center"} gap={"10px"}>
          <Spinner color='orange'/>
          <Text>Loading...</Text>
        </Flex>
      ) : (
        <>
          <Flex w={"full"} py={"5px"} fontSize={"18px"} fontWeight={"600"} justifyContent={"center"} alignItems={"center"}>
            {nameCategory}
          </Flex>
          <Grid display={state.productDetailsShow ? "none" : "grid"} gap={"10px"} gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr" }}>
            {state.products.map(item => (
              <GridItem key={item.id}>
                <ProductItem item={item} />
              </GridItem>
            ))}
          </Grid>
          <Box display={state.productDetailsShow ? "block" : "none"}>
            <ProductDetails state={state} dispatch={dispatch}/>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Products;
