import React from 'react';
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import { NavLink} from 'react-router-dom';

function Category() {
    return (
        <div className='category-list'>
            <NavLink 
                to='cuisine/Italian' 
                className='category-link'
            >
                <FaPizzaSlice />
                <h4>Italian</h4>
            </NavLink>
            <NavLink 
                to='cuisine/American' 
                className='category-link'
            >
                <FaHamburger />
                <h4>American</h4>
            </NavLink>
            <NavLink 
                to='cuisine/Thai' 
                className='category-link'
            >
                <GiNoodles />
                <h4>Thai</h4>
            </NavLink>
            <NavLink 
                to='cuisine/Korean' 
                className='category-link'
            >
                <GiChopsticks />
                <h4>Korean</h4>
            </NavLink>
        </div>
    )
}

export default Category;