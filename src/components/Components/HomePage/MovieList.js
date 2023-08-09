import { useState } from "react";
import Movie from "./Movie";
import MovieDetail from "./MovieDetail";
import classes from "./MovieList.module.css";

const MovieList = () => {
  const API_KEY = "e64d8c841a5c33f0c728a299182ef201";
  const [clickedMovie, setClickedMovie] = useState("");
  const [isClickMovie, setIsClickMovie] = useState(false);
  const closeMovie = () => {
    setIsClickMovie(false);
  }

  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  };

  // Nhập tham số từ sự kiện bấm vô một phim bất kỳ
  const onClickHandler = (movie, isClicked) => {
    setClickedMovie(movie);
    setIsClickMovie(isClicked);
    console.log(movie);
  };
  //  Nhập tham số từ sự kiện bấm vô một phim bất kỳ
  return (
    <div className={classes.movielist}>
      <Movie
        path={requests.fetchNetflixOriginals}
        showType="poster"
        onClicked={onClickHandler}
      />

      <h2>Xu hướng</h2>
      <Movie path={requests.fetchTrending} onClicked={onClickHandler} />
      <h2>Xếp hạng cao</h2>
      <Movie path={requests.fetchTopRated} onClicked={onClickHandler} />
      <h2>Lãng mạn</h2>
      <Movie path={requests.fetchRomanceMovies} onClicked={onClickHandler} />
      <h2>Kinh dị</h2>
      <Movie path={requests.fetchHorrorMovies} onClicked={onClickHandler} />
      <h2>Hài</h2>
      <Movie path={requests.fetchComedyMovies} onClicked={onClickHandler} />
      <h2>Tài liệu</h2>
      <Movie path={requests.fetchDocumentaries} onClicked={onClickHandler} />
      <h2>Hành động</h2>
      <Movie path={requests.fetchActionMovies} onClicked={onClickHandler} />

      {
        // Check tình trạng hiện lên của movie detail
        isClickMovie ? <MovieDetail movie={clickedMovie} closePopUp={closeMovie} /> : ""
      }
    </div>
  );
};

export default MovieList;
