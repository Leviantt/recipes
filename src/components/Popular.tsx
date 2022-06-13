import React, { useEffect, useState } from 'react';
import { Recipe } from '../Recipe';

const URL = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`

function Popular() {
    const [popular, setPopular] = useState<Recipe[]>([]);
    async function getPopular() {
        const res = await fetch(URL);
        const data = await res.json();
        setPopular(data.recipes);
    }
    useEffect(() => {
        getPopular();
    }, [])
    return (
        <div>
            {popular.map((recipe: Recipe) => {
                return <div key={recipe.id}>{recipe.title}</div>
            })}
        </div>
    )
}

export default Popular;