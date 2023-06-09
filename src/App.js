import {BrowserRouter as Router, Routes } from 'react-router-dom';
// Importação dos Componentes
import Home from './components/pages/Home'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'

function App() {
  return (
    <Router>
      <div>
        <link to="/">Home</link>
        <link to="/Company">Empresa</link>
        <link to="/Contact">Contatos</link>
        <link to="/NewProject">Novo Projeto</link>
      </div>
      <Routes>
        <route exact path="/" >
          <Home/>
        </route> 
        <route exact path="/company" >
          <Company/>
        </route> 
        <route exact path="/contact" >
          <Contact/>
        </route> 
        <route exact path="/newproject" >
          <NewProject/>
        </route> 
      </Routes>
      <p>Footer</p>
    </Router>
  );
}

export default App;
