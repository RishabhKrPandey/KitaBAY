import React, {useState} from 'react';
import axios from 'axios';

// we need to get and store book data then use it in api for search
const API_KEY = process.env.REACT_APP_API_KEY;



// create serach feature
const Main = () =>{
    const [bookData, setData] = useState([]);
    const [search, setSearch] = useState();


    const searchBook=(evt)=>{
        if(evt.key==="Enter")
        {
           axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${API_KEY}&maxResults=40`)

            .then(res=>{
                console.log("Full API response:", res);  
                setData(res.data.items)
            })
            .catch(err=>console.log(err))
        }
    }
    return(
    <>
      <div className="search">
       <input
  type="text"
  placeholder="Enter Your Book Name"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={searchBook}  // ✅ Use this instead
/>

       <button onClick={() => searchBook({ key: "Enter" })}>
  <i className="fas fa-search">search</i>
</button>
      </div>

      <img src="./images/bg2.png" alt="" />

      <div className="book-container">
        {bookData.map((book) => {
          const info = book.volumeInfo;
          return (
            <div key={book.id} className="book">
              <img src={info.imageLinks?.thumbnail} alt={info.title} />
              <h3>{info.title}</h3>
              <p>{info.authors?.join(', ')}</p>
              <p>{info.publishedDate}</p>
              <a href={info.previewLink} target="_blank" rel="noopener noreferrer">Preview</a>
            </div>
          );
        })}
      </div>
    </>

    )
}

export default Main




