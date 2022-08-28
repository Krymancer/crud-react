import React, {useState} from 'react';
import AddEditForm from '../Forms/FormAddEdit';
import ChamadaForm from '../Chamada/Chamada';
import HistoricoChamada from '../Chamada/Historico';
import Button from '../Buttons/Button';

const ModalForm = ({item, updateState, addItemToState, type, buttonLabel, deleteItem}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const modalRef = React.createRef();

    const closeImage = <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>;

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
        'Deletar': 'Deletar Contato',
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
            case 'Deletar':
                return (
                    <div className='fex flex-col w-full'>
                        <div className='mb-3 text-center h-9'>Deletar Item pra sempre?</div>
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 justify-end">
                            <Button onClick={() => deleteItem(item.id)} label={'Deletar'} type={'Deletar'} />
                            <Button onClick={() => toggle()} label={'Cancelar'} />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div>
            <Button label={buttonLabel} type={buttonLabel} onClick={toggle}/>
            <dialog ref={modalRef} open={modalVisible} className="backdrop:bg-dark backdrop:opacity-80 min-w-[600px] p-0 rounded-lg">
                <div className="relative bg-white shadow">
                    <div className="flex justify-between items-start p-4 rounded-t border-b">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {titles[buttonLabel]}
                        </h3>
                        <button onClick={toggle} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
                            {closeImage}
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-6 pb-0">
                        {modalContent(type)}
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ModalForm;
