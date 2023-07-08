import React from 'react';

// Importa as Libs necessárias
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'

// Importa os componentes utlizados
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
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
        .catch((err)=> console.log)
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
        </div>
        <div className={styles.service_form_container}>
          <h2>Adicione um serviço</h2>
          <button className={styles.btn} onClick={toggleServiceForm}>
            {!showProjectForm ? 'Adicionar serviço' : 'Fechar'}
          </button>
          <div className={styles.project_info}>
            {showServiceForm && <div>formulário de serviço</div>}
          <h2>Serviço</h2>
          </div>
          <Container customClass="start"></Container>
        </div>
      </Container>

    </div>): (
      <Loading />
    )}
    </> 
   );
}
 
export default Project