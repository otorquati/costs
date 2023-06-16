import {useState, useEffect} from 'react'
// Importação dos Componentes
import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'
//Importação dos Estilos
import styles from './ProjectForm.module.css'

function ProjectForm({btnText}){
  const [categories, setCategories] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/categories', {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json'
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    setCategories(data)
  })
  .catch((err) => console.log(err))
  }, [])

  return (
    <form className={styles.form} action="">
      <Input 
          type="text"
          text="Nome do projeto"
          name="name"
          placeholder="Insira o nome do projeto"
        />
      <Input 
          type="number"
          text="Orçamento do projeto"
          name="budget"
          placeholder="Insira o orçamento total"
        />
        <Select 
          name="category_id" 
          text="Selecione a categoria" 
          options={categories} 
        />
        <Submit text={btnText} />
    </form>
  )
}

export default ProjectForm