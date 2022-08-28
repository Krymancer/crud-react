import React from 'react';
import ModalForm from '../Modals/Modal';

import useFetch from '../../hooks/useFetch';

const DataTable = ({items, updateState, deleteItemFromState}) => {
    const deleteItem = (id) => {
        const confirmDelete = window.confirm('Deletar item para sempre?');

        if (confirmDelete) {
            const fetchInfo = async () => {
                await useFetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf/' + id, {id}, {method: 'DELETE'});
                deleteItemFromState(id);
            };
            fetchInfo();
        }
    };

    return (
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
                            <ModalForm buttonLabel="Editar" item={item} updateState={updateState} type="AddEdit"/>
                            <ModalForm buttonLabel="Deletar" item={item} updateState={updateState} deleteItem={deleteItem} type="Deletar"/>
                            <ModalForm buttonLabel="Chamada" item={item} type='Chamada'/>
                            <ModalForm buttonLabel="Historico" item={item} type='Historico'/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
