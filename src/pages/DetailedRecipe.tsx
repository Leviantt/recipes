import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { Recipe } from '../Recipe';

function DetailedRecipe() {
    const [detailedRecipe, setDetailedRecipe] = useState<Recipe>();
    const [activeTab, setActiveTab] = useState('instructions');
    const {id} = useParams();
    const URL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`;
    async function getDetailedRecipe() {
        const res = await fetch(URL);
        const data = await res.json();
        setDetailedRecipe(data);
    }

    function parseHTMLtoText(html: string | undefined): string | null {
        if(!html) return '';
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent;
    }

    useEffect(() => {
        getDetailedRecipe();
    }, [id]);
    return (
        <div className='detailed-recipe'>
            <div className='image-wrapper'>
                <h2>{detailedRecipe?.title}</h2>
                <img src={detailedRecipe?.image} alt={detailedRecipe?.title}/>
            </div>
            <div className='btns'>
                <button 
                    className={`tab-btn ${activeTab === 'instructions' && 'active'}`}
                    onClick={() => setActiveTab('instructions')}
                >
                    Instructions
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'ingredients' && 'active'}`}
                    onClick={() => setActiveTab('ingredients')}
                >
                    Ingredients
                </button>
            </div>
            {activeTab === 'instructions' ? (
                <div>
                    <p className='instructions'>{parseHTMLtoText(detailedRecipe?.summary)}
                    <br /> <br />
                    {parseHTMLtoText(detailedRecipe?.instructions)}</p>
                </div>
            ) : (
                <ul>
                    {detailedRecipe?.extendedIngredients.map((ingredient, i) => {
                        return (
                            <li className='ingredient' key={`${ingredient.id}-${i}`}>{ingredient.original}</li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default DetailedRecipe;