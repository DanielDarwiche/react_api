import React, { useState } from "react"; //rfc short for 'react functional component', default name is filename

export default function BookUpdateForm(props) {
  const initialFormData = Object.freeze({
    title: props.book.title,
    author: props.book.author,
    genre: props.book.genre,
    yearOfPublication: props.book.yearOfPublication,
    description: props.book.description,
    availableToBorrow: props.book.availableToBorrow,
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    //e => eventObject
    setFormData({
      //to the value the user entered
      ...formData,
      [e.target.name]: e.target.value, //name is the name for the properties below! ex name ="title"
      //the element will be set to the value entered
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //will prevent default actions happening
    //handling form submission here
    const bookToUpdate = {
      id: props.book.id,
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      yearOfPublication: formData.yearOfPublication,
      description: formData.description,
      availableToBorrow: formData.availableToBorrow,
    };

    const urlToUpdate = `https://localhost:7175/api/book/${props.book.id}`;

    fetch(urlToUpdate, {
      method: "PUT", //http post request till server
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookToUpdate), //converts to json
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
    props.onBookUpdated(bookToUpdate);
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-3">Updating the book "{props.book.title}".</h1>

      <div className="mt-3">
        <label className="h3 form-label">Title</label>
        <input
          value={formData.title}
          name="title"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
        <label className="h3 form-label">Author</label>
        <input
          value={formData.author}
          name="author"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
        <label className="h3 form-label">Genre</label>
        <input
          value={formData.genre}
          name="genre"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
        <label className="h3 form-label">Published</label>
        <input
          value={formData.yearOfPublication}
          name="yearOfPublication"
          type="number"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
        <label className="h3 form-label">Description</label>
        <input
          value={formData.description}
          name="description"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
        <label className="h3 form-label">Available</label>
        <input
          value={formData.availableToBorrow}
          className="checkboxDesign"
          name="availableToBorrow"
          type="checkbox"
          checked={formData.availableToBorrow}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit} className="btn btn-dark btn-sm w-100 mt-3">
        Submit
      </button>
      <button
        onClick={() => props.onBookUpdated(null)}
        className="btn btn-dark btn-sm w-100 mt-3"
      >
        Cancel
      </button>
    </form>
  );
}
