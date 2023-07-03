import React from 'react';

// Importa as Libs necessárias
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'

// Importa o módulo de estilos
import styles from './Project.module.css'


function Project() {
  const {id} = useParams()
  // Cria as constantes e seta seu estado 
  const [project, setProject]=useState([])
  useEffect(()=> {
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
    },[id])

  return ( 
    <p>{project.name}</p>
   );
}
 
export default Project