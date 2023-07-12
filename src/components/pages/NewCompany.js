import React from 'react';
import {useNavigate} from 'react-router-dom';
import CompanyForm from '../company/CompanyForm';
import styles from './NewCompany.module.css';

function NewCompany(){
  const Navigate = useNavigate()
  function createPost(company) {
    
    fetch('http://localhost:5000/companies', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(company),
    }).then((resp)=>resp.json())
      .then((data) => {
        // console.log(data)
        // redirect
      Navigate('/companies', { state: {message: 'Empresa cadastrada com sucesso!'}})
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.newcompany_container}>
      <h1>Cadastrar Empresa</h1>
      <CompanyForm handleSubmit={createPost} btnText="Cadastrar Empresa" />
    </div>
  )
}

export default NewCompany;