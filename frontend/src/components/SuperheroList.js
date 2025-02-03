import React from 'react';

const SuperheroList = ({ superheroes }) => {
    return (
        <div>
            <h2>Superhero List</h2>
            <ul>
                {superheroes.length === 0 ? (
                    <p>No superheroes added yet.</p>
                ) : (
                    superheroes
                        .sort((a, b) => b.humilityScore - a.humilityScore)
                        .map((hero) => (
                            <li key={hero.id}>
                                <strong>{hero.name}</strong> - {hero.superpower} (Humility: {hero.humilityScore})
                            </li>
                        ))
                )}
            </ul>
        </div>
    );
};

export default SuperheroList;
