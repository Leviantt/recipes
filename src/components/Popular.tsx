import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { GrRefresh } from 'react-icons/gr';
import { Recipe } from '../Recipe';
import HomeCard from './HomeCard';



const baseURL = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}`;
const KEY_POPULAR = 'local-popular';

function Popular() {
    const [popular, setPopular] = useState<Recipe[]>([]);
    async function getPopular() {
        const localPopular = localStorage.getItem(KEY_POPULAR);
        if(localPopular) {
            setPopular(JSON.parse(localPopular));
            return;
        } 
        const res = await fetch(`${baseURL}&number=9`);
        const data = await res.json();
        localStorage.setItem(KEY_POPULAR, JSON.stringify(data.recipes));
        setPopular(data.recipes);
    }
    useEffect(() => {
        getPopular();
    }, [])

    function handleRefresh() {
        localStorage.removeItem(KEY_POPULAR);
        getPopular();
    }
    return (
        <div className='wrapper'>
            <h3>Popular picks</h3>
            <span className='btn-refresh' onClick={handleRefresh}>
                <GrRefresh />
            </span>
            <Splide
                options={{
                    perPage: 2,
                    pagination: false,
                    drag: 'free',
                    gap: '4rem'
                }}
            >
                {popular.map((recipe: Recipe) => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <Link to={`/detailed_recipe/${recipe.id}`}>
                                <HomeCard recipe={recipe}/>
                            </Link>
                        </SplideSlide>
                    )
                })}
            </Splide>
        </div>
    )
}

export default Popular;