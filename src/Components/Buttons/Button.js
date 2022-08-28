import React from 'react';

const Button = ({label, onClick, type}) => {
    switch (type) {
        case 'Editar': {
            return (
                <button
                    className="rounded-[6px] py-[6px] px-[12px] float-right mr-[10px] bg-warning text-dark"
                    onClick={onClick}
                >
                    {label}
                </button>
            );
        }
        case 'Cadastrar':
            return (
                <button
                    className="rounded-[6px] py-[6px] px-[12px] float-right mr-[10px] bg-success text-white"
                    onClick={onClick}
                >
                    {label}
                </button>
            );
        case 'Chamada':
            return (
                <button
                    className="rounded-[6px] py-[6px] px-[12px] float-right mr-[10px] bg-info text-dark"
                    onClick={onClick}
                >
                    {label}
                </button>
            );
        case 'Historico':
            return (
                <button
                    className="rounded-[6px] py-[6px] px-[12px] float-right mr-[10px] bg-secondary text-white"
                    onClick={onClick}
                >
                    {label}
                </button>
            );
        default: {
            return (
                <button
                    className="rounded-[6px] py-[6px] px-[12px] float-right mr-[10px] bg-warning text-dark"
                    onClick={onClick}
                >
                    {label}
                </button>
            );
        }
    }
};

export default Button;
