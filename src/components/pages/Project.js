import React from 'react'
import { parse, v4 as uuidv4 } from 'uuid'

// Importa as Libs necessárias
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'

// Importa os componentes utlizados
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
// Importa o módulo de estilos
import styles from './Project.module.css'


function Project() {
  const {id} = useParams()
  // Cria as constantes e seta seu estado 
  const [project, setProject]=useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()

  useEffect(()=> {
    setTimeout(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    })
    // Transforma os dados em json
    .then((resp) => resp.json())
    .then((data) => {
        setProject(data)
      })
      .catch((err)=> console.log)
    }, 300)
    },[id])

    function editPost(project) {
      setMessage('')
      // budget validation
      if(project.budget < project.cost) {
        // mensagem
        setMessage('O orçamento não pode ser menor que o custo do projeto')
        setType('error')
        return(false)
      }
      fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project),
      })
      // Transforma os dados em json
      .then((resp) => resp.json())
      .then((data) => {
          setProject(data)
          setShowProjectForm(false)
          // Mensagem
          setMessage('Projeto atualizado')
          setType('success')          
        })
        .catch((err)=> console.log(err))
      }
    function createService() {
      setMessage('')
      // Validacão de serviço
      const lastService = project.services[project.services.length -1]
      // Cria o id do serviço com a biblioteca uuidv4 
      lastService.id=uuidv4()
      const lastServiceCost = lastService.cost
      const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

      // Validação do custo máximo
      if (newCost > parseFloat(project.budget)) {
        setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
        setType('error')
        project.services.pop()
        return false
      }
      // add service cost to project total cost
      project.cost = newCost
      fetch(`http://localhost:5000/projects/${project.id}`, {
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
          console.log(data)
          //setProject(data)
          //setShowProjectForm(false)
          // Mensagem
          setMessage('Serviço atualizado')
          setType('success')          
        })
        .catch((err)=> console.log(err))
      }

    function toggleProjectForm() {
      setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm() {
      setShowServiceForm(!showServiceForm)
    }
  return (
    <>
    {project.name ? (
    <div className={styles.project_details}>
      <Container customClass="column">
        {message && <Message type={type} msg={message} />}
        <div className={styles.details_container}>
          <h1>Projeto : {project.name}</h1>
          <button className={styles.btn} onClick={toggleProjectForm}>
            {!showProjectForm ? 'Editar projeto' : 'Fechar'}
          </button>
          {!showProjectForm ?(
            <div className={styles.project_info}>
              <p>
                <span>Categoria:</span> {project.category.name}
              </p>
              <p>
                <span>Total de Orçamento:</span> R$ {project.budget}
              </p>
              <p>
                <span>Total utilizado:</span> R$ {project.cost}
              </p>
            </div>
          ) : (
            <div className={styles.project_info}>
              <ProjectForm 
                handleSubmit={editPost} 
                btnText="Concluir edição"
                projectData={project}
              />
            </div>
          )}
        </div>{/* Adição de Serviços ao projeto */}
        <div className={styles.service_form_container}>
          <h2>Adicione um serviço</h2>
          <button className={styles.btn} onClick={toggleServiceForm}>
            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
          </button>
          <div className={styles.project_info}>
            {showServiceForm && <ServiceForm 
              handleSubmit={createService}
              btnText="Adicionar Serviço"
              projectData={project}
            />}
          </div>
        </div>
          <h2>Serviço</h2>
        <Container customClass="start">
          <p>Itens de Serviço</p>
        </Container>
      </Container>
    </div>):(
      <Loading />
    )}
    </> 
   );
}
 
export default Project