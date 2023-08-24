import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.tsx'
/*wrap over chakraprovider <React.StrictMode></React.StrictMode>, */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
    <ChakraProvider>
      <App />
    </ChakraProvider>
  
)