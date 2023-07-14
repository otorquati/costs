import React from 'react';
import { useLocation } from 'react-router-dom';
import {useState, useEffect } from 'react'

// Importa os componentes utlizados
import Message from '../layout/Message'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
// Import o componente para apresentação dos cards das empresas
import CompanyCard from '../company/CompanyCard'

// Importa os estilos
import styles from './Companies.module.css'

function Companies(){
  // Cria um state para salvar os projetos
  const [companies,setCompanies] = useState([])
  const [removeLoading, setRemoveLoading] =useState(false)
  const [companyMessage, setCompanyMessage] = useState('')
  
  const location = useLocation()
  let message=''
  if(location.state) {
    message = location.state.message
  }
  // Faz um request para receber os dados do projeto
  useEffect(() => {
    setTimeout(() => {
  fetch('http://localhost:5000/companies', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
  })
  .then((resp) => resp.json())
  .then((data) => {
      console.log(data)
      // Seta os projetos através da API
      setCompanies(data)
      setRemoveLoading(true)
    })
    .catch((err)=> console.log(err))
  },400)
},[])

  function removeCompany(id) {
    setCompanyMessage('')
    fetch(`http://localhost:5000/companies/${id}`, {
      method:'DELETE',
      headers: {
        'Content-Type':'application/json'
      },
    }).then(resp=>resp.json())
    .then((data)=>{
      setCompanies(companies.filter((company)=> company.id !== id))
      // mensagem de remoção do projeto
      setCompanyMessage('Empresa removida com sucesso!')
    })
    .catch(err=>console.log(err))
  }
  
  return (
    <div className={styles.company_container}>
      <div className={styles.title_container}>
        <h1 >Empresas Cadastradas</h1>
        <LinkButton to="/newcompany" text="Cadastrar Empresa"/>
      </div>
      {message && <Message type="success"  msg={message} />}
      {companyMessage && <Message type="success"  msg={companyMessage} />}
      <Container customClass="start">
        {companies.length >0 &&
        companies.map((company)=>(
          <CompanyCard 
          id={company.id}
          name={company.name}
          telefone={company.telefone}
          porte={company.porte.name}
          key = {company.id}
          handleRemove={removeCompany} />
        ))}
        {!removeLoading && <Loading />}
        {removeLoading && companies.length === 0 && (
          <p>Não ha empresas cadastrados</p>)}
      </Container>
  </div>
  )
}

export default Companies;