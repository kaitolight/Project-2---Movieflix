import React from "react";
import { Box } from "@chakra-ui/react";
import MovieCarousel from "../components/MovieCarousel";
import Header from "../components/Header";

function PopularMovies({ sortType }) {
  return (
    <Box bg="#15141f" color="white">
      <Header isOnHome={false} />
      <MovieCarousel
        type="alphabeticalMovies"
        url={`https://api.themoviedb.org/3/discover/movie?sort_by=${sortType}&include_adult=false`}
      />
    </Box>
  );
}

export default PopularMovies;
