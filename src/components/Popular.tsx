import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Recipe } from '../Recipe';
import PrimaryCard from './PrimaryCard';
import Refresh from './Refresh';



const baseURL = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}`;
const KEY_POPULAR = 'local-popular';

function Popular() {
    const [popular, setPopular] = useState<Recipe[]>([]);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleResize = () => {
        setWidth(window.innerWidth);
    }
    
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
    const calculateSlidesPerPage = (width: number): number => {
        return width < 900 ? 1 : 2;
    }
    return (
        <div>
            <h3>Popular picks</h3>
            <Refresh handleRefresh={handleRefresh}/>
            <Splide
                options={{
                    perPage: calculateSlidesPerPage(width),
                    pagination: false,
                    drag: 'free',
                    gap: '4em',
                    
                }}
            >
                {popular.map((recipe: Recipe) => {
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