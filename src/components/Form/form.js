import './form.scss';

import React, { useState } from "react";

export default function Form(props) {
  const [usernameCreate, setUsernameCreate] = useState('');
  const [usernameJoin, setUsernameJoin] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [error, setError] = useState('');

  const handleUsernameCreateChange = event => setUsernameCreate(event.target.value);
  const handleUsernameJoinChange = event => setUsernameJoin(event.target.value);
  const handleRoomNumberChange = event => setRoomNumber(event.target.value);

  const handleJoinSubmit = event => {
    event.preventDefault();
    if (usernameJoin && !(roomNumber === '')){
      props.joinOnClick(usernameJoin, roomNumber);
    }
    else if (roomNumber === ''){
      setError("Room Number is required to join room!");
    }
    else {
      console.log(usernameJoin);
      setError("Username is required to join room!");
    }
  }

  const handleCreateSubmit = event => {
    event.preventDefault();
    if (usernameCreate){
      props.createOnClick(usernameCreate);
    }
    else {
      setError("Username is required to create room!");
    }
    
  }


  return (
    <div className="container__form">
      <h3>Rummikub</h3>
      Join Room
      <form onSubmit={handleJoinSubmit}>
        <input type="number" className="field" name="room_input" id="room_input" onChange={handleRoomNumberChange} value={roomNumber} />
        <input type="text" className="field" name="username" id="username" placeholder="Username" onChange={handleUsernameJoinChange} value={usernameJoin} />
        <input type="submit" className="submit__button" value="Join Room" />
      </form>
      Or...
      <hr/>
      Create Room
      <form onSubmit={handleCreateSubmit}>
        <input type="text" className="field" name="username" id="username" placeholder="Username" onChange={handleUsernameCreateChange} value={usernameCreate} />
        <input type="submit" className="submit__button" value="Create Room" />
      </form>
      {error ? <p>{error}</p> : null}
    </div>
  )
}