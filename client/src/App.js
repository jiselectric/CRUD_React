import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState('');
  const [movieReview, setReview] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [newReview, setNewReview] = useState('');
  
  useEffect(() => {
    axios.get('/api/get').then((response) => {
      setReviewList(response.data)
    })
  }, []);

  //console.log(movieName);
  //console.log(movieReview);
  
  const submitReview = () => {
    axios.post("/api/insert/", {
      movieName: movieName,
      movieReview: movieReview
      //console.log('axios');
    });

    setReviewList([
      ...reviewList,
      { movieName : movieName, movieReview : movieReview },
    ]);

    setMovieName(''); // edit
    setReview(''); // edit
  };

  const deleteReview = (movieName) => {
    axios.delete(`/api/delete/${movieName}`);
  }

  const updateReview = (movieName) => {
    axios.put('api/update/', {
      movieName : movieName, 
      movieReview : newReview
    });
    setNewReview("");
  }

  
  return (
    <div className="App">
      <h1> CRUD APPLICATION </h1>
      <div className="form">
        <label> Movie Name </label>
        <input type="text" name="movieName" value={movieName} onChange={(e) => {
          setMovieName(e.target.value)
        }} />
        <label> Movie Review </label>
        <input type="text" name="movieReview" value={movieReview} onChange={(e) => {
          setReview(e.target.value)
        }} />
      
        <button onClick={submitReview}> Submit </button>

        {reviewList.map((val) => {
          return (
            <div className="card" key={val.id}>
              <h3> {val.movieName} </h3> 
              <p> {val.movieReview} </p>

              <button onClick={() => {deleteReview(val.movieName)}}> Delete </button>
              <input type="text" id="update-input" onChange={(e) => setNewReview(e.target.value)}/>
              <button onClick={() => {updateReview(val.movieName)}}> Update </button>
            </div>
          )
          
        })}
      </div>

    </div>
  );
}

/** 
const submitReview = async() => {
  const response = await axios.post("/api/insert/", {
    params: {
      movieName: movieName,
      movieReview: movieReview
    }
  });
  console.log('hi');
  console.log(response.data);
  //console.log(response.data);
}
 **/

/** 
const submitReview = () => {
  Axios.post('http://localhost:3001/api/insert/', {
    movieName : movieName, 
    movieReview: movieReview
  }).then(() => {
    alert('success!');
  });
};
**/ 

export default App;
