import { useEffect, useState } from "react";

function useFilm(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'CX807NZ-7VKMNHW-NN8QWTG-VS2BHX2'
            }
        })
            .then(res => res.json())
            .then(fetched => {
                if (fetched.docs && Array.isArray(fetched.docs)) {
                    setLoading(false)
                    setData(fetched.docs)
                } else {
                    console.error('API response does not contain an array of movies:', data);
                }
            })
            .catch(error => {
                setLoading(false)
                setError(error)
                console.error('Error fetching movies:', error);
            });
    }, [url]);

    return { data, loading, error }
}

export { useFilm }