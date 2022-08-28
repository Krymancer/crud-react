import React, {useEffect, useState} from 'react';

const Chamada = ({item, toggle}) => {
    const [tempo, setTempo] = useState([0, 0, 0]);
    const [estadoChamada, setEstadoChamada] = useState(true);
    const [assunto, setAssunto] = useState('');
    const [idLigacao, setIdLigacao] = useState(0);

    const handleChange = (e) => {
        setAssunto(e.target.value);
    };

    const iniciarChamada = () => {
        fetch(
            'https://api.box3.work/api/Telefone/31c46c8c-cba4-445a-8710-cdfa7432efcf/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idContato: item.id,
                }),
            },
        )
            .then((resp) => resp.json())
            .then((data) => {
                setIdLigacao(data.id);
            })
            .catch((err) => console.log(err));
    };

    const encerrarChamada = () => {
        fetch(
            'https://api.box3.work/api/Telefone/31c46c8c-cba4-445a-8710-cdfa7432efcf/' + idLigacao,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    assunto: assunto,
                }),
            },
        )
            .then((resp) => resp.json())
            .then((data) => {
                toggle();
            })
            .catch((err) => console.log(err));
    };

    const encerrarContagem = () => {
        setEstadoChamada(!estadoChamada);
    };

    const telaInicio = () => {
        return (
            <>
                <p>Ligando para {item.nome}</p>
                <p>Duração: {tempo.map((t) => t.toString().padStart(2, '0')).join(':')}</p>
                <button onClick={() => encerrarContagem()}>Encerrar</button>
            </>
        );
    };

    const telaFim = () => {
        return (
            <>
                <p>Ligação encerrada com duração de{' '}{tempo.map((t) => t.toString().padStart(2, '0')).join(':')}.</p>
                <label htmlFor="assunto">Assunto: </label>
                <textarea
                    id="assunto"
                    name="assunto"
                    onChange={handleChange}
                ></textarea>
                <button onClick={encerrarChamada}>Finalizar</button>
            </>
        );
    };

    useEffect(() => {
        iniciarChamada();
    }, []);

    useEffect(() => {
        if (estadoChamada) {
            const interval = setInterval(() => {
                let hora = tempo[0];
                let minuto = tempo[1];
                let segundo = tempo[2];

                segundo += 1;

                if (segundo === 60) {
                    segundo = 0;
                    minuto += 1;
                }
                if (minuto === 60) {
                    minuto = 0;
                    hora += 1;
                }
                setTempo([hora, minuto, segundo]);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [tempo]);

    return <>{estadoChamada ? telaInicio() : telaFim()}</>;
};

export default Chamada;
