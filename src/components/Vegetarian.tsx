import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Recipe } from '../models/Recipe';
import PrimaryCard from './PrimaryCard';
import Refresh from './Refresh';


const baseURL = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}`
const KEY_VEGETARIAN = 'local-vegetarian';

function Popular() {
    const [vegetarian, setVegetarian] = useState<Recipe[]>([]);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const handleResize = () => {
        setWidth(window.innerWidth);
    }

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
    const calculateSlidesPerPage = (width: number): number => {
        if(width < 750) return 1;
        if(width < 1200) return 2;
        return 3;
    }
    return (
        <div>
            <h3>Vegetarian picks</h3>
            <Refresh handleRefresh={handleRefresh}/>
            <Splide
                options={{
                    perPage: calculateSlidesPerPage(width),
                    pagination: false,
                    drag: 'free',
                    gap: '3em',
                }}
            >
                {vegetarian.map((recipe: Recipe) => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <Link to={`/detailed_recipe/${recipe.id}`}>
                                <PrimaryCard recipe={recipe}/>
                            </Link>
                        </SplideSlide>
                    )
                })}
            </Splide>
        </div>
    )
}

export default Popular;