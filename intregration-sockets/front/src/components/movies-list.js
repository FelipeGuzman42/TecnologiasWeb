import { useState, useEffect } from "react";
import Movie from "./movie";


function MoviesList(){
    
    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        fetch("/api/movies").then(res=>res.json()).then(res=>{
            setMovies(res);
        })
    }, []);

    return(
        <div>
            <h1>Movies List</h1>
            <ul>
                {movies.map(m => <Movie movie={m}/>)}
            </ul>
        </div>
    )
}

export default MoviesList;