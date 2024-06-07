import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";

function App() {
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);

  const fetchBookHandle = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}`
    );
    setBookList(response.data.items);
  };

  useEffect(() => {
    fetchBookHandle();
  }, [search]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <DebounceInput
        minLength={2}
        debounceTimeout={500}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {bookList.map((item, index) => {
          return <li key={index}>{item.volumeInfo.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
