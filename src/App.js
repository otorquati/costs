import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importação dos Componentes
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Container from './components/layout/Container';


function App() {
  return (
    <Router>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/company'>Empresa</Link>
          <Link to='/contact'>Contato</Link>
          <Link to='/newproject'>Novo Projeto</Link>
        </div>
          <Container className="minheight">
            <Routes >
              <Route exact path="/" element={<Home/>}/>;
              <Route path="company" element={<Company/>}/>;
              <Route path="contact" element={<Contact/>}/>;
              <Route path="newproject" element={<NewProject/>}/>; 
            </Routes>
          </Container>
          <p>Footer</p>
    </Router>
  );
}

export default App;
