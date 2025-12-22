import { useState } from "react";
import { useEffect } from "react";
import Aurora from "../components/Aurora";
import { Play, User } from "lucide-react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import Searchh from "../components/Search";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import '../App.css';

function MovieList() {

    const [ movies, setMovies ] = useState([])
    const isLoggedIn = !!localStorage.getItem("access")
    const [query, setQuery] = useState("")
    const [open, setOpen] = useState(false);
    const [isloading, setIsloading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [results, setResults] = useState([]);

    useEffect ( () =>{
    async function loadMovies() {
    const res = await fetch('http://127.0.0.1:8000/api/movies/')
    const data = await res.json();
      setMovies(data.results || [])
      setResults(data.results)
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
      
          const res = await fetch(`http://127.0.0.1:8000/api/search/movie/?search=${query}`);
          const data = await res.json();
          setResults(data.results || []);
          console.log(data)
        }
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
                
                <Play className="size-8 text-red-600 fill-600" />
                <span className="text-white ">
                  <Link to={`/`}><Logo /></Link>
                </span>
              </div>
              <nav className="hidden lg:flex items-center gap-8">
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
          <header>
            <Searchh onSearch={handleSearch}/>
          </header>
        

        <section className='all-movies'>
             <div
            className={`transition-all duration-300 ${
                isSearching ? "fixed top-16 left-0 right-0 z-40 bg-black/80 p-6"
                : "relative mt-8"
                }`}
                >
            <h2 className='mt-10 text-center'>All Movies</h2>
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
          </div>
        </div>
    )
}

export default MovieList;