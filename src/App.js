import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importação dos Componentes
import Home from './components/pages/Home'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'
import Container from './components/layout/Container'
function App() {
  return (
    <Router>
      <Routes>
      <Container customClass="min-height">
        <Route exact path="/" element={<Home/>}/>;
        <Route path="/company" element={<Company/>}/>;
        <Route path="/contact" element={<Contact/>}/>;
        <Route path="/newproject" element={<NewProject/>}/>; 
      </Container>
      <p>Footer</p>
      </Routes>
    </Router>
  );
}

export default App;
