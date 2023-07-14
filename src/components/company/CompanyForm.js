import React from 'react';

import {useState, useEffect} from 'react'
// Importação dos Componentes
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
//Importação dos Estilos
import styles from './CompanyForm.module.css'

function CompanyForm({ handleSubmit, btnText, companyData }){
  const [portes, setPortes] = useState([])
  const [company, setCompany] = useState(companyData || {})
  useEffect(() => {
    fetch('http://localhost:5000/portes', {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json'
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    setPortes(data)
  })
  .catch((err) => console.log(err))
  }, [])

  const submit = (e) => {
    e.preventDefault()
    //console.log(company)
    handleSubmit(company)
  }

  function handleChange(e) {
    setCompany({ ...company, [e.target.name]: e.target.value })
  }
  
  function handlePorte(e) {
    setCompany({ 
      ...company, 
      porte: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text, 
      },
      })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input 
          type="text"
          text="Razão Social"
          name="name"
          placeholder="Insira o nome da empresa"
          handleOnChange={handleChange}
          value={company.name ? company.name : ''}
        />
      <Input 
          type="text"
          text="Telefone"
          name="telefone"
          placeholder="Insira o telefone de contato"
          handleOnChange={handleChange}
          value={company.telefone ? company.telefone : ''}
        />
        <Select 
          name="porte_id" 
          text="Selecione o porte" 
          options={portes} 
          handleOnChange={handlePorte}
          value={company.porte ? company.porte.id : ''}
        />
        <SubmitButton text={btnText} />
    </form>
  )
}

export default CompanyForm;