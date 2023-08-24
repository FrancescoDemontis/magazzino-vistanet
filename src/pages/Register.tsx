import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    cognome: '',
    email: '',
    password: '',
    // confirmPassword: '',
  });

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistrationSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // Salva i dati di registrazione nel localStorage
    localStorage.setItem('name', formData.name);
    localStorage.setItem('email', formData.email);

    // Ora puoi inviare i dati di registrazione al backend per la registrazione effettiva
    const dataValue = new FormData();
    dataValue.append('name', formData.name);
    dataValue.append('cognome', formData.cognome);
    dataValue.append('email', formData.email);
    dataValue.append('password', formData.password);

    fetch('https://magazzino-api.v-net.it/api/registrazione', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: dataValue,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('Registrazione completata con successo!');
        navigate('/'); // Reindirizza l'utente alla pagina principale dopo la registrazione
      })
      
      .catch((error) => {
        console.error('Errore durante la registrazione:', error);
        alert('Si è verificato un errore durante la registrazione. Riprova più tardi.');
      });
  };

  return (
    <VStack spacing={4} maxW="400px" m="auto">
      <h2>Registrazione</h2>
      <form onSubmit={handleRegistrationSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Nome:</FormLabel>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="cognome">Cognome:</FormLabel>
          <Input
            type="text"
            id="cognome"
            name="cognome"
            value={formData.cognome}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button type="submit" m={5} colorScheme="teal">
          Registrati
        </Button>
      </form>
    </VStack>
  );
};

export default RegistrationPage;
