import React from 'react'
import './SearchBar.css';
import { IDSearchResult } from './IDSearchResult';


export const IDSearchResultsList = ({IDResults}) => {
  return (
    <div className="results-list">
        { IDResults.map((result, id)=>{
            return <IDSearchResult result ={result} key={id}/>
         })}
    </div>
  );
};

