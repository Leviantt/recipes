import React, {SyntheticEvent, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function Search() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        if(query.trim() === '') return;
        navigate(`/search_result/${query}`);
    }
    function handleChange(e: any) {
        setQuery(e.target.value);
    }
    return (
        <form className='search-form' onSubmit={handleSubmit}>
                <FaSearch onClick={handleSubmit}/>
                <input type='text' onChange={handleChange} value={query}/>
        </form>
    )
}

export default Search;