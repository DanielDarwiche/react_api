import React from 'react'
import './SearchBar.css';


export const IDSearchResult = ({result}) => {
  return   ( 
  <div 
  className="search-result"
  onClick={(e) => alert(`Book with id you searched is titled:${result.title}!`)}

  >
    <b>ID: {result.id}</b> - {result.title.toLowerCase()}, {result.author.toLowerCase()}  
    </div>
    );
};
