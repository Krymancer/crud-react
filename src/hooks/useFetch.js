const useFetch = async (url, parameters = {}, options = {method: 'GET'}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const init = {
        method: options.method,
        headers,
    };

    if (options.method === 'POST' || options.method === 'PUT' || options.method === 'DELETE') {
        init.body = JSON.stringify(parameters);
    }

    return await fetch(url, init);
};

export default useFetch;
