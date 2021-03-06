import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ToggleHeartCharacter from './ToggleHeartCharacter';

export default function PopUpCharacterDetails(props) {

    const [homeworld, setHomeworld] = useState(null)

    useEffect(() => {
        axios
            .get(`${props.character.homeworld}`)
            .then((response) => {
                // console.log('response.data', response.data);
                setHomeworld(response.data)
            })
            .catch(err => console.log(err))
    }, [] );

    return (
        <React.Fragment>
            {homeworld === null ? <div>Loading ...</div> :
            <div className='detail-card-container'>
                <img src='/characters/luke-skywalker.jpg' alt='young luke'/>
                <h5>Name: {props.character.name}</h5>
                <h5>Gender: {props.character.gender}</h5>
                <h5>Homeworld: {homeworld.name}</h5>
                <h5>Description: {props.character.name} has {props.character.hair_color} hair, is {props.character.eye_color} eyed and {props.character.height} tall.</h5>
                <ToggleHeartCharacter character={props.character}/>
            </div>
            }
        </React.Fragment>
    )
}
