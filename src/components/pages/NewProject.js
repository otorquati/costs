import React from 'react';
import {useNavigate} from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject(){
  const Navigate = useNavigate()
  function createPost(project) {
    
    // intialize cost and services
    project.cost=0
    project.services = []
    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(project),
    }).then((resp)=>resp.json())
      .then((data) => {
        // console.log(data)
        // redirect
      Navigate('/projects', {message: 'Projeto criado com sucesso!'})
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  )
}

export default NewProject;