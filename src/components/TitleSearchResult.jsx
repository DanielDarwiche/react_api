import React from 'react'
import './SearchBar.css';


export const TitleSearchResult = ({result}) => {
  return   ( 
  <div 
  className="search-result"
  onClick={(e) => alert(`You can find the book ${result.title} via the id, in the booklist!`)}
  >
    <b>{result.title.toUpperCase()}</b> ('{result.author}', ID:{result.id})  
    </div>
    );
};
