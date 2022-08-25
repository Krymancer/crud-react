import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../Forms/FormAddEdit'
import ChamadaForm from '../Chamada/Chamada'
import HistoricoChamada from '../Chamada/Historico'

// class ModalForm extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       modal: false
//     }
//   }

//   toggle = () => {
//     this.setState(prevState => ({
//       modal: !prevState.modal
//     }))
//   }


//   render() {
//       const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

//       const label = this.props.buttonLabel

//       const AddEdit = () => {
//         return (
//           <AddEditForm
//               addItemToState={this.props.addItemToState}
//               updateState={this.props.updateState}
//               toggle={this.toggle}
//               item={this.props.item} />
//         )
//       }

//       const Chamada = () => {
//         return (
//           <ChamadaForm 
//             item={this.props.item}
//             toggle={this.toggle}
//             />
//         )
//       }

//       const Historico = () => {
//         return (
//           <HistoricoChamada
//             item={this.props.item}
//             toggle={this.toggle} 
//           />
//         )
//       }

//       let button = ''
//       let title = ''
//       let type = this.props.tipo

//       if(label === 'Editar'){
//         button = <Button
//                   color="warning"
//                   onClick={this.toggle}
//                   style={{float: "left", marginRight:"10px"}}>{label}
//                 </Button>
//         title = 'Editar contato'
//       } else if(label === 'Cadastrar') {
//         button = <Button
//                   color="success"
//                   onClick={this.toggle}
//                   style={{float: "left", marginRight:"10px"}}>{label}
//                 </Button>
//         title = 'Adicionar novo contato'
//       } else if(label === 'Chamada') {
//         title = 'Chamada'
//         button = <Button
//                   color="info"
//                   onClick={this.toggle}
//                   style={{float: "left", marginRight:"10px"}}>{label}
//                 </Button>
//       } else if(label === 'Historico') {
//         title = `Historico  #${this.props.item.id} ${this.props.item.nome}`
//         button = <Button
//                   color="secondary"
//                   onClick={this.toggle}
//                   style={{float: "left", marginRight:"10px"}}>{label}
//                 </Button>
//       } 


//       return (
//       <div>
//         {button}
//         <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
//           <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
//           <ModalBody>
//             {type === 'AddEdit'? AddEdit(): type === 'Chamada'? Chamada(): Historico()}
//           </ModalBody>
//         </Modal>
//       </div>
//     )
//   }
// }

const ModalForm = ({item, updateState, addItemToState, tipo, buttonLabel, className}) => {
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>

  const label = buttonLabel

  let button = ''
  let title = ''
  let type = tipo

  if(label === 'Editar'){
    button = <Button
              color="warning"
              onClick={toggle}
              style={{float: "left", marginRight:"10px"}}>{label}
            </Button>
    title = 'Editar contato'
  } else if(label === 'Cadastrar') {
    button = <Button
              color="success"
              onClick={toggle}
              style={{float: "left", marginRight:"10px"}}>{label}
            </Button>
    title = 'Adicionar novo contato'
  } else if(label === 'Chamada') {
    title = 'Chamada'
    button = <Button
              color="info"
              onClick={toggle}
              style={{float: "left", marginRight:"10px"}}>{label}
            </Button>
  } else if(label === 'Historico') {
    title = `Historico  #${item.id} ${item.nome}`
    button = <Button
              color="secondary"
              onClick={toggle}
              style={{float: "left", marginRight:"10px"}}>{label}
            </Button>
  } 

  const AddEdit = () => {
    return (
      <AddEditForm
          addItemToState={addItemToState}
          updateState={updateState}
          toggle={toggle}
          item={item} />
    )
  }

  const Chamada = () => {
    return (
      <ChamadaForm 
        item={item}
        toggle={toggle}
        />
    )
  }

  const Historico = () => {
    return (
      <HistoricoChamada
        item={item}
        toggle={toggle} 
      />
    )
  }
  
  return (
    <div>
      {button}
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
        <ModalBody>
          {type === 'AddEdit'? AddEdit(): type === 'Chamada'? Chamada(): Historico()}
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ModalForm