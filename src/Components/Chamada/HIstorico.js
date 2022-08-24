import React, {useEffect, useState} from 'react'

const Historico = ({item, toggle}) => {

    const [info, setInfo] = useState([])

    const infos = info.map((e) => {

        const formatar = (valor) => {
            let aux = valor.split('T')
            aux[0] = aux[0].split('-').reverse().join('/')
            aux[1] = aux[1].substring(0, 7)
            return aux.join(' ')
        }

        // console.log(e)
        return (
            <tr key={e.id}>
                <td>{e.id}</td>
                <td>{formatar(e.inicioAtendimento)}</td>
                <td>{formatar(e.fimAtendimento)}</td>
                <td>{e.assunto}</td>
            </tr>
        )
    })

    useEffect(() => {
        fetch('https://api.box3.work/api/Telefone/31c46c8c-cba4-445a-8710-cdfa7432efcf/contato/' + item.id)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setInfo(data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Inicio</th>
                    <th>Fim</th>
                    <th>Assunto</th>
                </tr>
            </thead>
            <tbody>
                {infos}
            </tbody>
        </table>
    )
}

export default Historico