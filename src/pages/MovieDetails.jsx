import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom"
import { Home } from "lucide-react"
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { useWatchlist } from "../hooks/useWatchlist";

export default function MovieDetails() {
  const { user } = useContext(AuthContext)
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const inWatchlist = user?.saved_movies?.some((m) => m.id === movie?.id);



  const handleWatchListToggle = () => {
    if (!user) return alert("Please Log In to add Movies To Watchlist");
    if (inWatchlist) {
      removeFromWatchlist(movie.id)
      alert("Movie removed Successfully")
    }else {
      addToWatchlist(movie.id)
      alert("Movie added Successfully")
    }
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/movies/${id}/`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  useEffect ( () =>{
  fetch(`http://127.0.0.1:8000/api/movies/${id}/similar`)
    .then(response => response.json())
    .then(data => setSimilar(data));
  }, [id])

if (!movie) return <div className="text-white p-10">Loading...</div>;
  return (
    <motion.div className="relative w-full min-h-screen text-white" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(${movie.poster})`,
        }}
        
      ></div>
      
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 flex flex-col md:flex-row gap-10 p-10 max-w-6xl mx-auto">
        <center><img
          src={movie.poster}
          alt={movie.title}
          className="w-60 rounded-lg shadow-lg border border-white/10"
        /></center>
        <div className="flex-1 flex flex-col gap-5">
          <Link to={`/`} style={{ textDecoration: "none", color: "inherit" }}><Home/></Link>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {movie.title}
          </h1>
          <div className="flex gap-3 flex-wrap mt-2">
            {movie.genre.map((g) => (
              <span
                key={g.id}
                className="px-4 py-1 bg-white/10 border border-white/20 rounded-full text-sm"
              >
                {g.name}
              </span>
            ))}
            <span className="px-4 py-1 bg-white/10 border border-white/20 rounded-full text-sm">
              {movie.content_rating}
            </span>
            <span className="px-4 py-1 bg-white/10 border border-white/20 rounded-full text-sm">
              {movie.original_language}
            </span>
            <span className="px-4 py-1 bg-white/10 border border-white/20 rounded-full text-sm">
              {movie.duration}
            </span>
          </div>
          <div className="flex items-center gap-5 mt-3 text-lg">
            <span className="bg-red-600 px-3 py-1 rounded-md">
              ⭐ {movie.rating}
            </span>

            <span className="text-gray-300">
              {movie.release_date}
            </span>

            <span className="text-gray-400">• Popularity: {movie.popularity}</span>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg movie-info">
            {movie.overview}
          </p>
          <div className="flex gap-4 mt-6">
            <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
              ▶ Play
            </button>

            <button className="bg-white/20 border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition" onClick={handleWatchListToggle}>
              {inWatchlist ? "Remove" : "+ Add to My List"}
            </button>
          </div>
            <div>
            <div className="sticky top-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">More Like This</h3>
              <div className="space-y-4 grid grid-cols-2 sm:grid-cols-3 gap-6">
                {similar.map((i) => (
                  <Link to={`/movies/${i.id}/`} style={{ textDecoration: "none", color: "inherit" }} key={i.id}>
                  <div className="flex gap-3">
                    <div className="w-20 h-28 bg-white/10 rounded shrink-0" >
                    <img src={`http://127.0.0.1:8000${i.poster}`} alt={i.title} />
                    </div>
                    <div>
                      <h4 className="mb-1">{i.title}</h4>
                      <p className="text-sm text-white/60">{i.release_date} • ⭐ {i.rating}</p>
                      <div className="flex items-center gap-1 mt-1">
                        
                        <span className="text-sm"></span>
                      </div>
                    </div>
                  </div>
                  <br />
                  </Link>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};
