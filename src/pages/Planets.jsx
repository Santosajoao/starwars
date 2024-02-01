import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavBar/index.jsx";
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "between",
        }}
      >
        <Navbar />
        <Card
          sx={{
            width: "90%",
            height: "80%",
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Box
              style={{
                width: "100%",
                height: "fit-content",
                backgroundColor: "lightgray",
                border: "1px solid darkgray",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">name: {planet.name}</Typography>
              <Typography variant="body1">
                population:{planet.population}
              </Typography>
              <Typography variant="body2">climate: {planet.climate}</Typography>
              <Typography variant="body2">
                diameter: {planet.diameter}
              </Typography>
              <Typography variant="body2">gravity: {planet.gravity}</Typography>
              <Typography variant="body2">
                orbital_period: {planet.orbital_period}
              </Typography>
              <Typography variant="body2">
                rotation_period: {planet.rotation_period}
              </Typography>
              <Typography variant="body2">
                surface_water: {planet.surface_water}
              </Typography>
              <Typography variant="body2">terrain: {planet.terrain}</Typography>
            </Box>
          </CardContent>
        </Card>
        <Button
          size="small"
          onClick={() => {
            navigate(-1);
            setPlanet(null);
          }}
        >
          Go back
        </Button>
      </div>
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
                  <Box
                    style={{
                      width: "100%",
                      height: "fit-content",
                      backgroundColor: "lightgray",
                      border: "1px solid darkgray",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">name: {planet.name}</Typography>
                    <Typography variant="body1">
                      population:{planet.population}
                    </Typography>
                    <Typography variant="body2">
                      climate: {planet.climate}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => handleGoToHomeWorld(planet.url)}
                    >
                      Learn More
                    </Button>
                  </Box>
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
