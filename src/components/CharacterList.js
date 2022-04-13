import React, { useState, useEffect } from 'react'
import axios from 'axios';

import PopUpCharacterDetails from './PopUpCharacterDetails';

export default function CharacterList(props) {
    
    const [characters, setCharacters] = useState([])
    const [showPopUp, setShowPopUp] = useState(false)

    // get the single characters and store them in the characters state
        useEffect(() => {
            axios
                .get(props.character)
                .then((response) => {
                    setCharacters([...characters, response.data])
                });
        }, [] );
  
    return (
    <div>
    {characters === [] ? <div>Loading ...</div> :
    <ul>
    {characters.map((character) => {
        return (
            <React.Fragment>
            <li onClick={() => {setShowPopUp(!showPopUp)}}>{character.name}</li>
                {showPopUp && (
                    <PopUpCharacterDetails character={character} handleClose={() => setShowPopUp(false)}/>
                )}
            </React.Fragment>
        )
    })}
    </ul>
    } 
    </div>
    )
}
