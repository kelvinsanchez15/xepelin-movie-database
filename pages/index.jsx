import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Box, Grid, Typography } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Hero from "../src/components/Hero";
import MoviesCarousel from "../src/components/MoviesCarousel";

import {
  getLatestMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getFavoritesMoviesWithDetails,
} from "../src/api";
import { useGetFavoritesMoviesMutation } from "../src/app/services/auth";
import { selectFavoritesMovies } from "../src/app/favoritesMoviesSlice";
import { useAuth } from "../src/hooks/useAuth";

export default function Index({
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  latestMovies,
}) {
  const { user } = useAuth();
  const [getFavoritesMovies, { isLoading }] = useGetFavoritesMoviesMutation();
  const [favoritesMoviesWithDetails, setFavoriteMoviesWithDetails] = useState(
    []
  );
  const [loadingFavoritesMovies, setLoadingFavoritesMovies] = useState(false);

  const favoritesMovies = useSelector(selectFavoritesMovies);

  useEffect(() => {
    if (user) {
      setLoadingFavoritesMovies(true);
      getFavoritesMovies();
    }
  }, [user, getFavoritesMovies]);

  useEffect(() => {
    if (favoritesMovies.length >= 1) {
      (async () => {
        const movies = await getFavoritesMoviesWithDetails(favoritesMovies);
        setFavoriteMoviesWithDetails(movies);
        setLoadingFavoritesMovies(false);
      })();
    }
    if (favoritesMovies.length === 0 && !isLoading) {
      setLoadingFavoritesMovies(false);
    }
  }, [favoritesMovies, setFavoriteMoviesWithDetails, isLoading]);

  return (
    <>
      <Hero />
      <Container>
        <Box sx={{ py: 12 }}>
          {/* Peliculas favoritas */}
          {user && (
            <Box id="favorites-movies" sx={{ mb: 8 }}>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Favoritas
                  </Typography>
                </Grid>
                <Grid item>
                  <ArrowForwardIcon sx={{ display: "flex" }} />
                </Grid>
              </Grid>
              <Typography component="p" sx={{ color: "text.secondary", mb: 4 }}>
                Donec eu lobortis
              </Typography>

              {favoritesMoviesWithDetails && (
                <MoviesCarousel
                  movies={favoritesMoviesWithDetails}
                  loading={loadingFavoritesMovies || isLoading}
                />
              )}
            </Box>
          )}

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
