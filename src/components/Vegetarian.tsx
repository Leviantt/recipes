import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { GrRefresh } from 'react-icons/gr';
import { Recipe } from '../Recipe';
import HomeCard from './HomeCard';


const baseURL = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}`
const KEY_VEGETARIAN = 'local-vegetarian';

function Popular() {
    const [vegetarian, setVegetarian] = useState<Recipe[]>([]);
    async function getVegetarian() {
        const localVegetarian = localStorage.getItem(KEY_VEGETARIAN);
        if(localVegetarian) {
            setVegetarian(JSON.parse(localVegetarian));
            return;
        }
        const res = await fetch(`${baseURL}&number=9&tags=vegetarian`);
        const data = await res.json();
        localStorage.setItem(KEY_VEGETARIAN, JSON.stringify(data.recipes));
        setVegetarian(data.recipes);
    }
    useEffect(() => {
        getVegetarian();
    }, [])
    function handleRefresh() {
        localStorage.removeItem(KEY_VEGETARIAN);
        getVegetarian();
    }
    return (
        <div className='wrapper vegetarian'>
            <h3>Vegetarian picks</h3>
            <span className='btn-refresh' onClick={handleRefresh}>
                <GrRefresh />
            </span>
            <Splide
                options={{
                    perPage: 3,
                    pagination: false,
                    drag: 'free',
                    gap: '3rem'
                }}
            >
                {vegetarian.map((recipe: Recipe) => {
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