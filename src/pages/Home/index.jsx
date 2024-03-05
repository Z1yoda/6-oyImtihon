import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import icon from "../../assets/icon.svg";
import allShape from "../../assets/allShape.svg";
import allWhite from "../../assets/allWhite.svg";
import allRed from "../../assets/allRed.svg";
import movies from "../../assets/movies.svg";
import movieRed from "../../assets/movieRed.svg";
import movieWhite from "../../assets/movieWhite.svg";
import series from "../../assets/series.svg";
import seriesRed from "../../assets/seriesRed.svg";
import seriesWhite from "../../assets/seriesWhite.svg";
import marked from "../../assets/marked.svg";
import markedRed from "../../assets/markedRed.svg";
import markedWhite from "../../assets/markedWhite.svg";
import avatar from "../../assets/avatar.svg";
import search from "../../assets/search.svg";
import mark from "../../assets/mark.svg";
import savedMark from "../../assets/savedMark.svg";
import play from "../../assets/play.svg"
import "./index.css";
import { useFetch } from "../../hooks/useFetch";
import { useFilm } from "../../hooks/useFilm"


function Home() {
    const inputRef = useRef('')
    const [savedFilms, setSavedFilms] = useState([]);
    const [films, setFilms] = useState([])
    const [hoveredItem, setHoveredItem] = useState(null);
    const [focusedItem, setFocusedItem] = useState(localStorage.getItem("focusedItem") || null);
    const [searchFilm, setSearchFilm] = useState("")
    const [filmData, setFilmData] = useState(null);
    const navigate = useNavigate()

    const filmSearching = useFilm(`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=1&query=${searchFilm}`)

    useEffect(() => {
        if (filmSearching.data) {
            setFilmData(filmSearching.data[0]);
        }
    }, [filmSearching.data]);

    function handleSearch() {
        if (inputRef.current.value) {
            let filmName = inputRef.current.value;
            setSearchFilm(filmName)

            console.log(filmSearching);
        }
    }


    useEffect(() => {
        localStorage.setItem("focusedItem", focusedItem);
    }, [focusedItem]);

    const handleMouseEnter = (key) => {
        setHoveredItem(key);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const handleFocus = (key) => {
        setFocusedItem(key);
    };

    const handleBlur = () => {
        setFocusedItem(null);
    };

    const navigationItems = [
        { key: "", normal: allShape, hovered: allRed, focused: allWhite },
        { key: "movies", normal: movies, hovered: movieRed, focused: movieWhite },
        { key: "series", normal: series, hovered: seriesRed, focused: seriesWhite },
        { key: "bookmarked", normal: marked, hovered: markedRed, focused: markedWhite },
    ];

    const data = useFetch("https://api.kinopoisk.dev/v1.4/movie?page=1&limit=20")

    useEffect(() => {
        if (data.data && Array.isArray(data.data)) {
            const allfilms = data.data
            setFilms(allfilms.map(film => ({ ...film, saved: !savedFilms.includes(film.id) })));
        }
    }, [savedFilms]);

    function handleDetails(filmId) {
        navigate("/about", { info: filmId })
    }

    const handleSave = (filmId) => {
        setSavedFilms((prevSavedFilms) => {
            const isFilmSaved = prevSavedFilms.includes(filmId);
            return isFilmSaved
                ? prevSavedFilms.filter((id) => id !== filmId)
                : [...prevSavedFilms, filmId];

        }
        );

    }
    return (
        <div className="homePage">
            <nav>
                <div className="list">
                    <img id="icon" src={icon} alt="" />
                    {navigationItems.map((item) => (
                        <NavLink to={`/${item.key}`} key={item.key} onFocus={() => handleFocus(item.key)}
                            onBlur={handleBlur}>
                            <img
                                onMouseEnter={() => handleMouseEnter(item.key)}
                                onMouseLeave={handleMouseLeave}
                                className="navImg"
                                src={hoveredItem === item.key ? item.hovered : focusedItem === item.key ? item.focused : item.normal}
                                alt=""
                            />
                        </NavLink>
                    ))}
                </div>
                <img src={avatar} alt="" />
            </nav>
            <div className="container">
                <div className="searchInput" >
                    <form className="form">
                        <div onChange={handleSearch}>
                            <img src={search} alt="" />
                        </div>
                        <input ref={inputRef} type="text" placeholder="Search for movies or TV series" />
                    </form>
                </div>
                <h1>{searchFilm ? `Search Results for "${searchFilm}"` : "Recommended for you"}</h1>
                <div key={"key"} className="trending">
                    {
                        data.loading ? "Loading..." :
                            (searchFilm && filmData ? (
                                <div className="card-wrapper">
                                    <div className="card">
                                        <img className="card-img" src={filmData.backdrop.url} alt="" />
                                        <img
                                            onClick={() => handleSave(filmData.id)}
                                            className="mark"
                                            src={filmData.saved ? mark : savedMark}
                                            alt=""
                                        />
                                        <img className="play" src={play} alt="" />
                                        <div className="card-content">
                                            <div className="year-type">
                                                <p>{filmData.year}</p>
                                                <p>•</p>
                                                <img className="whiteMovie" src={movieWhite} alt="" />
                                                <p>{filmData.type}</p>
                                                <p>•</p>
                                                <p>{filmData.ageRating}+</p>
                                            </div>
                                            <p>{filmData.alternativeName ? filmData.alternativeName : filmData.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                films.map((film) => (
                                    <NavLink className="navLink" to={`/about`} onClick={() => handleDetails(film.id)}>
                                        <div key={film.id} className="card-wrapper">
                                            <div className="card">
                                                <img className="card-img" src={film.backdrop.url} alt="" />
                                                <img
                                                    onClick={() => handleSave(film.id)}
                                                    className="mark"
                                                    src={film.saved ? mark : savedMark}
                                                    alt=""
                                                />
                                                <img className="play" src={play} alt="" />
                                                <div className="card-content">
                                                    <div className="year-type">
                                                        <p>{film.year}</p>
                                                        <p>•</p>
                                                        <img className="whiteMovie" src={movieWhite} alt="" />
                                                        <p>{film.type}</p>
                                                        <p>•</p>
                                                        <p>{film.ageRating}+</p>
                                                    </div>
                                                    <p>{film.alternativeName ? film.alternativeName : film.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                ))
                            ))
                    }
                </div>
            </div>
        </div>

    )
}

export default Home;
