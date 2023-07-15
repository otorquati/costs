import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importação dos Componentes
import Home from './components/pages/Home';
import Companies from './components/pages/Companies';
import Projects from './components/pages/Projects';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import NewCompany from './components/pages/NewCompany';
import Project from './components/pages/Project';
import Company from './components/pages/Company';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Router>
      <Navbar/>
           <Container customClass="min_height">
            <Routes >
              <Route exact path="/" element={<Home/>}/>;
              <Route path="/companies" element={<Companies/>}/>;
              <Route path="/newcompany" element={<NewCompany/>}/>; 
              <Route path="/projects" element={<Projects/>}/>;
              <Route path="/contact" element={<Contact/>}/>;
              <Route path="/newproject" element={<NewProject/>}/>; 
              <Route path="/project/:id" element={<Project/>}/>;
              <Route path="/company/:id" element={<Company/>}/>;
            </Routes>
          </Container>
          <Footer/>
    </Router>
  );
}

export default App
