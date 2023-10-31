import React, { useReducer } from 'react'
import Layout from './Layout/Layout'
import { MainContext } from './store/store'
import { initialState, reduser } from './store/reduser'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Route, Router, Routes } from 'react-router-dom'
import LayoutAdmin from './LayoutAdmin/LayoutAdmin'
import CreateCategories from './adminPages/CreateCategories'
import Menus from './adminPages/Menus'
import CreateMenus from './adminPages/CreateMenus'
import Subcategories from './adminPages/Subcategories'
import CreateSubcategories from './adminPages/CreateSubcategories'
import Images from './adminPages/Images'
import CreateImages from './adminPages/CreateImages'
import Categories from './adminPages/Categories'

const App = () => {
  const [state, dispatch] = useReducer(reduser, initialState)
  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <Routes>
        <Route path='/' 
        element=
        {
          <Box>
            <Layout />
          </Box>
        } >

        </Route>
        <Route path='/Admin' element={<LayoutAdmin/>}>
          <Route path='/Admin' element={<Categories/>}/>
          <Route path='/Admin/create-categories' element={<CreateCategories/>}/>
          <Route path='/Admin/menus' element={<Menus/>}/>
          <Route path='/Admin/create-menus' element={<CreateMenus/>}/>
          <Route path='/Admin/subcategories' element={<Subcategories/>}/>
          <Route path='/Admin/create-subcategories' element={<CreateSubcategories/>}/>
          <Route path='/Admin/images' element={<Images/>}/>
          <Route path='/Admin/create-images' element={<CreateImages/>}/>
        </Route>
      </Routes>
    </MainContext.Provider>

  )
}

export default App