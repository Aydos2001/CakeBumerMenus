import React, { useReducer } from 'react'
import Layout from './Layout/Layout'
import { MainContext } from './store/store'
import { initialState, reduser } from './store/reduser'
import { Box, useColorModeValue } from '@chakra-ui/react'

const App = () => {
  const [state, dispatch] = useReducer(reduser, initialState)
  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <Box bg={useColorModeValue("gray.100", "gray.800")}>
        <Layout/>
      </Box>
    </MainContext.Provider>

  )
}

export default App