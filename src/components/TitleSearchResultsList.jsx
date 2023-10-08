import React from 'react'
import './SearchBar.css';
import { TitleSearchResult } from './TitleSearchResult';


export const TitleSearchResultsList = ({titleResults}) => {
  return (
    <div className="results-list">
        { titleResults.map((result, id)=>{
            return <TitleSearchResult result ={result} key={id}/>
         })}
    </div>
  );
};

