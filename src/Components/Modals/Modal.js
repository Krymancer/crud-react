import React, {useState} from 'react';
import AddEditForm from '../Forms/FormAddEdit';
import ChamadaForm from '../Chamada/Chamada';
import HistoricoChamada from '../Chamada/Historico';
import Button from '../Buttons/Button';

const ModalForm = ({item, updateState, addItemToState, type, buttonLabel}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const modalRef = React.createRef();

    const toggle = () => {
        if (modalVisible) {
            modalRef.current.close();
            setModalVisible(false);
        } else {
            modalRef.current.showModal();
            setModalVisible(true);
        }
    };

    const titles = {
        'Editar': 'Editar Contato',
        'Cadastrar': 'Cadastrar Contato',
        'Chamada': 'Chamada',
        'Historico': 'Histórico',
    };

    const modalContent = (type) => {
        switch (type) {
            case 'AddEdit':
                return <AddEditForm item={item} updateState={updateState} />;
            case 'Chamada':
                return <ChamadaForm item={item} toggle={toggle} />;
            case 'Historico':
                return <HistoricoChamada item={item} toggle={toggle} />;
            case 'Cadastrar':
                return <AddEditForm addItemToState={addItemToState} />;
        }
    };

    return (
        <div>
            <Button label={buttonLabel} type={buttonLabel} onClick={toggle}/>
            <dialog ref={modalRef} open={modalVisible} className="backdrop:bg-dark backdrop:opacity-80 min-w-[600px]">
                <div className="w-full flex justify-between text-xl mb-4">
                    <div className='font-bold'>{titles[buttonLabel]}</div>
                    <button className="close" onClick={toggle}>&times;</button>
                </div>
                {modalContent(type)}
            </dialog>
        </div>
    );
};

export default ModalForm;
