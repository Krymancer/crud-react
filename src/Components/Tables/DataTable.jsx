import React, {useState} from 'react';

import CallModal from '../Modals/CallModal';
import HistoryModal from '../Modals/HistoryModal';
import DeleteModal from '../Modals/DeleteModal';
import AddEditModal from '../Modals/AddEditModal';

import useFetch from '../../hooks/useFetch';

import {baseUrl, apiKey} from '../../api/constants';
import Button from '../Buttons/Button';

const DataTable = ({items, updateState, deleteItemFromState}) => {
    const [callModal, setCallModal] = useState(false);
    const [historyModal, setHistoryModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addEditModal, setAddEditModal] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    const openCallModal = (item) => {
        setCurrentItem(item);
        setCallModal(true);
    };

    const openHistoryModal = (item) => {
        setCurrentItem(item);
        setHistoryModal(true);
    };

    const openDeleteModal = (item) => {
        setCurrentItem(item);
        setDeleteModal(true);
    };

    const openAddEditModal = (item) => {
        setCurrentItem(item);
        setAddEditModal(true);
    };


    const deleteItem = (id) => {
        const confirmDelete = window.confirm('Deletar item para sempre?');

        if (confirmDelete) {
            const fetchInfo = async () => {
                await useFetch(`${baseUrl}Contato/${apiKey}/${id}`, {id}, {method: 'DELETE'});
                deleteItemFromState(id);
            };
            fetchInfo();
            setDeleteModal(false);
        }
    };

    return (
        <div>
            <table className='w-full text-sm text-left text-gray-500 border-4'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                    <tr className='text-left'>
                        <th scope="col" className='py-3 px-6'>ID</th>
                        <th scope="col" className='py-3 px-6'>Nome</th>
                        <th scope="col" className='py-3 px-6'>Email</th>
                        <th scope="col" className='py-3 px-6'>Telefone</th>
                        <th scope="col" className='py-3 px-6'>Status</th>
                        <th scope="col" className='py-3 px-6'>Data de Nascimento</th>
                        <th scope="col" className='py-3 px-6'>Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-white border-b">
                    {items.map((item) => (
                        <tr key={item.id} className="bg-white border-b">
                            <th scope="row" className='py-4 px-6 font-bold text-gray-900 whitespace-nowrap'>{item.id}</th>
                            <td className='py-3 px-6'>{item.nome}</td>
                            <td className='py-3 px-6'>{item.email}</td>
                            <td className='py-3 px-6'>{item.telefone}</td>
                            <td className='py-3 px-6'>{item.ativo? 'Ativo': 'Inativo'}</td>
                            <td className='py-3 px-6'>{item.dataNascimento.substring(0, 10).split('-').reverse().join('/')}</td>
                            <td className='py-3 px-6 flex'>
                                <Button label={'Editar'} type={'Editar'} onClick={() => openAddEditModal(item)}/>
                                <Button label={'Deletar'} type={'Deletar'} onClick={() => openDeleteModal(item)}/>
                                <Button label={'Chamada'} type={'Chamada'} onClick={() => openCallModal(item)}/>
                                <Button label={'Historico'} type={'Historico'} onClick={() => openHistoryModal(item)}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddEditModal open={addEditModal} close={() => setAddEditModal(false)} item={currentItem} updateState={updateState}/>
            <DeleteModal open={deleteModal} close={() => setDeleteModal(false)} item={currentItem} deleteItem={deleteItem}/>
            <HistoryModal item={currentItem} close={() => setHistoryModal(false)} open={historyModal}/>
            <CallModal item={currentItem} close={() => setCallModal(false)} open={callModal}/>
        </div>
    );
};

export default DataTable;
