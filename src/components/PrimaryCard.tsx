import React from "react";
import { Recipe } from "../Recipe";

interface RecipeCardProps {
    recipe: Recipe;
}

function PrimaryCard({recipe}: RecipeCardProps) {
    return (
        <div className="primary-card">
            <div className="dark-image-gradient">
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title}/>
            </div>
        </div>
    )
}

export default PrimaryCard;