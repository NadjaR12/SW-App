import React, { useState, useEffect } from 'react'
import { FcLike } from 'react-icons/fc';
import { FcLikePlaceholder } from 'react-icons/fc';

export default function ToggleHeartFilm(props) {
  
  const [isFavorite, setIsFavorite] = useState(useFavorite)
  const [selectedFilm, setSelectedFilm] = useState([])

  let useFavorite;

  const checkFavorites = () => { 
    const getFavoriteFilms = JSON.parse(localStorage.getItem('favoriteFilms') || null)
    console.log(getFavoriteFilms)
    if (getFavoriteFilms !== null){
      useFavorite = (getFavoriteFilms.some(e => JSON.stringify(e.title) === JSON.stringify(props.film.title)))
    }
    console.log('useFav', useFavorite)
    return useFavorite
    
  }
  
  useEffect(() => {
    checkFavorites()
  }, [])

  const handleIsFavorite = () => {
    setIsFavorite(!isFavorite);
  }

  const addFav = () => {
    let array = selectedFilm;
    let addArray = true;
    array.map((item, key) => {
      if (item === props.film) {
        array.splice(key, 1);
        addArray = false
      }
    });
    if (addArray) {
      array.push(props.film);
    }
    setSelectedFilm([...array])

    // check if localStorage with key 'favoriteFilms' exists
    const favoriteFilms = localStorage.getItem('favoriteFilms');
    if(favoriteFilms){
      console.log('appending to existing Storage');
      // if favoriteFilms exists append data to the existing data of localStorage
      var existingStorage = JSON.parse(localStorage.getItem('favoriteFilms'));
      existingStorage.push(props.film)
      var updatedStorage = localStorage.setItem('favoriteFilms', JSON.stringify(existingStorage))
    }
    else {
      // create new storage
      console.log('Storage not found, creating new Storage');
      localStorage.setItem('favoriteFilms', JSON.stringify(selectedFilm))
    }
  }

  const removeFav = () => {
  var existingStorage = JSON.parse(localStorage.getItem('favoriteFilms'));
  // console.log('existingStorage', existingStorage)
  existingStorage.forEach((storedFilm, index) => {
    // if title from stored film === title of film to be removed, remove it from existing Storage
    if (storedFilm.title === props.film.title) {
      return existingStorage.splice(index, 1);
    }
  });
  localStorage.setItem('favoriteFilms', JSON.stringify(existingStorage))
  console.log('deleted')
  }

  return(
    <button  className='btn-heart' onClick={handleIsFavorite}>
      {isFavorite
        ?  (<FcLike className='img-heart' onClick={removeFav}
            />)
        :   (<FcLikePlaceholder className='img-heart' onClick={addFav}
            />) 
      }
    </button>
  )
} 
