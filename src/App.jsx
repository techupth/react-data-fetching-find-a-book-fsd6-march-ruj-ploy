import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [bookList, setBookList] = useState([]);
  const getBookList = async (input) => {
    if (input) {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${input}`
      );
      setBookList(result.data.items);
    }
  };
  useEffect(() => {
    if (input) {
      getBookList(input);
    }
  }, [input]);
  return (
    <>
      <div className="App">
        {/* start coding here */}
        <h1>Find a Book</h1>
        <input
          className="input"
          placeholder="Enter book's name here"
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
      </div>
      <div>
        <ul>
          {bookList.map((item) => (
            <li key={item.id}>{item.volumeInfo.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
