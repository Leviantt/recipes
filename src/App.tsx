import React from 'react';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Cuisine from './pages/Cuisine';
import Category from './components/Category';
import Search from './components/Search';
import SearchResult from './pages/SearchResult';
import DetailedRecipe from './pages/DetailedRecipe';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';

function App() {
  return (
      <Router>
        <Navbar />
        <Search />
        <Category />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cuisine/:category' element={<Cuisine />} />
          <Route path='/search_result/:query' element={<SearchResult />} />
          <Route path='/detailed_recipe/:id' element={<DetailedRecipe />} />
          <Route path='/*' element={<NotFound />} />  
        </Routes>
      </Router>
    );
}

export default App;
