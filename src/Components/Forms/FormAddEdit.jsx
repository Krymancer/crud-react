import React, {useState} from 'react';
import InputMask from 'react-input-mask';
import Button from '../Buttons/Button';

import useFetch from '../../hooks/useFetch';

import {baseUrl, apiKey} from '../../api/constants';

const AddEditForm = ({item, updateState, addItemToState}) => {
    const [name, setName] = useState(item? item.nome : '');
    const [phone, setPhone] = useState(item? item.telefone : '');
    const [email, setEmail] = useState(item? item.email : '');
    const [active, setActive] = useState(item? item.ativo : true);
    const [birthday, setBirthday] = useState(item? item.dataNascimento : '');

    const onChange = (e) => {
        const {id, value} = e.target;
        switch (id) {
            case 'name':
                setName(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'active':
                setActive(!active);
                break;
            case 'birthday':
                setBirthday(value);
                break;
        }
    };

    const submitFormAdd = async (e) => {
        e.preventDefault();

        const infos = {
            'nome': name,
            'telefone': phone,
            'email': email,
            'ativo': active,
            'dataNascimento': birthday,
        };

        const response = await useFetch(`${baseUrl}Contato/${apiKey}`, {infos: infos}, {method: 'POST'});
        const data = await response.json();
        addItemToState(data);
    };

    const submitFormEdit = async (e) => {
        e.preventDefault();

        const infos = {
            'nome': name,
            'telefone': phone,
            'email': email,
            'ativo': active,
            'dataNascimento': birthday,
        };

        const response = await useFetch(`${baseUrl}Contato/${apiKey}/${item.id}`, {infos: infos}, {method: 'PUT'});
        const data = await response.json();
        updateState(data);
        toggle();
    };

    return (
        <form onSubmit={item ? submitFormEdit : submitFormAdd} className="flex flex-col gap-5 w-full p-5">
            <div>
                <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900'>Nome</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " id="name" type="text" name="name" onChange={onChange} value={name === null ? '' : name}></input>
            </div>
            <div>
                <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " id="email" type="email" name="email" onChange={onChange} value={email === null ? '' : email}></input>
            </div>
            <div>
                <label htmlFor="phone" className='block mb-2 text-sm font-medium text-gray-900'>Telefone</label>
                <InputMask id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "mask="(99) 99999-9999" maskChar=" " onChange={onChange} value={phone === null ? '' : phone}></InputMask>
            </div>
            <div>
                <label htmlFor="active" className='block mb-2 text-sm font-medium text-gray-900'>Ativo</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " id="active" type="checkbox" name="active" onChange={onChange} checked={active}></input>
            </div>
            <div>
                <label htmlFor="birthday" className='block mb-2 text-sm font-medium text-gray-900'>Data de nascimento</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " id="birthday" type="date" name="birthday" onChange={onChange} value={birthday === null ? '' : birthday}></input>
            </div>
            <div className="flex items-center p-6 pb-0 space-x-2 rounded-b border-t border-gray-200 justify-end">
                <Button label={'Enviar'} />
                <Button onClick={() => toggle()} label={'Cancelar'} type={'Deletar'} />
            </div>
        </form>

    );
};

export default AddEditForm;
