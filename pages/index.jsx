import { Container, Box, Grid, Typography } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Hero from "../src/components/Hero";

import "react-multi-carousel/lib/styles.css";
import {
  getLatestMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../src/api";
import MoviesCarousel from "../src/components/MoviesCarousel";

export default function Index({
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  latestMovies,
}) {
  return (
    <>
      <Hero />
      <Container>
        <Box sx={{ py: 12 }}>
          {/* Peliculas más populares */}
          <Box id="popular-movies" sx={{ mb: 8 }}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Más populares
                </Typography>
              </Grid>
              <Grid item>
                <ArrowForwardIcon sx={{ display: "flex" }} />
              </Grid>
            </Grid>
            <Typography component="p" sx={{ color: "text.secondary", mb: 4 }}>
              Nullam sapien arcu tempor
            </Typography>

            <MoviesCarousel movies={popularMovies} />
          </Box>

          {/* Peliculas mejor evaluadas */}
          <Box id="top-rated-movies" sx={{ mb: 8 }}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Mejor evaluadas
                </Typography>
              </Grid>
              <Grid item>
                <ArrowForwardIcon sx={{ display: "flex" }} />
              </Grid>
            </Grid>
            <Typography component="p" sx={{ color: "text.secondary", mb: 4 }}>
              Phasellus mi urna euismod
            </Typography>

            <MoviesCarousel movies={topRatedMovies} />
          </Box>

          {/* Próximos eventos */}
          <Box id="upcoming-movies" sx={{ mb: 8 }}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Próximos eventos
                </Typography>
              </Grid>
              <Grid item>
                <ArrowForwardIcon sx={{ display: "flex" }} />
              </Grid>
            </Grid>
            <Typography component="p" sx={{ color: "text.secondary", mb: 4 }}>
              Morbi ac turpis lacus
            </Typography>

            <MoviesCarousel movies={upcomingMovies} />
          </Box>

          {/* Últimos lanzamientos */}
          <Box id="latest-movies" sx={{ mb: 8 }}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Últimos lanzamientos
                </Typography>
              </Grid>
              <Grid item>
                <ArrowForwardIcon sx={{ display: "flex" }} />
              </Grid>
            </Grid>
            <Typography component="p" sx={{ color: "text.secondary", mb: 4 }}>
              Nullam sapien arcu tempor
            </Typography>

            <MoviesCarousel movies={latestMovies} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const popularMovies = await getPopularMovies();
  const topRatedMovies = await getTopRatedMovies();
  const upcomingMovies = await getUpcomingMovies();
  const latestMovies = await getLatestMovies();

  return {
    props: { popularMovies, topRatedMovies, upcomingMovies, latestMovies },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
