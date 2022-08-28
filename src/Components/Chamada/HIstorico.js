import React, {useEffect, useState} from 'react';

import useFetch from '../../hooks/useFetch';

const Historico = ({item, toggle}) => {
    const [info, setInfo] = useState([]);

    const formatar = (valor) => {
        if (valor) {
            const aux = valor.split('T');
            aux[0] = aux[0].split('-').reverse().join('/');
            aux[1] = aux[1].substring(0, 7);
            return aux.join(' ');
        } else {
            return '-';
        }
    };

    useEffect(() => {
        const fetchInfo = async () => {
            const response = await useFetch('https://api.box3.work/api/Telefone/31c46c8c-cba4-445a-8710-cdfa7432efcf/contato/' + item.id);
            const data = await response.json();
            console.log(data);
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
                            <td className='py-3 px-6 text-center'>{formatar(e.inicioAtendimento)}</td>
                            <td className='py-3 px-6 text-center'>{formatar(e.fimAtendimento)}</td>
                            <td className='py-3 px-6 text-center'>{e.assunto}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default Historico;
