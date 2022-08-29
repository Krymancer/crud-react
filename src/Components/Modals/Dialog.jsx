import React, {useEffect, useRef} from 'react';

const Dialog = ({open, confirm, cancel, title, confirmLabel, cancelLabel, children}) => {
    const dialog = useRef(null);

    useEffect(() => {
        open ? dialog.current.showModal() : dialog.current.close();
    }, [open]);

    const closeButtonImage = <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>;

    return (
        <dialog ref={dialog} className="relative p-0 backdrop:bg-gray-900 backdrop:opacity-80 rounded-lg shadow min-w-[500px]">
            {/* <!-- Modal content --> */}
            <div className="relative">
                {/* <!-- Modal header --> */}
                <div className="flex justify-between items-start p-4 rounded-t border-b">
                    <h3 className="text-xl capitalize font-semibold text-gray-900">
                        {title}
                    </h3>
                    <button onClick={cancel} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
                        {closeButtonImage}
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-6 space-y-6">
                    {children}
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200">
                    <button onClick={confirm} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{confirmLabel}</button>
                    <button onClick={cancel} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">{cancelLabel}</button>
                </div>
            </div>
        </dialog>
    );
};

export default Dialog;
