import { useState, useEffect } from 'react';
import { api } from '../services/api';

const useApi = ({ url, payload }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        api.get(url, payload)
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [payload, url]);

    return { response, error, loading };
};

export default useApi;