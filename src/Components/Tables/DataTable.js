import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Deletar item para sempre?')
    
    if(confirmDelete){
      fetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": id 
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.nome}</td>
          <td>{item.email}</td>
          <td>{item.telefone}</td>
          <td>{item.ativo? 'Ativo': 'Inativo'}</td>
          <td>{item.dataNascimento.substring(0, 10).split('-').reverse().join('/')}</td>
          <td>
            <div style={{width:"160px", paddingBottom:"5px"}}>
              <ModalForm buttonLabel="Editar" item={item} updateState={this.props.updateState} tipo="AddEdit"/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Deletar</Button>
            </div>
            <div>
              <ModalForm buttonLabel="Chamada" item={item} tipo='Chamada'/>
              {' '}          
              <ModalForm buttonLabel="Historico" item={item} tipo='Historico'/>
              {' '}          
              
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Status</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable