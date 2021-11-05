import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [dogs, setDogs] = useState([]);

  const fetchDogs = async () => {
    const response = await fetch("http://localhost:4000/dogs");
    const info = await response.json();
    // iw ant to set this array of dogs in my state
    setDogs(info.data);
  };

  useEffect(() => {
    fetchDogs();
  }, []);
  return (
    <div className="App">
      <h1>LSU Dogs!</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("name", name);
          formData.append("image", image);
          const response = await fetch("http://localhost:4000/dogs", {
            method: "POST",
            body: formData,
          });
          const info = await response.json();
        }}
      >
        <input
          placeholder="Dog's name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button>Add Dog!</button>
      </form>
      {dogs.map((dog) => (
        <div>
          <h3>{dog.name}</h3>
          <img src={`http://localhost:4000/images/${dog.image}`} />
        </div>
      ))}
    </div>
  );
}

export default App;
