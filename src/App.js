//cSpell:Ignore obtem
import React, { useState } from 'react'
import './App.css'
import { ReactComponent as Robot } from '../src/images/robot.svg'
import GifCarregando from '../src/images/carregando.gif'

function App(){

  const [carregando, setCarregando] = useState(false)
  const [pessoas, setPessoas] = useState([])
  const [etnia, setEtnia] = useState('')
  const [sexo, setSexo] = useState('')

  async function obtemFoto(){
    setCarregando(true)
    let apiKey = process.env.REACT_APP_API_KEY
    const filtraEtnia = etnia.length > 0 ? `&ethnicity=${etnia}` : ''
    const filtraSexo = sexo.length > 0 ? `&gender=${sexo}` : ''
    let url = `https://api.generated.photos/api/v1/faces?api_key=${apiKey}${filtraEtnia}${filtraSexo}&order_by=random`
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      //console.log(data.faces)
      const uri = data.faces
      uri && setPessoas(data.faces)
    })
    .catch(function (error){
      console.error(`Ocorreu um erro ${error}`)
    })
    setCarregando(false)
  }

  function ListaPessoas(props) {
    const dados = props.dados
    const listagemPessoas = dados.map(pessoa =>
      <img key={pessoa.id} src={pessoa.urls[4][512]} title={pessoa.meta.age[0]}
      alt="Pessoa gerada através da IA" />
      )
      return(
      <ul>{listagemPessoas}</ul>
      )
  }

  function limparInterface() {
    setPessoas([])
    setEtnia('')
    setSexo('')
  }

  return(
    <div className="principal" >
      <h1>Gerador de Fotos com IA</h1>
      { pessoas.length > 0 
        ? <ListaPessoas dados={pessoas}/>
        : <Robot/>
      }
      { carregando && 
      <img src={GifCarregando} title="Carregando..." alt="Carregando os dados"/>
      }
      <div className='filtro'>
        <label>Etnia:</label>
          <select onChange={event => setEtnia(event.target.value)}>
          <option value="">Todas</option>
            <option value="white">Branca</option>
            <option value="latino">Latina</option>
            <option value="asian">Asiática</option>
            <option value="black">Negra</option>
          </select>

          <label>Sexo:</label>
          <select onChange={event => setSexo(event.target.value)}>
          <option value="">Todos</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>
        </div>
      <div className='areaBotoes'>
        <button type="button" onClick={obtemFoto}>
          Obter Imagens
        </button>

        { 
          pessoas.length > 0 && 
          <button type='button' onClick={limparInterface }>
            Limpar Resultados
          </button>
        }
      </div>
    </div>
  )

}

export default App