import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/NavBar/index.jsx";
import ResultCard from "../components/ResultCard/index-people.jsx";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Modal,
  Pagination,
  Skeleton,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const debounceTimeout = useRef(null);

  const calcPagination = (count, length) => {
    if (page === 1) {
      const totalPages = Math.ceil(count / length);
      setTotalPages(totalPages);
    }
  };

  const getCharacters = async (search) => {
    try {
      setLoading(true);
      if (!!search && search.length > 0) {
        const params = `?search=${search}${page === 1 ? "" : `&page=${page}`} `;
        const { data } = await axios.get(
          `https://swapi.dev/api/people/${params}`
        );
        setCharacters(data.results);
        calcPagination(data.count, data.results.length);
      } else {
        if (page === 1) {
          const { data } = await axios.get("https://swapi.dev/api/people/");
          setCharacters(data.results);
          calcPagination(data.count, data.results.length);
        } else {
          const { data } = await axios.get(
            `https://swapi.dev/api/people/?page=${page}`
          );
          setCharacters(data.results);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      getCharacters(value);
    }, 1000);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleGoToHomeWorld = (homeWorldUrl) => {
    const id = homeWorldUrl.split("/")[5];
    navigate(`/planets/${id}`);
  };

  const handleGoToStarships = (starship) => {
    const id = starship.split("/")[5];
    navigate(`/starships/${id}`);
  };

  useEffect(() => {
    getCharacters(search);
  }, [page]);

  return (
    // multiplos characters
    <div>
      <Navbar setSearch={handleSearch} search={search} />
      <Container
        maxWidth="false"
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "between",
        }}
      >
        <Typography
          variant="title-lg"
          style={{ marginBottom: "1rem", fontSize: "2rem" }}
        >
          Characters
        </Typography>
        {loading && (
          <Grid container spacing={2}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <Skeleton variant="rectangular" width={300} height={150} />
              </Grid>
            ))}
          </Grid>
        )}
        {!loading && characters.length > 0 && (
          <Grid container spacing={2}>
            {characters.map((character, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <ResultCard
                  name={character.name}
                  gender={character.gender}
                  height={character.height}
                  onClick={() => setSelectedCharacter(character)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      {/* modal character selecionado */}
      {selectedCharacter && (
        <Modal
          open={!!selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        >
          <Card
            sx={{
              maxWidth: "70vw",
              margin: "auto",
              marginTop: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px #000000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography gutterBottom variant="h2" component="div">
                  {selectedCharacter.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Birth Year: {selectedCharacter.birth_year}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created: {selectedCharacter.created}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Edited {selectedCharacter.edited}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Eye Color: {selectedCharacter.eye_color}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Height: {selectedCharacter.height}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gender: {selectedCharacter.gender}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hair Collor: {selectedCharacter.hair_color}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mass: {selectedCharacter.mass}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Skin Color: {selectedCharacter.skin_color}
              </Typography>
              {selectedCharacter.starships.length > 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Total of starships: {selectedCharacter.starships.length}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No starships available...
                </Typography>
              )}
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {selectedCharacter.starships.length > 0 &&
                  selectedCharacter.starships.map((starship, index) => (
                    <>
                      <Button onClick={() => handleGoToStarships(starship)}>
                        Access {index + 1}º Starship
                      </Button>
                    </>
                  ))}
              </Box>
            </CardContent>
            <CardActions
              onClick={() => handleGoToHomeWorld(selectedCharacter.homeworld)}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={2}>
                <Button variant="contained">Go to Homeworld</Button>
              </Stack>
            </CardActions>
          </Card>
        </Modal>
      )}
      <Box
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Pagination
          sx={{ width: "FitScreen" }}
          count={totalPages}
          page={page}
          onChange={(event, page) => handlePageChange(page)}
        />
      </Box>
    </div>
  );
};
