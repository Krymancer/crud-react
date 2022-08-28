import React, {useEffect, useState} from 'react';

import ModalForm from './Components/Modals/Modal';
import DataTable from './Components/Tables/DataTable';

import useFetch from './hooks/useFetch';

const App = () =>{
    const [items, setItems] = useState([]);

    const addItemToState = (item) => {
        setItems((prevState) => [...prevState, item]);
    };

    const updateState = (item) => {
        setItems((prevState) => prevState.map(
            (t) =>
                (t.id === item.id? (t = item) : t),
        ));
    };

    const deleteItemFromState = (id) => {
        setItems((prevState) => prevState.filter((t) => t.id !== id));
    };

    useEffect(async () => {
        const response = await useFetch('https://api.box3.work/api/Contato/31c46c8c-cba4-445a-8710-cdfa7432efcf/');
        const data = await response.json();
        setItems(data);
    }, []);

    return (
        <div className="mx-auto max-w-[1320px]">
            <div className="flex justify-between flex-row my-[20px] gap-[20px]">
                <div className='text-4xl font-bold'>Contatos</div>
                <ModalForm buttonLabel="Cadastrar" id="botao-cadastrar" addItemToState={addItemToState} type="AddEdit"/>
            </div>
            <div>
                <div>
                    <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
                </div>
            </div>
        </div>
    );
};
export default App;
