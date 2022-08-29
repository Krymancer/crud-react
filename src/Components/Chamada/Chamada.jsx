import React, {useEffect, useState} from 'react';

import Button from '../Buttons/Button';

import useFetch from '../../hooks/useFetch';

import {baseUrl, apiKey} from '../../api/constants';

const Chamada = ({item, toggle, modalOpen}) => {
    const [tempo, setTempo] = useState(0);
    const [callStatus, setCallStatus] = useState(false);
    const [assunto, setAssunto] = useState('');
    const [idLigacao, setIdLigacao] = useState(0);

    const handleChange = (e) => {
        setAssunto(e.target.value);
    };

    const startCall = async () => {
        const response = await useFetch(`${baseUrl}Telefone/${apiKey}/`, {idContato: item.id}, {method: 'POST'});
        const data = await response.json();
        setIdLigacao(data.id);
        setCallStatus(true);
    };

    const endCall = async () => {
        await useFetch(`${baseUrl}Telefone/${apiKey}/${idLigacao}`, {assunto: assunto}, {method: 'PUT'});
        toggle();
    };

    const endTimer = () => {
        setCallStatus(!callStatus);
    };

    const showTime = (timeInSeconds) => {
        // Show time in HH:MM:SS format
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
        let seconds = timeInSeconds - (hours * 3600) - (minutes * 60);

        // round seconds
        seconds = Math.round(seconds * 100) / 100;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const telaInicio = () => {
        return (
            <>
                <p>Ligando para <b>{item.nome}</b></p>
                <p>Duração: {showTime(tempo)}</p>
                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 justify-end">
                    <Button onClick={endTimer} label={'Encerrar Chamada'} />
                </div>
            </>
        );
    };

    const telaFim = () => {
        return (
            <>
                <p>Ligação encerrada com duração de{' '}{showTime(tempo)}.</p>
                <label htmlFor="assunto">Assunto: </label>
                <textarea
                    id="assunto"
                    name="assunto"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                </textarea>
                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 justify-end">
                    <Button onClick={endCall} label={'Encerrar Chamada'} />
                </div>

            </>
        );
    };

    useEffect(() => {
        console.log('Chamada render', modalOpen);
        if (modalOpen) {
            console.log('Chamada start');
            startCall();
        }
    }, [modalOpen]);

    useEffect(() => {
        if (callStatus) {
            const interval = setInterval(() => {
                setTempo(tempo+1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [tempo]);

    return <>{callStatus ? telaInicio() : telaFim()}</>;
};

export default Chamada;
