import React from 'react';
import { Recipe } from '../Recipe';


interface CategoryCardProps {
    recipe: Recipe;
}

function SecondaryCard({recipe}: CategoryCardProps) {
    return (
        <div className='secondary-card'>
            <img src={recipe.image} alt={recipe.title}/>
            <h4>{recipe.title}</h4>
        </div>
    )
}

export default SecondaryCard;