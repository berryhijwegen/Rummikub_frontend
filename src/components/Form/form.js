import './form.scss';
import React, { useState } from "react";

export default function Form(props) {
  const [usernameCreate, setUsernameCreate] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(2);


  const [usernameJoin, setUsernameJoin] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  const [joinError, setJoinError] = useState('');
  const [createError, setCreateError] = useState('');

  const handleUsernameCreateChange = event => setUsernameCreate(event.target.value);
  const handleUsernameJoinChange = event => setUsernameJoin(event.target.value);
  const handleRoomNumberChange = event => setRoomNumber(event.target.value);
  const handleMaxPlayersChange = event => setMaxPlayers(event.target.value);

  const handleJoinSubmit = event => {
    event.preventDefault();
    if (usernameJoin && !(roomNumber === '')) {
      props.joinOnClick(usernameJoin, roomNumber);
    }
    else if (roomNumber === '') {
      setJoinError("Room Number is required to join room!");
    }
    else {
      console.log(usernameJoin);
      setJoinError("Username is required to join room!");
    }
  }

  const handleCreateSubmit = event => {
    event.preventDefault();
    if (usernameCreate) {
      props.createOnClick(maxPlayers, usernameCreate);
    }
    else {
      setCreateError("Username is required to create room!");
    }

  }

  props.socket.on('join_error', data => setJoinError(data.error));
  props.socket.on('create_error', data => setCreateError(data.error));

  return (
    <div className="container__form">
      <h3>Rummikub</h3>
      Join Room
      <form onSubmit={handleJoinSubmit}>
        <input type="number" className="field" name="room_input" id="room_input" onChange={handleRoomNumberChange} value={roomNumber} />
        <input type="text" className="field" name="username" id="username" placeholder="Username" onChange={handleUsernameJoinChange} value={usernameJoin} />
        {joinError ? <p>{joinError}</p> : null}
        <input type="submit" className="submit__button" value="Join Room" />
      </form>
      Or...
      <hr />
      Create Room
      <form onSubmit={handleCreateSubmit}>
        <input type="number" className="field" name="maxPlayers" id="maxPlayers" onChange={handleMaxPlayersChange} value={maxPlayers} min="2" max="4" />
        <input type="text" className="field" name="username" id="username" placeholder="Username" onChange={handleUsernameCreateChange} value={usernameCreate} />
        {createError ? <p>{createError}</p> : null}
        <input type="submit" className="submit__button" value="Create Room" />
      </form>
    </div>
  )
}