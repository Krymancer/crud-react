import React, {useState, useEffect} from 'react';

import Dialog from './Dialog';

import useFetch from '../../hooks/useFetch';
import {baseUrl, apiKey} from '../../api/constants';

const CallModal = ({open, item, close}) => {
    const [id, setId] = useState(null);
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState(false);
    const [subject, setSubject] = useState('');

    useEffect(() => {
        if (open && !status) {
            startCall();
        }
    }, [open]);

    useEffect(() => {
        if (status) {
            const interval = setInterval(() => {
                setTime(time+1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [time]);

    const timeToString = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
        let seconds = timeInSeconds - (hours * 3600) - (minutes * 60);
        seconds = Math.round(seconds * 100) / 100;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const startCall = async () => {
        const response = await useFetch(`${baseUrl}Telefone/${apiKey}/`, {idContato: item.id}, {method: 'POST'});
        const data = await response.json();
        setId(data.id);
        setStatus(true);
    };

    const endCall = async () => {
        await useFetch(`${baseUrl}Telefone/${apiKey}/${id}`, {assunto: subject}, {method: 'PUT'});
        setStatus(false);
    };

    return (
        <div className="mx-auto max-w-[1320px]">
            <Dialog open={open} confirm={status ? endCall : close} cancel={close} title="Chamada em Andamento" confirmLabel={status ? 'Encerrar' : 'Confirmar'} cancelLabel="Minimizar">
                <div className="flex flex-col space-y-4">
                    {
                        status ? (
                            <div>
                                <p>Ligando para <b>{item.nome}</b></p>
                                <p>Duração: {timeToString(time)}</p>
                            </div>
                        ) : (
                            <div>
                                <p>Ligação encerrada com duração de{' '}{timeToString(time)}.</p>
                                <label htmlFor="assunto">Assunto: </label>
                                <textarea
                                    id="assunto"
                                    name="assunto"
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                </textarea>
                            </div>
                        )
                    }
                </div>
            </Dialog>
        </div>
    );
};

export default CallModal;
