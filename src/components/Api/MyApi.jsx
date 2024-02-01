import { useState, useEffect } from "react";

const MyApi = () => {
  const [characters, setCharacters] = useState([]);
  const [endSearch, setEndSearch] = useState("");
  const [homeWorlds, setHomeWorlds] = useState([])

  const getCharacters = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEndSearch = (e) => {
    setEndSearch(e.target.value);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    const loadHomeWorld = async () => {
      const charsHomeWorlds = await characters.map((char) => {
        const homeworldData =  fetch(char.homeworld)
        return homeworldData.name
      });
      setHomeWorlds(charsHomeWorlds)
    };
    if (characters.length > 0) {
      loadHomeWorld();
    }
  }, [characters]);

  const filteredCharacters = characters.filter((characater) =>
    characater.name.toLowerCase().includes(endSearch.toLowerCase())
  );

  filteredCharacters.sort((a, b) => a.name.localeCompare(b.name));
};

//ai char[0] vai o nome da sua home world em homeWorlds[0]

export default MyApi;