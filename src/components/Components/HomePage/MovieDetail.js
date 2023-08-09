import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./MovieDetail.module.css";

// Lập hàm chi tiết chứa dữ liệu & trailer
const MovieDetail = (props) => {
  const API_KEY = "e64d8c841a5c33f0c728a299182ef201";
  let image = (
    <img
      src={`${props.movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`
        : props.movie.poster_path
          ? `https://image.tmdb.org/t/p/original${props.movie.poster_path}`
          : ""
        }`}
      alt=""
    ></img>
  );
  const [data, setData] = useState([]);
  const [trailer, setTrailer] = useState(image);
  const request = `/movie/${props.movie.id}/videos?api_key=${API_KEY}`;

  // Lấy dữ liệu
  const { error, sendRequest: fetchMovie } = useHttp();
  useEffect(() => {
    const getMovie = (movie) => {
      setData(movie.results);
    };
    fetchMovie({ url: request }, getMovie);
  }, [request]);
  console.log(data);

  // Check trailer có hoặc k, trường hợp không trailer sẽ hiện backdrop ảnh
  useEffect(() => {
    let temp;
    if (data.length !== 0) {
      for (const e of data) {
        if (
          e.site === "YouTube" &&
          (e.type === "Teaser" || e.type === "Trailer")
        )
          temp = (
            <iframe
              width="48%"
              height="400"
              src={`https://www.youtube.com/embed/${e.key}`}
            ></iframe>
          );
      }
    }
    if (!error && temp) setTrailer(temp);
    else setTrailer(image);
  }, [error, data]);

  const closeMovie = () => {
    props.closePopUp();
  }

  return (
    <div >
      <div className={classes.moviedetail} onClick={closeMovie}>
        <button onClick={closeMovie}>Close</button>
        <div>
          <h1>{props.movie.name || props.movie.title}</h1>
          <p>
            <strong>
              Release Date:
              {props.movie.release_date || props.movie.first_air_date}
            </strong>
          </p>
          <p>
            <strong>Vote: {props.movie.vote_average}/10</strong>
          </p>
          <p>
            {props.movie.overview === "" ? "Not overview" : props.movie.overview}
          </p>
        </div>
        {trailer}
      </div></div>
  );
};
export default MovieDetail;
