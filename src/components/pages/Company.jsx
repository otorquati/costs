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
import ContactCard from '../contact/ContactCard';


function Company() {
  const {id} = useParams()
  // Cria as constantes e seta seu estado 
  const [company, setCompany]=useState([])
  const [showCompanyForm, setShowCompanyForm] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
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

      function createContact() {
        setMessage('')
        // Validacão de contato
        const lastService = company.contact[company.contact.length -1]
        // Cria o id do contato com a biblioteca uuidv4 
        lastContact.id=uuidv4()
  
        fetch(`http://localhost:5000/companies/${company.id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(project),
        })
        // Transforma os dados em json
        .then((resp) => resp.json())
        .then((data) => {
            // Exibir os serviços
            setShowContactForm(false)
            setMessage('Contato atualizado')
            setType('success')          
          })
          .catch((err)=> console.log(err))
        }
  
      function removeContact(id) {
        setMessage('')
        const contactUpdated = company.contact.filter(
          (contact) => contact.id !== id
        )
      function toggleContactForm() {
        setShowContactForm(!showContactForm)
      }
    function toggleCompanyForm() {
      setShowCompanyForm(!showCompanyForm)
    }}
    
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
        {/* Adição de contatos */}
          <h2>Contatos</h2>
        <Container customClass="start">
          {contact.length > 0 && 
            contact.map((contact) => (
              <ContactCard
                id={contact.id}
                name={contact.name}
                position={contact.position}
                key={contact.id}
                handleRemove={removeContact}
                />
            ))
          }
          {/* Exibe alerta de que não há serviço cadastrado*/}
          {contact.length === 0 && <p>Não há contatos cadastrados.</p>}
        </Container>
      </Container>
    </div> ):(
      <Loading />
    )}
    </> 
   );
}
 
export default Company