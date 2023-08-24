
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Home from './layout/Home.tsx';
import Login from './pages/Login.tsx';
import TableContainerDate from './layout/Dashboard.tsx';
import LargeWithNewsletter from './components/Footer.tsx';

import Articoli from './pages/Articoli.tsx';
import Promemoria from './pages/Promemoria.tsx';
import Analisi from './pages/Analisi.tsx';
import Settings from './pages/Settings.tsx';
import Status from './pages/Status.tsx';
import Register from './pages/Register.tsx';
import ArticoliList from './pages/ArticoliList.tsx';
import ArticleShow from './pages/ArticleShow.tsx';
import Richieste from './pages/Richieste.tsx';
import ProductRequest from './pages/ProductRequest.tsx';
import OrderHistory from './pages/OderHistory.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
    <Route path='/' element={<Home />} isPrivate>
        <Route index element={<TableContainerDate />} />
        <Route path='/dashboard' element={<TableContainerDate />} />
        <Route path='/articoli' element={<Articoli />} />
        <Route path='/promemoria' element={<Promemoria />} />
        <Route path='/analisi' element={<Analisi />} />
        <Route path='/settings/:id' element={<Settings />} />
        <Route path='/status' element={<Status />} />
        <Route path='/product/request' element={<ProductRequest />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path='/registrazione' element={<Register />} />
        <Route path='/accept/article/request/:request_Id' element={<Richieste />} />
        <Route path='/article/detail/:article_id' element={<ArticleShow />} />
        <Route path='/articolilista' element={<ArticoliList />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
