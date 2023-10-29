import { Box, Button, Card, CardBody, Flex, Grid, GridItem, Icon, Spinner, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../store/store'
import { getCategories } from '../services/get-categories'
import { getAllCategories, getSelectMenus } from '../store/action'
import AdminCategoryItem from '../adminItems/adminCategoryItem'
import AdminSubCategoryItem from '../adminItems/adminSubCategoryItem'
import { Link } from 'react-router-dom'
import { PiPlusCircleThin } from "react-icons/pi"
import axios from 'axios'
import AdminMenuItem from '../adminItems/adminMenuItem'
import ModalAlertMenuDelete from '../ModalAlerts/ModalAlertMenuDelete'
import ModalAlertMenuUpdate from '../ModalAlerts/ModalAlertMenuUpdate'


function Menus() {
  const { state, dispatch } = useContext(MainContext)
  const CardBg = useColorModeValue("white", "gray.900")
  const CardBorder = useColorModeValue("blackAlpha.300", "gray.700")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dividerBg = useColorModeValue("blue.500", "blue.400")

  const [editDes, setEditDes] = useState();
  const [modalType, setModalType] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

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

  const fetchData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const urlCatMenu = `https://api.cake-bumer.uz/public/api/categories/${id}/menus`;
      const urlSubMenu = `https://api.cake-bumer.uz/public/api/subcategories/${id}/menus`;
      const getRequest = state.selectCategory ? state.selectCategory.category_id ? urlSubMenu : urlCatMenu : state.categories[0]?.lists.length > 0 ? urlSubMenu : urlCatMenu;
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


  useEffect(() => {
    if (state.categories.length > 0) {
      fetchData(state.selectCategory ? state.selectCategory?.id : state.categories[0]?.lists.length > 0 ? state.categories[0].lists[0].id : state.categories[0]?.id)
    } else {
      ""
    }
  }, [state.selectCategory ? state.selectCategory.category_id ? state.selectCategory : state.selectCategory.id : state.categories])

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
          <Flex gap={"5px"} mb={"10px"}>
            <Text fontSize={"18px"} fontWeight={"600"}>All</Text>
            <Text fontSize={"18px"} fontWeight={"600"} color={dividerBg}>{state.selectCategory ? state.selectCategory.name_ru : state.categories[0]?.lists > 0 ? state.categories[0]?.lists[0].name_ru : state.categories[0]?.name_ru}</Text>
            <Text fontSize={"18px"} fontWeight={"600"}>menu</Text>
          </Flex>
          {loading? (
            <Flex w={"full"} minH={"80vh"} justify={"center"} alignItems={"center"} gap={"10px"}>
              <Spinner color='orange' />
              <Text>Loading...</Text>
            </Flex>
          ) : (
            <Grid
              gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr" }}
              gap={"10px"}
            >
              {state.products.map(item => (
                <GridItem key={item.id}>
                  <AdminMenuItem item={item} handleOpenModal={handleOpenModal}/>
                </GridItem>
              ))}
              <GridItem >
                <Card rounded={"sm"} border={"1px"} borderColor={CardBorder} bg={CardBg} shadow={"md"} h={"full"} minH={"350px"}>
                  <CardBody p={"7px"} rounded={"sm"}>
                    <Flex justifyContent={"center"} flexDirection={"column"} gap={"10px"} alignItems={"center"} height={"full"} w={"full"}>
                      <Link to={"/Admin/create-menus"}>
                        <Button h={"100px"} w={"100px"} rounded={"full"}>
                          <Icon fontSize={"50px"} fontWeight={"200"} as={PiPlusCircleThin} />
                        </Button>
                      </Link>
                      <Text>Create new menus</Text>
                    </Flex>
                  </CardBody>
                </Card>
              </GridItem>
              <ModalAlertMenuUpdate
                id={editDes}
                isOpen={isEditModalOpen}
                onClose={handleCloseModals}
                modalType={modalType}
                fetchData={fetchData}
              />
              <ModalAlertMenuDelete
                id={editDes}
                isOpen={isDeleteModalOpen}
                onClose={handleCloseModals}
                modalType={modalType}
                fetchData={fetchData}
              />
            </Grid>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default Menus