import React from 'react';

const Button = ({label, onClick, type}) => {
    switch (type) {
        case 'Editar': {
            return (
                <button
                    className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-400 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={onClick}
                >
                    {label}
                </button>
            );
        }
        case 'Cadastrar':
            return (
                <button
                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={onClick}
                >
                    {label}
                </button>
            );
        case 'Chamada':
            return (
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={onClick}
                >
                    {label}
                </button>
            );
        case 'Historico':
            return (
                <button
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2"
                    onClick={onClick}
                >
                    {label}
                </button>
            );
        case 'Deletar':
            return (
                <button
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900  "
                    onClick={onClick}
                >
                    {label}
                </button>
            );
        default: {
            return (
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={onClick}
                >
                    {label}
                </button>
            );
        }
    }
};

export default Button;
