import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuperheroList from './components/SuperheroList';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
    const [name, setName] = useState('');
    const [superpower, setSuperpower] = useState('');
    const [humilityScore, setHumilityScore] = useState('');
    const [superheroes, setSuperheroes] = useState([]);

    useEffect(() => {
        fetchSuperheroes();
    }, []);

    const fetchSuperheroes = async () => {
        try {
            const response = await axios.get(API_URL);
            setSuperheroes(response.data);
        } catch (error) {
            console.error('Error fetching superheroes:', error);
        }
    };

    const addSuperhero = async () => {
        if (!name || !superpower || !humilityScore) {
            alert('Please fill in all fields.');
            return;
        }

        if (humilityScore < 1 || humilityScore > 10) {
            alert('Humility score must be between 1 and 10.');
            return;
        }

        try {
            const response = await axios.post(API_URL, {
                name,
                superpower,
                humilityScore: Number(humilityScore),
            });

            setSuperheroes([...superheroes, response.data]);
            setName('');
            setSuperpower('');
            setHumilityScore('');
        } catch (error) {
            console.error('Error adding superhero:', error);
        }
    };

    return (
        <div className="container">
            <h1>Superheroes</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Superpower"
                value={superpower}
                onChange={(e) => setSuperpower(e.target.value)}
            />
            <input
                type="number"
                placeholder="Humility Score (1-10)"
                value={humilityScore}
                onChange={(e) => setHumilityScore(e.target.value)}
            />
            <button onClick={addSuperhero}>Add Superhero</button>

            <SuperheroList superheroes={superheroes} />
        </div>
    );
}

export default App;
