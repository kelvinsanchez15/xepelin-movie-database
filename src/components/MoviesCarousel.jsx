import { Box, IconButton, Skeleton } from "@mui/material";
import Carousel from "react-multi-carousel";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import MovieCard from "./MovieCard";

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
    >
      <IconButton
        className={currentSlide === 0 ? "disable" : ""}
        onClick={() => previous()}
        sx={{
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
          width: 72,
          height: 72,
          backgroundColor: (theme) => theme.palette.primary.main,
          color: "white",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.dark,
          },
        }}
      >
        <ArrowForwardIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}

export default function MoviesCarousel({ movies, loading }) {
  return (
    <Box sx={{ position: "relative" }}>
      <Carousel
        responsive={responsive}
        arrows={false}
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
