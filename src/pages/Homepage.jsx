import '../App.css';
import { useState, useEffect } from 'react';
import Logo from "../components/Logo";
import { Play, User } from "lucide-react";
import Searchh from '../components/Search';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import Featured from '../components/Featured';
import { Link } from "react-router-dom";
import Aurora from '../components/Aurora';
import { apiFetch } from '../api';

function Homepage(){

  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [results, setResults] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [query, setQuery] = useState("")
  const [upcoming, setUpcoming] = useState([])
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("access")

  // All Movies
  useEffect ( () =>{
    async function loadMovies() {
    const data = await apiFetch('/api/movies/')
      setMovies(data.results || [])
      setResults(data.results)
      setNextPage(data.next)
      setPrevPage(data.previous)
      setIsloading(false)
    }
    loadMovies();
  }, [])
  const isSearching = query.trim().length > 0;

  const handleSearch = async(query) => {
      
          if (query.trim() == ""){
            setResults(movies);
            return;
          }
      
          const data = apiFetch(`/api/search/movie/?search=${query}`);
          setResults(data.results || []);
          console.log(data)
        }

  // Popular Movies
  useEffect( () => {
    apiFetch('/api/movies/popular')
    .then(data => setPopular(data.results ?? data));
  }, []);

  // Top Rated Movies
  useEffect( () => {
    apiFetch('/api/movies/top_rated')
    .then(data => setTopRated(data.results ?? data));
  }, []);

  // Featured Movie
  useEffect(() => {
    apiFetch("/api/movies/featured")
    .then(data => setFeatured(data.results ?? data));
  }, []);

  // Upcoming Movie
  useEffect(() => {
    apiFetch("/api/movies/upcoming")
    .then(res => res.json())
    .then(data => setUpcoming(data.results ?? data))
  }, [])
  
  if (!movies) return <div className="text-white p-10">Loading...</div>;
  
  return(
      <div className="min-h-screen bg-grey " initial={{ x: 0, opacity: 1 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
        <div className="aurora-bg">
          <Aurora
            colorStops={["#000001", "#0A0F24", "#2B1A4A"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <header className="fixed top-0 left-0 right-0 z-50 bg-grey/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                
                <Play className="size-8 text-blue-400 fill-600" />
                <span className="text-white ">
                  <Logo />
                </span>
              </div>
              <nav className="hidden lg:flex items-center gap-8">
                <Link Link to={"/MovieList"} className="text-white/70 hover:text-white transition-colors">Movies</Link>
                <a href="#" className="text-white/70 hover:text-white transition-colors">TV Shows</a>
                { !isLoggedIn ? <Link to={`/Login`} className="text-white/70 hover:text-white transition-colors">Login</Link> : <Link to={`/user`} className="text-white/70 hover:text-white transition-colors"><User/></Link>}
              </nav>
               <button 
            className="lg:hidden text-white text-3xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✖" : "☰"}
          </button>

        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden mt-4 flex flex-col gap-4 bg-black/40 p-4 rounded-lg">
            <Link to={"/MovieList"} className="text-white/70 hover:text-white transition-colors">Movies</Link>
            <a href="#" className="text-white/70 hover:text-white transition-colors">TV Shows</a>
            {
              !isLoggedIn
                ? <Link to="/Login" className="text-white/70 hover:text-white">Login</Link>
                : <Link to="/user" className="text-white/70 hover:text-white"><User /></Link>
            }
          </div>
        )}

          </div>
        </header>
        <div className='wrapper pt-80px'>
          <header className='pt-20'>
            <Searchh onSearch={handleSearch}/>
          </header>
          <Featured movie={featured}/>
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {popular.slice(0, 10).map((movie, index) => (
                <Link to={`/movies/${movie.id}/`} style={{ textDecoration: "none", color: "inherit" }} key={movie.id}>
                <li key={movie.id} className = 'top-rated'>
                <p>{index + 1}</p>
                <img src={movie.poster} alt={movie.title} />
                </li>
                </Link>
              ))}
            </ul>
          </section>
          <section className='trending'>
            <h2>Top Rated Movies</h2>
            <ul>
              {topRated.slice(0, 10).map((movie, index) => (
                <Link to={`/movies/${movie.id}/`} style={{ textDecoration: "none", color: "inherit" }} key={movie.id}>
                <li key={movie.id} className = 'top-rated'>
                <p>{index + 1}</p>
                <img src={movie.poster} alt={movie.title} />
                </li>
                </Link>
              ))}
            </ul>
          </section>
           <section className='trending'>
            <h2>Upcoming Movies</h2>
            <ul>
              {upcoming.slice(0, 10).map((movie, index) => (
                <Link to={`/movies/${movie.id}/`} style={{ textDecoration: "none", color: "inherit" }} key={movie.id}>
                <li key={movie.id} className = 'top-rated'>
                <p>{index + 1}</p>
                <img src={movie.poster} alt={movie.title} />
                </li>
                </Link>
              ))}
            </ul>
          </section>
          <section className='all-movies'>
             <div
            className={`transition-all duration-300 ${
                isSearching ? "fixed top-16 left-0 right-0 z-40 bg-black/80 p-6"
                : "relative mt-8"
                }`}
                >
            <h2 className='mt-20'>All Movies</h2>
            <br />
            {isloading ? (
              <p><Spinner/></p>
            ) : errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              <ul>
                {results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
          )}
          </div>
          </section>
          <div className='flex justify-center gap-4 mt-6'>
            <button disabled={!prevPage} onClick={ async () => {
          const data = await apiFetch(prevPage);
          setMovies(data.results)
          setNextPage(data.next)
          setPrevPage(data.previous)
        }} className='px-4 py-2 rounded-md text-white ${nextPage ? "bg-gray-600 opacity-50"}'>
          Previous
        </button>
        <button disabled={!nextPage} onClick={() => loadMovies(nextPage)} className='px-4 py-2 rounded-md text-white ${nextPage ? "bg-gray-600 opacity-50"}'>
          Next
        </button>
          </div>
        </div>
      </div>
  );
}

export default Homepage;
