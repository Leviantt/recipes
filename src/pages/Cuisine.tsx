import React, {useState, useEffect} from 'react';
import { useParams, Link} from 'react-router-dom';
import { Recipe } from '../models/Recipe';
import SecondaryCard from '../components/SecondaryCard';

const baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}`;

function Cuisine() {
    const [cuisine, setCuisine] = useState<Recipe[]>([]);
    const {category} = useParams();
    const URL = `${baseURL}&cuisine=${category}`;
    async function getCuisine() {
        const res = await fetch(URL);
        const data = await res.json();
        setCuisine(data.results);
    }
    useEffect(() => {
        getCuisine();
    }, [category]);

    return (
        <div className='grid'>
            {cuisine.map((recipe: Recipe, i) => {
                return (
                    <Link to={`/detailed_recipe/${recipe.id}`} key={recipe.id}>
                        <SecondaryCard recipe={recipe} />
                    </Link>
                )
            })}
        </div>
    );
}

export default Cuisine;