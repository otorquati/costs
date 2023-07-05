import React from 'react';

// Importa as Libs necessárias
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'

// Importa os componentes utlizados
import Loading from '../layout/Loading'
import Container from '../layout/Container'
// Importa o módulo de estilos
import styles from './Project.module.css'


function Project() {
  const {id} = useParams()
  // Cria as constantes e seta seu estado 
  const [project, setProject]=useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)

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

    function toggleProjectForm() {
      setShowProjectForm(!showProjectForm)
    }

  return (
    <>
    {project.name ? (
    <div className={styles.project_details}>
      <Container customClass="column">
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
              <p>Detalhes do Projeto</p>
            </div>
          )}
        </div>
      </Container>

    </div>): (
      <Loading />
    )}
    </> 
   );
}
 
export default Project