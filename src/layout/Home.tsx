import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarWithHeader from "../components/Sidebar";
import Footer from "../components/Footer";

const Home = () => {
  
  // const token = sessionStorage.getItem('token'); 
  // const navigate = useNavigate();

  // const isAuthenticated = !!token; 

  // useEffect(() => {
  //   if (!isAuthenticated) {
     
  //     navigate("/login");
  //     window.location.reload();
  //   }
  // }, [isAuthenticated, navigate]);


  return (
    <SidebarWithHeader>
      <Outlet />
      <Footer />
    </SidebarWithHeader>
  );
};

export default Home;
