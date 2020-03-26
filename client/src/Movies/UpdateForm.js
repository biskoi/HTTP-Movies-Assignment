import React, {useState, useEffect} from 'react';
import {useParams, useRouteMatch} from 'react-router-dom';
import axios from 'axios';

export const UpdateForm = (props) => {

   const params = useParams();
   const match = useRouteMatch();

   const init = {
      id: match.params.id,
      title: '',
      director: '',
      metascore: '',
      stars: []
   }

   const [data, setData] = useState(init);
   console.log(params);
   console.log(match);

   useEffect(() => {
      const toUpdate = props.movies.find(item => `${item.id}` === match.params.id);
      if (toUpdate) {
         setData(toUpdate);
      }
   }, [props.movies]);

   const onChange = (e) => {
      setData({
         ...data,
         [e.target.name]: e.target.value
      });
      console.log(data);
   };

   const onSubmit = (e) => {
      e.preventDefault();
      axios.put(`http://localhost:5000/api/movies/${match.params.id}`, data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
      setData(init);
      window.location.href = '/'
   }

   return (
      <>
      <p>update form</p>
      <form onSubmit = {onSubmit}>
         <label name = 'title'>Title</label>
         <input htmlFor = 'title' name = 'title' onChange = {onChange} value = {data.title}/>
         <label name = 'director'>Director</label>
         <input htmlFor = 'director' name = 'director' onChange = {onChange} value = {data.director}/>
         <label name = 'metascore'>Metascore</label>
         <input htmlFor = 'metascore' name = 'metascore' onChange = {onChange} value = {data.metascore}/>
         <label name = 'stars'>Stars</label>
         <input htmlFor = 'stars' name = 'stars' onChange = {onChange} value = {data.stars}/>
         <button>Submit</button>
      </form>
      </>
   )

}