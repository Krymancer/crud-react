import React, {useState} from 'react';
import InputMask from 'react-input-mask';

const AddEditForm = ({item, updateState, addItemToState}) => {
    const [name, setName] = useState(item? item.nome : '');
    const [phone, setPhone] = useState(item? item.telefone : '');
    const [email, setEmail] = useState(item? item.email : '');
    const [active, setActive] = useState(item? item.ativo : true);
    const [birthday, setBirthday] = useState(item? item.dataNascimento : '');

    const onChange = (e) => {
        const {id, value} = e.target;
        console.log(value, id, e.target );
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

    const submitFormAdd = (e) => {
        e.preventDefault();

        const infos = {
            'nome': name,
            'telefone': phone,
            'email': email,
            'ativo': active,
            'dataNascimento': birthday,
        };

        fetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(infos),
        })
            .then((response) => response.json())
            .then((item) => {
                addItemToState(item);
                toggle();
            })
            .catch((err) => console.log(err));
    };

    const submitFormEdit = (e) => {
        e.preventDefault();
        fetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf/' + item.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: name,
                email: email,
                telefone: phone,
                ativo: active,
                dataNascimento: birthday,
            }),
        })
            .then((response) => response.json())
            .then((item) => {
                console.log(item);
                updateState(item);
                toggle();
            })
            .catch((err) => console.log(err));
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
            <button className="bg-primary rounded-[6px] py-2 text-white">Enviar</button>
        </form>

    );
};

export default AddEditForm;
