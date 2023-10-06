import React from 'react'
import './SearchBar.css';


export const SearchResult = ({result}) => {
  return   ( 
  <div 
  className="search-result"
  onClick={(e) => alert(`You can find the book written by ${result.author} via the id, in the booklist!`)}
  >
    <b>{result.author.toUpperCase()}</b> ('{result.title}', ID:{result.id})  
    </div>
    );
};
