import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import SecondaryCard from '../components/SecondaryCard';
import { Recipe } from '../Recipe';

const baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}`;

function SearchResult() {
    const [searchResult, setSearchResult] = useState<Recipe[]>([]);
    const {query} = useParams();

    async function getSearchResult() {
        const res = await fetch(`${baseURL}&query=${query}`);
        const data = await res.json();
        setSearchResult(data.results);
    }
    useEffect(() => {
        getSearchResult();
    }, [query]);
    return (
        <div className='grid'>
            {searchResult.length !== 0 ? (
                searchResult.map((recipe: Recipe) => {
                    return (
                        <Link to={`/detailed_recipe/${recipe.id}`} key={recipe.id}>
                            <SecondaryCard recipe={recipe} />
                        </Link>
                    )
                })
            ) : (
                <h2>No results were found</h2>
            )}
        </div>
    )
}

export default SearchResult;