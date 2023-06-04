import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Main, Contact, News, Login, Registration, RegistrationForEmp, Profile, CreateOrder, UpdateOrder, Orders, OrdersForEmp, Services, Admin } from './pages/index.js'
import { fetchAuthMe } from "./redux/slices/auth";
import Comments from "./pages/Comments";

function App() {

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={<Registration/> } />
        <Route path="/registration-for-employee" element={<RegistrationForEmp/> } />
        <Route path="/" element={<Main/>} />
        <Route path="/main" element={<Main/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/create-order" element={<CreateOrder/>} />
        <Route path="/update-order/:id" element={<UpdateOrder/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/orders-for-employee" element={<OrdersForEmp/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/newspaper" element={<News/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/:id/comments" element={<Comments/>} />
      </Routes>
      <br/>
      <br/>
      <br/>
      <br/>
      <Footer />
    </>
  );
}

export default App;
