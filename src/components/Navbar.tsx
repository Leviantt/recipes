import React from "react";
import { Link } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';

function Navbar() {
    return (
        <div className="nav">
            <Link to='/'>
                <span className="logo">
                    <GiKnifeFork />
                    delicious 
                </span>
            </Link>
        </div>
    )
}

export default Navbar;