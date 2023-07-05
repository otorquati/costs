import React from 'react';
import {useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react';

// Importa os componentes de layout
import Message from '../layout/Message'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
// Import o componente para apresentação dos cards dos projetoss
import ProjectCard from '../project/ProjectCard'

// Importa os estilos CSS
import styles from './Projects.module.css'

function Projects() {

  // Cria um state para salvar os projetos
  const [projects,setProjects] = useState([])
  const [removeLoading, setRemoveLoading] =useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation()
  let message=''
  if(location.state) {
    message = location.state.message
  }
  // Faz um request para receber os dados do projeto
  useEffect(() => {
    setTimeout(() => {
  fetch('http://localhost:5000/projects', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
  })
  .then((resp) => resp.json())
  .then((data) => {
      console.log(data)
      // Seta os projetos através da API
      setProjects(data)
      setRemoveLoading(true)
    })
    .catch((err)=> console.log(err))
  },400)
},[])

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method:'DELETE',
      headers: {
        'Content-Type':'application/json'
      },
    }).then(resp=>resp.json())
    .then((data)=>{
      setProjects(projects.filter((project)=> project.id !== id))
      // mensagem de remoção do projeto
      setProjectMessage('Projeto removido com sucesso!')
    })
    .catch(err=>console.log(err))
  }
  return (
  <div className={styles.project_container}>
    <div className={styles.title_container}>
      <h1 >Meus Projetos</h1>
      <LinkButton to="/newproject" text="Criar Projeto"/>
    </div>
    {message && <Message type="success"  msg={message} />}
    {projectMessage && <Message type="success"  msg={projectMessage} />}
    <Container customClass="start">
      {projects.length >0 &&
      projects.map((project)=>(
        <ProjectCard 
        id={project.id}
        name={project.name}
        budget={project.budget}
        category={project.category.name}
        key = {project.id}
        handleRemove={removeProject} />
      ))}
      {!removeLoading && <Loading />}
      {removeLoading && projects.length === 0 && (
        <p>Não ha projetos cadastrados</p>)}
    </Container>
  </div>
  )
}

export default Projects;