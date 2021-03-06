import PropTypes from "prop-types";
import { Box, IconButton, Skeleton } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import MovieCard from "./MovieCard";

// Maneja los elementos mostrados en el carousel de forma responsive
const responsive = {
  xl: {
    breakpoint: { max: 3000, min: 1280 },
    items: 6,
    slidesToSlide: 6,
  },
  lg: {
    breakpoint: { max: 1280, min: 1024 },
    items: 5,
    slidesToSlide: 5,
  },
  md: {
    breakpoint: { max: 1024, min: 840 },
    items: 4,
    slidesToSlide: 4,
  },
  sm: {
    breakpoint: { max: 840, min: 630 },
    items: 3,
    slidesToSlide: 3,
  },
  xs: {
    breakpoint: { max: 630, min: 0 },
    items: 2,
    slidesToSlide: 2,
  },
};

function CarouselCustomButtonGroup({ next, previous, ...rest }) {
  const {
    carouselState: { currentSlide, totalItems, slidesToShow },
  } = rest;
  return (
    <>
      <IconButton
        className={currentSlide === 0 ? "disable" : ""}
        onClick={() => previous()}
        sx={{
          position: "absolute",
          top: "33%",
          left: {
            xs: -12,
            sm: -20,
            lg: -28,
          },
          width: 72,
          height: 72,
          backgroundColor: (theme) => theme.palette.primary.main,
          color: "white",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.dark,
          },
          // Ocultar botón cuando el carousel está en el primer slide
          visibility: currentSlide === 0 ? "hidden" : "visible",
        }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <IconButton
        onClick={() => next()}
        sx={{
          position: "absolute",
          right: {
            xs: -12,
            sm: -16,
            lg: -28,
          },
          top: "33%",
          width: 72,
          height: 72,
          backgroundColor: (theme) => theme.palette.primary.main,
          color: "white",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.dark,
          },
          // Ocultar botón cuando la cantidad de elementos sea menor o igual que los slides a mostrar
          visibility: totalItems <= slidesToShow ? "hidden" : "visible",
        }}
      >
        <ArrowForwardIcon fontSize="large" />
      </IconButton>
    </>
  );
}

export default function MoviesCarousel({ movies, loading }) {
  return (
    <Box sx={{ position: "relative" }}>
      <Carousel
        responsive={responsive}
        arrows={false}
        draggable={false}
        renderButtonGroupOutside
        customButtonGroup={<CarouselCustomButtonGroup />}
      >
        {loading
          ? Array.from(new Array(6)).map((item, index) => (
              <Box key={index}>
                <Skeleton
                  variant="rectangular"
                  width={188}
                  height={282}
                  sx={{ mb: 2 }}
                />
                <Skeleton variant="text" width={188} />
                <Skeleton variant="text" width={188} />
              </Box>
            ))
          : movies.map(({ id, title, releaseDate, backdropPath, overview }) => (
              <MovieCard
                key={id}
                title={title}
                releaseDate={releaseDate}
                backdropPath={backdropPath}
                overview={overview}
              />
            ))}
      </Carousel>
    </Box>
  );
}

MoviesCarousel.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      backdropPath: PropTypes.string,
      overview: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool,
};
