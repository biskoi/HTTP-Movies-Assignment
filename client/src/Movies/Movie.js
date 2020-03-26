import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const editRoute = (e) => {
    e.preventDefault();
    window.location.href = `http://localhost:3000/update/${match.params.id}`;
  }

  const onDelete = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${match.params.id}`)
    .then(res => setMovieList(res.data))
    .catch(err => console.log(err));
    window.location.href = '/'
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick = {editRoute}>Edit</button>
      <button onClick = {onDelete}>Delete</button>
    </div>
  );
}

export default Movie;
