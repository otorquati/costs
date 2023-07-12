import React from 'react';
import {useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

// Importa os estilos
import styles from './Companies.module.css'

// Importa os componentes utlizados
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import LinkButton from '../layout/LinkButton'
import { FaRegMoneyBillAlt } from 'react-icons/fa';
// Import o componente para apresentação dos cards das empresas
import CompanyCard from '../company/CompanyCard'

function Companies(){
  // Cria um state para salvar os projetos
  const [company,setCompany] = useState([])
  const [porte,setPorte] = useState([])
  const [removeLoading, setRemoveLoading] =useState(false)
  const [showCompanyForm, setShowCompanyForm] =useState(false)
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
      setCompany(data)
      setPorte(data.porte)
      setRemoveLoading(true)
    })
    .catch((err)=> console.log(err))
  },400)
},[])

  function editPost(company) {
    // Obtem os dados do banco de dados Company
    useEffect(()=> {
      setTimeout(() => {
      fetch(`http://localhost:5000/companies/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
      })
      // Transforma os dados em json
      .then((resp) => resp.json())
      .then((data) => {
          setCompany(data)
          setPorte(data.porte)
        })
        .catch((err)=> console.log)
      }, 300)
      },[id]) 
  }

  function toggleCompanyForm() {
    setShowCompanyForm(!showCompanyForm)
  }

  function removeCompany(id) {
    setProjectMessage('')
    fetch(`http://localhost:5000/companies/${id}`, {
      method:'DELETE',
      headers: {
        'Content-Type':'application/json'
      },
    }).then(resp=>resp.json())
    .then((data)=>{
      setProjects(companies.filter((company)=> company.id !== id))
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
      {company.length >0 &&
      company.map((company)=>(
        <CompanyCard 
        id={company.id}
        name={company.name}
        porte={company.porte.name}
        key = {company.id}
        handleRemove={removeCompany} />
      ))}
      {!removeLoading && <Loading />}
      {removeLoading && company.length === 0 && (
        <p>Não ha empresas cadastrados</p>)}
    </Container>
  </div>
  )
}

export default Companies;