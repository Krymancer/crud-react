import React, {useEffect, useState} from 'react';

import DataTable from './Components/Tables/DataTable';
import AddEditModal from './Components/Modals/AddEditModal';
import Button from './Components/Buttons/Button';
import useFetch from './hooks/useFetch';

import {baseUrl, apiKey} from './api/constants';

const App = () =>{
    const [items, setItems] = useState([]);
    const [addEditModal, setAddEditModal] = useState(false);

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

    useEffect(() => {
        async function fetchData() {
            const response = await useFetch(`${baseUrl}Contato/${apiKey}`);
            const data = await response.json();
            setItems(data);
        }
        fetchData();
    }, []);

    return (
        <div className="mx-auto max-w-[1320px]">
            <div className="flex justify-between flex-row my-[20px] gap-[20px] items-center">
                <div className='text-4xl font-bold uppercase'>Contatos</div>
                <div className="flex items-center">
                    <Button label={'Cadastrar'} type={'Cadastrar'} onClick={() => setAddEditModal(true)}/>
                    <AddEditModal open={addEditModal} close={() => setAddEditModal(false)} updateState={updateState} addItemToState={addItemToState}/>
                </div>
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
