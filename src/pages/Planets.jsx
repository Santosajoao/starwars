import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavBar/index.jsx";
import ResultCard from "../components/ResultCard/index-planets.jsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";

export function Planets() {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleGoToHomeWorld = (homeWorldUrl) => {
    const id = homeWorldUrl.split("/")[5];
    navigate(`/planets/${id}`);
  };

  useEffect(() => {
    const getPlanet = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
        const data = await response.json();
        setPlanet(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (id) getPlanet();
  }, [id]);

  useEffect(() => {
    const getPlanets = async () => {
      try {
        setLoading(true);
        if (page === 1) {
          const response = await fetch(`https://swapi.dev/api/planets`);
          const data = await response.json();
          if (!totalPages) {
            const totalPages = Math.ceil(data.count / data.results.length);
            setTotalPages(totalPages);
          }
          setPlanets(data.results);
        } else {
          const response = await fetch(
            `https://swapi.dev/api/planets/?page=${page}`
          );
          const data = await response.json();
          setPlanets(data.results);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getPlanets();
  }, [page]);

  //planeta singular
  if (!!planet)
    return (
      <>
        <Navbar />
        <Card
          maxWidth="80vw"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {planet.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Climate: {planet.climate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created: {planet.created}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Diameter: {planet.diameter}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gravity: {planet.gravity}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Orbital Period: {planet.orbital_period}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Population: {planet.population}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Terrain: {planet.terrain}
            </Typography>
          </CardContent>
          <Button
            size="small"
            onClick={() => {
              navigate(-1);
              setPlanet(null);
            }}
          >
            Back
          </Button>
        </Card>
      </>
    );
  //multiplos planetas
  else
    return (
      <>
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
          {loading && (
            <Grid container spacing={2}>
              {Array.from({ length: 10 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                  <Skeleton variant="rectangular" width={300} height={150} />
                </Grid>
              ))}
            </Grid>
          )}

          {!loading && planets.length > 0 && (
            <Grid container spacing={2}>
              {planets.map((planet, index) => (
                <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                  <ResultCard
                    name={planet.name}
                    population={planet.population}
                    climate={planet.climate}
                    onClick={() => handleGoToHomeWorld(planet.url)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
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
      </>
    );
}
export default Planets;
