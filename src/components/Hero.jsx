import Image from "next/image";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import heroImage from "../../public/hero-image.png";

export default function Hero() {
  return (
    <Box
      sx={{
        height: 500,
        backgroundColor: "black",
        color: "white",
        backgroundImage: `url('/hero-image.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "inline-flex",
            padding: 2,
            backgroundColor: "#F7CF71",
            color: "black",
            mb: 4,
          }}
        >
          <LocalMoviesIcon />
        </Box>
        <Typography variant="h2" sx={{ fontSize: "54px", mb: 3 }}>
          Xepelin Movie Database
        </Typography>
        <Typography sx={{ fontSize: "20px", maxWidth: "586px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
          accumsan odio. Quisque et felis id magna ultricies.
        </Typography>
      </Container>
    </Box>
  );
}
