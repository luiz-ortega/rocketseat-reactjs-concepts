import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    const response = await api.get('/repositories')

    setRepositories([...response.data])
  }

  async function handleAddRepository() {
    try {
      const response = await api.post(`/repositories`, {
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],
      })
  
      setRepositories([...repositories, response.data])
    } catch(err) {
      console.log(err)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`)

      const newRepositorie = repositories
      const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id )
      
      newRepositorie.splice(repositorieIndex, 1)

      setRepositories([...newRepositorie])
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (     
            <li key={repositorie.id}>
              {repositorie.title}
              <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
              </button>
            </li>  
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
