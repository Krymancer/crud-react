import React, {useEffect, useState} from 'react'

const Historico = ({item, toggle}) => {

    const infos = (i) => {
        return (
            <>
            <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.nome}</td>
            </tr>
            </>
        )
    }

    useEffect(() => {
        fetch('https://api.box3.work/api/Telefone/31c46c8c-cba4-445a-8710-cdfa7432efcf/contato/' + item.id)
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }, [])

    return (
        <>
        <p></p>
        </>
    )
}

export default Historico