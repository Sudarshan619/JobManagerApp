import React, { useState } from 'react';
import DnsForm from './components/dnsForms';
import SignUp from './components/signup';
import Navbar from './components/navbar';
import Home from './components/home';
import Table from './components/table';
import CompanyState from './context/companystate';
import SubCompany from './components/subCompany';
import Website from './components/website';
import ShowWebsite from './components/showWebsite';

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import './style.css';
const App = () => {

  return (
    <CompanyState>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/show" element={<Table />} />
          <Route path="/websiteAdd" element={<Website />} />
          <Route path="/website" element={<SubCompany />} />
          <Route path="/" element={<Home />} />
          <Route path="/showWebsite" element={<ShowWebsite />} />
          <Route path="/dns" element={<DnsForm />}>
          </Route>
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>

      </Router>
      </CompanyState>
  );
};

export default App;
