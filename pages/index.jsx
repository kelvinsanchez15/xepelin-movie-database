import { Container, Box, Grid, Typography, IconButton } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import MovieCard from "../src/components/MovieCard";
import Hero from "../src/components/Hero";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CarouselCustomButtonGroup({ next, previous, goToSlide, ...rest }) {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <Box
      sx={{
        position: "absolute",
        top: "38%",
        display: "flex",
        justifyContent: "space-between",
        width: "calc(100% + 24px);",
        left: "-16px",
      }}
      className="carousel-button-group"
    >
      <IconButton
        size="large"
        className={currentSlide === 0 ? "disable" : ""}
        onClick={() => previous()}
        sx={{ backgroundColor: "purple" }}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => next()}
        sx={{ backgroundColor: "purple" }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
    slidesToSlide: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2,
  },
};
export default function Index({ movies }) {
  return (
    <>
      <Hero />
      <Container disableGutters>
        <Box sx={{ py: 12 }}>
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
          <Box sx={{ position: "relative" }}>
            <Carousel
              responsive={responsive}
              arrows={false}
              renderButtonGroupOutside
              customButtonGroup={<CarouselCustomButtonGroup />}
            >
              {movies.map(
                ({
                  id,
                  title,
                  release_date: releaseDate,
                  backdrop_path: backdropPath,
                  overview,
                }) => (
                  <MovieCard
                    key={id}
                    title={title}
                    releaseDate={releaseDate}
                    backdropPath={backdropPath}
                    overview={overview}
                  />
                )
              )}
            </Carousel>
          </Box>
          /
        </Box>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const url =
    "https://api.themoviedb.org/3/movie/popular?api_key=b69d9e5ccb7d627bc02f3d704e5ca529&language=es-MX&page=1";
  const res = await fetch(url);
  const { results: movies } = await res.json();
  console.log(movies);

  return {
    props: { movies },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
