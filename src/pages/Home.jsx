import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavBar/index.jsx'
import ResultCard from '../components/ResultCard/index.jsx'
import { Container, Grid } from '@mui/material'
import axios from 'axios';

export const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa

    useEffect(() => {
        getCharacters();
        getPlanets();
    }, [])
    
    useEffect(() => {
        setSearchTerm('');
    }, []);
    

    const getCharacters = async () => {
        try {
            const firstPageResponse = await axios.get('https://swapi.dev/api/people/');
            const firstPageResults = firstPageResponse.data.results;
            const totalCharacters = firstPageResponse.data.count;

            const totalPages = Math.ceil(totalCharacters / firstPageResults.length);
            const requests = [firstPageResponse];

            for (let page = 2; page <= totalPages; page++) {
                requests.push(axios.get(`https://swapi.dev/api/people/?page=${page}`));
            }

            const responses = await axios.all(requests);
            const charactersData = responses.flatMap(response => response.data.results);
            setCharacters(charactersData);
        } catch (error) {
            console.log(error);
        }
    };

    const getPlanets = async () => {
        try {
            const firstPageResponse = await axios.get('https://swapi.dev/api/planets/');
            const firstPageResults = firstPageResponse.data.results;
            const totalPlanets = firstPageResponse.data.count;

            const totalPages = Math.ceil(totalPlanets / firstPageResults.length);
            const requests = [firstPageResponse];

            for (let page = 2; page <= totalPages; page++) {
                requests.push(axios.get(`https://swapi.dev/api/planets/?page=${page}`));
            }

            const responses = await axios.all(requests);
            const planetsData = responses.flatMap(response => response.data.results);
            setPlanets(planetsData);
        } catch (error) {
            console.log(error);
        }
    };


    // const getCharactersAndPlanets = async () => {
    //     try {
    //         const [charactersData, planetsData] = await Promise.all([
    //             getAllData('https://swapi.dev/api/people/'),
    //             getAllData('https://swapi.dev/api/planets/')
    //         ]);
    
    //         setCharacters(charactersData);
    //         setPlanets(planetsData);
    //         console.log(charactersData);
    //         console.log(planetsData);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    
    // const getAllData = async (url) => {
    //     try {
    //         const firstPageResponse = await axios.get(url);
    //         const firstPageResults = firstPageResponse.data.results;
    //         const totalData = firstPageResponse.data.count;
    
    //         const totalPages = Math.ceil(totalData / firstPageResults.length);
    //         const requests = [firstPageResults];
    
    //         for (let page = 2; page <= totalPages; page++) {
    //             requests.push(axios.get(`${url}?page=${page}`));
    //         }
    
    //         const responses = await axios.all(requests);
    //         const allData = responses.flatMap(response => response.data.results);
            
    //         return allData;
    //     } catch (error) {
    //         throw error;
    //     }
    // };
    

    const characterFilter = (name) => { 
        
        const lowercaseName = name.toLowerCase(); // Converte para minúsculas
        var filteredCharacters = [];
        if(lowercaseName === ""){
            getCharacters();
        }
        for(var i in characters){
            if(characters[i].name.toLowerCase().includes(lowercaseName)){
                filteredCharacters.push(characters[i]);
            }
        }
        console.log(filteredCharacters);
        setCharacters(filteredCharacters);
    };


    return (
        <div>
            <Navbar characterFilter={characterFilter} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <Container maxWidth="false">
                <Grid container spacing={2}>
                    {characters.map((character, index) => (
                        <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                            <ResultCard name={character.name} gender={character.gender} height={character.height} homeworld={planets.homeworld}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};
