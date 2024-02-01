import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getCharacters = async () => {
    try {
      setLoading(true);
      if (page === 1) {
        const response = await axios.get("https://swapi.dev/api/people/");
        setCharacters(response.data.results);
        if (!totalPages) {
          const totalPages = Math.ceil(
            response.data.count / response.data.results.length
          );
          setTotalPages(totalPages);
        }
      } else {
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${page}`
        );

        setCharacters(response.data.results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
    getCharacters();
  }, [page]);

  return (
    <div>
      <Navbar />
      <Container
        maxWidth="false"
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "between",
        }}
      >
        {/* skeleton estilizar */}
        {loading && (
          <Grid container spacing={2}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <Skeleton variant="rectangular" width={300} height={150} />
              </Grid>
            ))}
          </Grid>
        )}
        {/* melhorar estilziação dos cards abaixo */}
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

      {/* melhorar estilziação modal */}
      {selectedCharacter && (
        <Modal
          open={!!selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        >
          <Card
            sx={{
              width: "600px",
              margin: "auto",
              marginTop: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px #000000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
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
                    <button
                      style={{
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                        background: "none", // Remover o background
                        display: "flex", // Para alinhar conteúdo no centro
                        alignItems: "center", // Para alinhar verticalmente
                        justifyContent: "center", // Para alinhar horizontalmente
                        width: "100%", // Para ocupar toda a largura disponível
                      }}
                      onClick={() => handleGoToStarships(starship)}
                    >
                      <Typography
                        key={index}
                        variant="body2"
                        color="#0c3db0"
                        style={{ margin: "auto" }} // Centralizar o texto
                      >
                        Access {index + 1}º Starship
                      </Typography>
                    </button>
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
              <Typography
                variant="body5"
                color="black"
                style={{ cursor: "pointer" }}
              >
                Go to Homeworld
              </Typography>
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
          count={totalPages}
          page={page}
          onChange={(_, page) => handlePageChange(page)}
        />
      </Box>
    </div>
  );
};
