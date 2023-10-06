import React, {useState} from 'react'
import './SearchBar.css';


const SearchBar = ({setResults}) => {
    const urlAuthor= `https://localhost:7175/api/book/author/{author}`;
    const urlTEST= `https://jsonplaceholder.typicode.com/users`;
//store below into stateful variable..input takeing a look at, setInput change variables value
const [input, setInput] = useState("")
//when user input text, fetch data from ext api..takes value(text to search for)
const fetchData = (value)=> {
    fetch(urlTEST)
    .then((response)=> response.json())
    .then((json)=>{
 //arrayfunction called filter...goes through each element in array
        //takes the user att specifik index....returns true if matches , else false
        //checks if value is given at all...wont render empty value
        console.log(json);
        const results= json.filter((user)=>{
            return value && user && user.name && user.name.toLowerCase().includes(value);
        })
        setResults(results);
        console.log(results);

        //1.fetch data 2.filter it 3.setResults to results//FILTer är filtrering på frontend-sidan!
    });
};

//instead of hanving onChange having just setInput , we create below.
const handleChange= (value)=>{
    setInput(value)  //sets setInput value to 'value'. just as in the 'input'
    fetchData(value) //passing value to fetchData function=> request to the api
};

  return (
    <div className="input-wrapper">
        <i class="bi bi-file-person"><b> Search books by 'Author'</b>&emsp;</i>
        <input 
        placeholder=" ..."
        value={input} 
        onChange={(e)=>handleChange(e.target.value)} 
        //takeing the e/event and setinput.value....storeing in input-variable
        />
    </div>
  )
}

export default SearchBar
