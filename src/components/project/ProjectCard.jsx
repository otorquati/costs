import React from 'react'
// Importa os ícones da lib de ícones
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

// Importa o módulo de estilos do componente
import styles from './ProjectCards.module.css'

// Define as props a serem manipuladas pelo componente
function ProjectCard({id, name, budget, category, handleRemove}){
  const remove =(e) =>{
    e.preventDefault()
    handleRemove(id)
  }
  return(
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R${budget}
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`}>
        <BsPencil />Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  )
}

export default ProjectCard;
