import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, HStack, Button, Box } from "@chakra-ui/react";
import Video from "./Video";
import "./MovieVideoCarousel.css";

export default function MovieVideoCarousel({ movie }) {
  const [allVideos, setAllVideos] = useState([]);

  const [current, setCurrent] = useState(0);
  const getVideos = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie}/videos?api_key=20d0a760d82811eb01a3f02b31edc400&language=en-US`
      )
      .then((response) => response.data)
      .then((data) => {
        setAllVideos(
          data.results.filter(
            (video) => video.type === "Trailer" && video.official === true
          )
        );
      });
  };

  const filterVideos = (cur, allVid) => {
    const res = [];
    res.push(allVid[cur]);
    if (cur === allVid.length - 1) {
      res.push(allVid[0]);
      res.push(allVid[1]);
    } else if (cur === allVid.length - 2) {
      res.push(allVid[allVid.length - 1]);
      res.push(allVid[0]);
    } else {
      res.push(allVid[cur + 1]);
      res.push(allVid[cur + 2]);
    }
    return res;
  };

  useEffect(() => {
    getVideos();
  }, []);

  const nextSlide = () => {
    setCurrent(current === allVideos.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? allVideos.length - 1 : current - 1);
  };
  if (allVideos.length === 1) {
    return current + 1;
  }

  return (
    <Box>
      <Flex
        W="400px"
        mx="auto"
        align="center"
        gap="15px"
        mt="100px"
        justify="center"
        direction={{ base: "column", md: "column", lg: "column", x1: "row" }}
      >
        <HStack>
          <Button variant="solid" borderRadius="100%" w="50px" h="50px">
            <ArrowBackIcon
              color="red"
              _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
              fontSize="3rem"
              className="left-arrow"
              onClick={prevSlide}
            />
          </Button>
        </HStack>

        {allVideos.length &&
          filterVideos(current, allVideos).map((video) => (
            <div className="slide active" key={video.key}>
              <Video videoInfo={video} key={video.key} />
            </div>
          ))}
        <Button variant="solid" borderRadius="100%" w="50px" h="50px">
          <ArrowForwardIcon
            color="red"
            _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
            fontSize="3rem"
            className="right-arrow"
            onClick={nextSlide}
          />
        </Button>
      </Flex>
    </Box>
  );
}
