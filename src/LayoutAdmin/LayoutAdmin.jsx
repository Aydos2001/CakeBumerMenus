import { Box, Button, Flex, Input, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './LayoutAdminPages/AdminSidebar';
import AdminHeader from './LayoutAdminPages/AdminHeader';
import { MainContext } from '../store/store';
import { Outlet } from 'react-router-dom';

const LayoutAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const { state, dispatch } = useContext(MainContext);
    const ContentBorder = useColorModeValue('blackAlpha.300', 'gray.700');

    const apiUrl = 'https://api.cake-bumer.uz/api/login';

    useEffect(() => {
        if (token) {
            setLoggedIn(true);
        }
    }, [token]);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(apiUrl, {
                email,
                password,
            });

            if (response.status === 200 && response.data.data) {
                const newToken = response.data.data.token;
                localStorage.setItem('token', newToken);
                setToken(newToken);
                setLoggedIn(true);
                setMessage('Login was successful.');
            } else {
                setMessage('Incorrect username or password.');
            }
        } catch (error) {
            setMessage('An error occurred during login.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setLoggedIn(false);
    };

    if (loggedIn) {
        return (
            <Flex p="0px" h="100vh" position="relative">
                <AdminSidebar />
                <Box display="flex" flexDirection="column" gap="5px" h="100vh" w="full" position={{ base: 'absolute', sm: 'unset' }} p={{ base: '2px', sm: '5px' }}>
                    <Box display={{ base: state.openSidebar ? 'none' : 'block', md: 'none' }} position="absolute" left="0" top="0" w="full" h="100vh" zIndex={1} bg="blackAlpha.700"></Box>
                    <AdminHeader handleLogout={handleLogout}/>
                    <Box h="full" p="10px 10px" rounded={{ base: '0', sm: 'sm' }} border="1px" borderColor={ContentBorder} overflowY="auto">
                        <Outlet />
                    </Box>
                </Box>
            </Flex>
        );
    }

    return (
        <Box textAlign="center" p={{ base: 3, md: 4 }} mx="auto" display="flex" justifyContent="center" height="100vh" alignItems="center">
            <VStack spacing={3} minW={{ base: '300px', sm: '350px', md: '400px' }} border="1px" p="20px" shadow="md" rounded="md" borderColor="blue.400">
                <Text fontSize="xl">Login to Admin Panel</Text>
                <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Flex justifyContent="end" w="full">
                    <Button size="sm" colorScheme="blue" onClick={handleLogin} isLoading={isLoading}>
                        Login
                    </Button>
                </Flex>
                <Text color="red.500">{message}</Text>
            </VStack>
        </Box>
    );
};

export default LayoutAdmin;
