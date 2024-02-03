import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";

export function Starships() {
  const { id } = useParams();
  const [starship, setStarship] = useState(null);
  const [starships, setStarships] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const debounceTimeout = useRef(null);
  const [search, setSearch] = useState("");

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleGoToStarships = (homeWorldUrl) => {
    const id = homeWorldUrl.split("/")[5];
    navigate(`/starships/${id}`);
  };

  const calcPagination = (count, length) => {
    if (page === 1) {
      const totalPages = Math.ceil(count / length);
      setTotalPages(totalPages);
    }
  };

  const getStarships = async (search) => {
    try {
      setLoading(true);
      if (!!search && search.length > 0) {
        const params = `?search=${search}${page === 1 ? "" : `&page=${page}`} `;
        const { data } = await axios.get(
          `https://swapi.dev/api/starships/${params}`
        );
        setStarships(data.results);
        calcPagination(data.count, data.results.length);
      } else {
        if (page === 1) {
          const { data } = await axios.get("https://swapi.dev/api/starships/");
          setStarships(data.results);
          calcPagination(data.count, data.results.length);
        } else {
          const { data } = await axios.get(
            `https://swapi.dev/api/starships/?page=${page}`
          );

          setStarships(data.results);
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
      getStarships(value);
    }, 1000);
  };

  useEffect(() => {
    const getStarship = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://swapi.dev/api/starships/${id}/`
        );
        setStarship(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) getStarship();
  }, [id]);

  useEffect(() => {
    getStarships(search);
  }, [page]);

  //starship singular
  if (!!starship)
    return (
      <>
        <Navbar setSearch={handleSearch} search={search} />
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
              Model: {starship.model}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manufacturer: {starship.manufacturer}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cost in credits: {starship.cost_in_credits}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Length: {starship.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Max atmosphere speed: {starship.max_atmosphering_speed}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Crew: {starship.crew}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Passengers: {starship.passengers}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pilots: {starship.cargo_capacity}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Consumables: {starship.consumables}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hyperdrive Rating: {starship.hyperdrive_rating}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              MGLT: {starship.MGLT}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Max atmosphere speed: {starship.max_atmosphering_speed}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Starship class: {starship.starship_class}
            </Typography>
          </CardContent>
          <Button
            size="small"
            onClick={() => {
              navigate(-1);
              setStarship(null);
            }}
          >
            Back
          </Button>
        </Card>
      </>
    );
  //multiplos starships
  else
    return (
      <>
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
            Starships
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
