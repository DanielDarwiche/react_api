import React, { useState } from 'react'
import './SearchBar.css';

const IDSearchBar = ({ IDSetResults }) => {
    const urlAuthor = `https://localhost:7175/api/book/author/{author}`;
    const apiUrl = "https://localhost:7175/api/books"; //webapi-url som ska kopplas

    //store below into stateful variable..input takeing a look at, setInput change variables value
    const [input, setInput] = useState("")
    //when user input text, fetch data from ext api..takes value(text to search for)
    const fetchData = (value) => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((books) => {
                //arrayfunction called filter...goes through each element in array
                //takes the user att specifik index....returns true if matches , else false
                //checks if value is given at all...wont render empty value
                console.log(books);
                const results = books.result.filter((bok) => {
                    return value && bok && bok.id.toString().includes(value.toString());
                })
                IDSetResults(results);
                console.log(books);

                //1.fetch data 2.filter it 3.setResults to results//FILTer är filtrering på frontend-sidan!
            });
    };

    //instead of hanving onChange having just setInput , we create below.
    const handleChange = (value) => {
        setInput(value)  //sets setInput value to 'value'. just as in the 'input'
        fetchData(value) //passing value to fetchData function=> request to the api
    };

    return (
        <div className="input-wrapper">
            <i class="bi bi-info-circle"><b> Search books by 'ID'</b>&nbsp;&emsp;&emsp;&emsp;</i>
            <input
                placeholder=" ..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            //takeing the e/event and setinput.value....storeing in input-variable
            />
        </div>
    )
}

export default IDSearchBar
