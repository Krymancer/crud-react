import React from 'react';

import Dialog from './Dialog';

const DeleteModal = ({open, close, deleteItem}) => {
    return (
        <div className="mx-auto max-w-[1320px]">
            <Dialog open={open} confirm={deleteItem} cancel={close} title="Deletar" confirmLabel={'Ok'} cancelLabel="Fechar">
                <div className="flex flex-col space-y-4">
                    <div className='fex flex-col w-full'>
                        <div className='mb-3 text-center h-9'>Deletar Item pra sempre?</div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default DeleteModal;
