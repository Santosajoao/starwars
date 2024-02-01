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
import ResultCard from "../components/ResultCard/index-starships.jsx";

export function Starships() {
  const { id } = useParams();
  const [starship, setStarship] = useState(null);
  const [starships, setStarships] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleGoToStarships = (homeWorldUrl) => {
    const id = homeWorldUrl.split("/")[5];
    navigate(`/starships/${id}`);
  };

  useEffect(() => {
    const getStarship = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/starships/${id}/`);
        const data = await response.json();
        setStarship(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (id) getStarship();
  }, [id]);

  useEffect(() => {
    const getStarships = async () => {
      try {
        setLoading(true);
        if (page === 1) {
          const response = await fetch(`https://swapi.dev/api/starships`);
          const data = await response.json();
          if (!totalPages) {
            const totalPages = Math.ceil(data.count / data.results.length);
            setTotalPages(totalPages);
          }
          setStarships(data.results);
        } else {
          const response = await fetch(
            `https://swapi.dev/api/starships/?page=${page}`
          );
          const data = await response.json();
          setStarships(data.results);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getStarships();
  }, [page]);

  //starship singular
  if (!!starship)
    return (
     //colocar o result card aqui
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
            {starship.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            model: {starship.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            manufacturer: {starship.manufacturer}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            cost_in_credits: {starship.cost_in_credits}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            length: {starship.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            max_atmosphering_speed: {starship.max_atmosphering_speed}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            crew: {starship.crew}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            passengers: {starship.passengers}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            cargo_capacity: {starship.cargo_capacity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            consumables: {starship.consumables}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            hyperdrive_rating: {starship.hyperdrive_rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            MGLT: {starship.MGLT}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            starship_class: {starship.starship_class}
          </Typography>
        </CardContent>
        <Button
          size="small"
          onClick={() => {
            navigate(-1);
            setStarship(null);
          }}
        >
          Voltar
        </Button>
      </Card> 
     </>
    );
  //multiplos starships
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

          {!loading && starships.length > 0 && (
            <Grid container spacing={2}>
              {starships.map((starship, index) => (
                <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                  <ResultCard
                    name={starship.name}
                    model={starship.model}
                    manufacturer={starship.manufacturer} 
                    onClick={() => handleGoToStarships(starship.url)}                  
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
export default Starships;
