import React from 'react'
// Importa os ícones da çib de ícones
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

// Importa o módulo de estilos do componente
import styles from './CompanyCard.module.css'

function CompanyCard(id, name, telefone, porte, handleRemove) {

  const remove =(e) =>{
    e.preventDefault()
    handleRemove(id)
  }

  return(
    <div className={styles.company_card}>
      <h4>{name}</h4>
      <p>
        <span>Telefone:</span> {telefone}
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[porte.toLowerCase()]}`}></span> {porte}
      </p>
      <div className={styles.company_card_actions}>
        <Link to={`/company/${id}`}>
        <BsPencil />Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  )
}

export default CompanyCard;