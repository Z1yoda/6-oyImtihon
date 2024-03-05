import React from 'react';
import './index.css';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';

function MoviePoster() {
    const [films, setFilms] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const { info } = location.state || {};

    const data = useFetch("https://api.kinopoisk.dev/v1.4/movie?page=1&limit=20");

    useEffect(() => {
        if (data.data && Array.isArray(data.data)) {
            const allfilms = data.data;
            setFilms(allfilms);
        }
    }, [data]);

    function handleExit() {
        navigate('/');
    }

    return (
        <div>
            {films.map((film) => (
                info === film.id && (
                    <div key={film.id} className="movie-poster">
                        <img src={film.backdrop.url} alt="Movie poster" className="poster-image" />
                        <div className="info">
                            <h2>{film.alternativeName ? film.alternativeName : film.name}</h2>
                            <p>{film.description}</p>
                            <p>Year: {film.year}</p>
                            <p>Rating: {film.rating.imdb}</p>
                            <p>Type: {film.type}</p>
                            <p>Starring: Actors' names</p>
                            <p>Genre: {film.genres.map((genre) => genre.name).join(', ')}</p>
                            <p>Country: {film.countries.map((country) => country.name).join(', ')}</p>
                            <button onClick={handleExit} className='button'>EXIT</button>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}

export default MoviePoster;
