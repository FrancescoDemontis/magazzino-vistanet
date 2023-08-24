import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
//import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loginData, setLoginData] = useState({
    
    email: '',
    password: '',
  });
  

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', loginData.email);
    formData.append('password', loginData.password);
  
    let url = 'https://magazzino-api.v-net.it/api/login';
  
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
     .then((res) => {
    if (res.status === 401) {
        alert('Credenziali errate');
    } else if (!res.ok) {
        // Gestione di altri errori
    } else {
        return res.json();
    }
})

.then((data) => {
  if (data) {
      setToken(data.token); // Assegna il token qui
      sessionStorage.setItem('token', data.token);
      setIsLoading(true);
      navigate('/');
  } else {
      setIsLoading(false);
  }
})

      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  fetch('https://magazzino-api.v-net.it/api/admin', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });


  return (
    
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} align={'center'}>
            Benvenuto nel gestionale
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Effettua il login per visualizzare il tuo account
          </Text>
        </Stack>
        <form onSubmit={handleLogin}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl isRequired mb="10px">
                <FormLabel>Email:</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired mb="10px">
                <FormLabel>Password:</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </FormControl>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              ></Stack>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  isDisabled={isLoading}
                  bg={isLoading ? 'black' : 'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Accedi
                </Button>
              </Stack>
            </Stack>
            <Link to="/registrazione" >
            Registrati
          </Link>
          </Box>
         
        </form>
      </Stack>
      {/* <SidebarWithHeader isLoggedIn={true} userEmail={loginData.email} /> */}
    </Flex>
  );
};

export default Login;
