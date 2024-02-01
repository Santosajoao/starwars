import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavBar/index.jsx";

export function Starships() {
  const { id } = useParams();
  const [starship, setStarship] = useState(null);
  const navigate = useNavigate();

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

    getStarship();
  }, [id]);

  return (
    <div>
      <Navbar />
      <Card sx={{ width: "100%", height: "100%", padding: "16px" }}>
        <CardContent
          style={{ display: "flex", flexDirection: "column", gap: "4px" }}
        >
          <Typography gutterBottom variant="h5" component="div"></Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
      </Card>
      <Button size="small" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </div>
  );
}
export default Starships;
