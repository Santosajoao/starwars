// import React, { useState, useEffect } from 'react'


// const MyApi = () => {
//   const [characters, setCharacters] = useState([])
//   const [endSearch, setEndSearch]= useState('')

//   useEffect(() => {
//     getCharacters();
//   }, [])

//   const getCharacters = async () => {
//     try {
//       const response = await fetch('https://swapi.dev/api/people/');
//       const data = await response.json();
//       setCharacters(data.results);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   const handleEndSearch =  (e) => {
//     setEndSearch(e.target.value)
//   }

//   const filteredCharacters = characters.filter(
//     (characater) =>
//     characater.name.toLowerCase().includes(endSearch.toLowerCase())
//   )
//   filteredCharacters.sort((a, b) => a.name.localeCompare(b.name))
// }

// export default MyApi