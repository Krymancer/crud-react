import React, {useEffect, useState} from 'react';

import useFetch from '../../hooks/useFetch';

import {baseUrl, apiKey} from '../../api/constants';

const Historico = ({item, toggle}) => {
    const [info, setInfo] = useState([]);

    const toDate = (dateString) => {
        return new Date(dateString).toLocaleString('pt-BR', {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'});
    };

    useEffect(() => {
        const fetchInfo = async () => {
            const response = await useFetch(`${baseUrl}Telefone/${apiKey}/contato/${item.id}`);
            const data = await response.json();
            setInfo(data);
        };

        fetchInfo();
    }, []);

    return (
        <table>
            <thead className='uppercase'>
                <tr>
                    <th className='py-3 px-6'>Inicio</th>
                    <th className='py-3 px-6'>Fim</th>
                    <th className='py-3 px-6'>Assunto</th>
                </tr>
            </thead>
            <tbody className="bg-white border-b ">
                {
                    info.map((e) => (
                        <tr key={e.id} className="bg-white border-b">
                            <td className='py-3 px-6 text-center'>{toDate(e.inicioAtendimento)}</td>
                            <td className='py-3 px-6 text-center'>{toDate(e.fimAtendimento)}</td>
                            <td className='py-3 px-6 text-center'>{e.assunto}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default Historico;
