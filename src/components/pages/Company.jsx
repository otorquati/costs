import React from 'react'

// Importa as Libs necessárias
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'

// Importa os componentes utlizados
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import CompanyForm from '../company/CompanyForm'

// Importa o módulo de estilos
import styles from './Company.module.css'


function Company() {
  const {id} = useParams()
  // Cria as constantes e seta seu estado 
  const [company, setCompany]=useState([])
  const [showCompanyForm, setShowCompanyForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()

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
        console.log(data)
        setCompany(data)
      })
      .catch((err)=> console.log)
    }, 300)
    },[id])

    function editPost(company) {
      setMessage('')
      fetch(`http://localhost:5000/companies/${company.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(company),
      })
      // Transforma os dados em json
      .then((resp) => resp.json())
      .then((data) => {
          setCompany(data)
          setShowCompanyForm(false)
          // Mensagem
          setMessage('Empresa Atualizada')
          setType('success')          
        })
        .catch((err)=> console.log(err))
      }


    function toggleCompanyForm() {
      setShowCompanyForm(!showCompanyForm)
    }
    
  return (
    <>
    {company.name ? (
    <div className={styles.Company_details}>
      <Container customClass="column">
        {message && <Message type={type} msg={message} />}
        <div className={styles.details_container}>
          <h1>Empresa : {company.name}</h1>
          <button className={styles.btn} onClick={toggleCompanyForm}>
            {!showCompanyForm ? 'Editar Empresa' : 'Fechar'}
          </button>
          {!showCompanyForm ?(
            <div className={styles.company_info}>
              <p>
                <span>Porte:</span> {company.porte.name}
              </p>
              <p>
                <span>Telefone:</span> R$ {company.telefone}
              </p>
            </div>
          ) : (
            <div className={styles.company_info}>
              <CompanyForm 
                handleSubmit={editPost} 
                btnText="Concluir edição"
                companyData={company}
              />
            </div>
          )}
        </div>
      </Container>
    </div> ):(
      <Loading />
    )}
    </> 
   );
}
 
export default Company