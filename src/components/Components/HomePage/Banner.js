import { useCallback, useEffect, useState } from "react";
import classes from "./Banner.module.css";
import useHttp from "../../hooks/use-http";

//  Lập hàm tạo banner để lấy hình ở đường dẫn backdrop
const Banner = () => {
  const API_KEY = "e64d8c841a5c33f0c728a299182ef201";
  const [data, setData] = useState({ backdrop_path: "" });
  const request = `/discover/tv?api_key=${API_KEY}&with_network=123`;

  // Lấy API giúp hiện banner
  const { error, sendRequest: fetchMovie } = useHttp();

  useEffect(() => {
    const getRandomMovie = (movie) => {
      setData(
        movie.results[Math.floor(Math.random() * movie.results.length - 1)]
      );
    };
    fetchMovie({ url: request }, getRandomMovie);
    console.log(data);
    console.log(error);
  }, []);

  return (
    <div className={classes.banner}>
      <img
        // Tra cứu có đường dẫn backdrop hay không. Không thì đổi sang poster
        src={`${data.backdrop_path
          ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
          : data.poster_path
            ? `https://image.tmdb.org/t/p/original${data.poster_path}`
            : ""
          }`}
        alt=""
      ></img>
      <div className={classes.description}>
        <h1>{data.name}</h1>
        <div>
          <button>Play</button>
          <button>My List</button>
        </div>
        <p>{data.overview === "" ? "Not overview" : data.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
