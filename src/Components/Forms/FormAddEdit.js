import React from 'react';
import InputMask from 'react-input-mask'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    nome: '',
    email: '',
    telefone: '',
    ativo: true,
    dataNascimento: ''
  }

  onChange = e => {
    // console.log(e.target.value)
    if (e.target.name === 'ativo'){
      return this.setState({[e.target.name]: e.target.checked})
    }
    return this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()

    const infos = {
      "nome": this.state.nome,
      "telefone": this.state.telefone,
      "email": this.state.email,
      "ativo": this.state.ativo,
      "dataNascimento": this.state.dataNascimento
    }

    fetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infos)
    })
      .then(response => response.json())
      .then(item => {
        this.props.addItemToState(item)
        this.props.toggle()
      })
      .catch(err => console.log(err))

  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf/' + this.state.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: this.state.nome,
        email: this.state.email,
        telefone: this.state.telefone,
        ativo: this.state.ativo,
        dataNascimento: this.state.dataNascimento
      })
    })
      .then(response => response.json())
      .then(item => {
        console.log(item)
        this.props.updateState(item)
        this.props.toggle()
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, nome, email, telefone, ativo, dataNascimento } = this.props.item
      this.setState({ id, nome, email, telefone, ativo, dataNascimento })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="nome">Nome</Label>
          <Input type="text" name="nome" id="nome" onChange={this.onChange} value={this.state.nome === null ? '' : this.state.nome} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
        </FormGroup>
        <FormGroup>
          <Label for="telefone">Telefone</Label>
          <Input tag={InputMask} mask="(99)99999-9999" type="text" name="telefone" id="telefone" onChange={this.onChange} value={this.state.telefone === null ? '' : this.state.telefone}  placeholder="ex. (00)00000-0000" />
        </FormGroup>
        <FormGroup>
          <Label for="ativo">Ativo:</Label>
          <Input type="checkbox" name="ativo" id="ativo" onChange={this.onChange} checked={this.state.ativo} />
        </FormGroup>
        <FormGroup>
          <Label for="dataNascimento">Data de nascimento</Label>
          <Input type="date" name="dataNascimento" id="dataNascimento" onChange={this.onChange} value={this.state.dataNascimento === null? '' :this.state.dataNascimento.substring(0, 10)}  />
        </FormGroup>
        <Button>Enviar</Button>
      </Form>
    );
  }
}

export default AddEditForm