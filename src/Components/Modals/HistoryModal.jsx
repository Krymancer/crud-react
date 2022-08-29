import React, {useState, useEffect} from 'react';

import Dialog from './Dialog';

import useFetch from '../../hooks/useFetch';
import {baseUrl, apiKey} from '../../api/constants';

const HistoryModal = ({open, item, close}) => {
    if (item.id === undefined) return null;
    const [info, setInfo] = useState([]);

    const toDate = (dateString) => {
        return new Date(dateString).toLocaleString('pt-BR', {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'});
    };

    useEffect(() => {
        async function fetchData() {
            const response = await useFetch(`${baseUrl}Telefone/${apiKey}/contato/${item.id}`);
            const data = await response.json();
            console.log('dAta', data);
            setInfo(data);
        }

        fetchData();
    }, []);

    return (
        <div className="mx-auto max-w-[1320px]">
            <Dialog open={open} confirm={close} cancel={close} title="Historico de Chamadas" confirmLabel={'Ok'} cancelLabel="Fechar">
                <div className="flex flex-col space-y-4">
                    <table className='overflow-y-auto'>
                        <thead className='uppercase'>
                            <tr>
                                <th className='py-3 px-6'>Inicio</th>
                                <th className='py-3 px-6'>Fim</th>
                                <th className='py-3 px-6'>Assunto</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white border-b ">
                            {
                                item.id ? (info.map((e) => (
                                    <tr key={e.id} className="bg-white border-b">
                                        <td className='py-3 px-6 text-center'>{toDate(e.inicioAtendimento)}</td>
                                        <td className='py-3 px-6 text-center'>{toDate(e.fimAtendimento)}</td>
                                        <td className='py-3 px-6 text-center'>{e.assunto}</td>
                                    </tr>
                                ))) : null
                            }
                        </tbody>
                    </table>
                </div>
            </Dialog>
        </div>
    );
};

export default HistoryModal;
