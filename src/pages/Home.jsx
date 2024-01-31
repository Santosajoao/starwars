import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavBar/index.jsx'
import ResultCard from '../components/ResultCard/index.jsx'
import { Container, Grid } from '@mui/material'
import axios from 'axios';


export const Home = () => {

    const [characters, setCharacters] = useState([]);
    useEffect(() => {
        getCharacters();
      }, [])
    
    const getCharacters = () => {
        axios.get('https://swapi.dev/api/people/')
        .then((response) => setCharacters(response.data.results))
        .catch((error) => console.log(error))
    };
    
  return (
    <div>
        <Navbar />
        <Container maxWidth= "false">
            <Grid container spacing={2}>
                {characters.map((character) => (
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        <ResultCard/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </div>
  );
};
