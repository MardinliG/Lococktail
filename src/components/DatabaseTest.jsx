import { useState, useEffect } from 'react';

function TestDB() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/test')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            {data ? <p>Connexion réussie!</p> : <p>Chargement...</p>}
        </div>
    );
}

export default TestDB;