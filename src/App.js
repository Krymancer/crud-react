import React, { Component, useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
// import { CSVLink } from "react-csv"
import './App.css'

// class App extends Component {
//   state = {
//     items: []
//   }

//   getItems(){
//     fetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf/')
//       .then(response => response.json())
//       .then(items => {
//         // console.log(items) 
//         this.setState({items})})
//       .catch(err => console.log(err))
//   }

//   addItemToState = (item) => {
//     this.setState(prevState => ({
//       items: [...prevState.items, item]
//     }))
//   }

//   updateState = (item) => {
//     const itemIndex = this.state.items.findIndex(data => data.id === item.id)
//     const newArray = [
//     // destructure all items from beginning to the indexed item
//       ...this.state.items.slice(0, itemIndex),
//     // add the updated item to the array
//       item,
//     // add the rest of the items to the array from the index after the replaced item
//       ...this.state.items.slice(itemIndex + 1)
//     ]
//     this.setState({ items: newArray })
//   }

//   deleteItemFromState = (id) => {
//     const updatedItems = this.state.items.filter(item => item.id !== id)
//     this.setState({ items: updatedItems })
//   }

//   componentDidMount(){
//     this.getItems()
//   }

//   render() {
//     return (
//       <Container className="App ">
//         <Row className="header">
//           <h1 style={{margin: "20px 0"}}>Contatos</h1>
//           <ModalForm buttonLabel="Cadastrar" id="botao-cadastrar" addItemToState={this.addItemToState} tipo="AddEdit"/>
//         </Row>
//         <Row>
//           <Col>
//             <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
//           </Col>
//         </Row>
//       </Container>
//     )
//   }
// }

const App = () =>{
  const [items, setItems] = useState([])

  const getItems = () => {
    fetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf/')
      .then(response => response.json())
      .then(items => {
        console.log(items) 
        setItems(items)})
      .catch(err => console.log(err))
  }
  
  const addItemToState = (item) => {
    console.log(item)
    setItems(prevState => [...prevState, item])
  }

  const updateState = (item) => {
    setItems(prevState => prevState.map(
      (t) => 
        (t.id === item.id? (t = item) : t)
    ))
  }

  const deleteItemFromState = (id) => {
    setItems((prevState) => prevState.filter((t) => t.id !== id))
  }

  // const verificarChamada = () => {

  // }

  useEffect(() => {getItems()}, [])
  useEffect(() => {}, [])

  return (
    <Container className="App ">
      <Row className="header">
        <h1 style={{margin: "20px 0"}}>Contatos</h1>
        <ModalForm buttonLabel="Cadastrar" id="botao-cadastrar" addItemToState={addItemToState} tipo="AddEdit"/>
      </Row>
      <Row>
        <Col>
          <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
        </Col>
      </Row>
    </Container>
  )
}
export default App