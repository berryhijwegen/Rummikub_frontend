import './form.scss';


import React, { useState } from "react";

export default function Form(props) {
  const [username, setUsername] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  const handleUsernameChange = event => setUsername(event.target.value);
  const handleRoomNumberChange = event => setRoomNumber(event.target.value);

  const handleJoinSubmit = event => {
    event.preventDefault();
    props.joinOnClick(username, roomNumber);
  }

  const handleCreateSubmit = event => {
    event.preventDefault();
    props.createOnClick();
  }


  return (
    <div className="container__form">
      <h3>Rummikub</h3>
      Create Room
      <form onSubmit={handleJoinSubmit}>
        <input type="number" className="field" name="room_input" id="room_input" onChange={handleRoomNumberChange} value={roomNumber} />
        <input type="submit" className="submit__button" value="Join Room" />
      </form>
      Or...
      <hr/>
      Join Room
      <form onSubmit={handleCreateSubmit}>
        <input type="text" className="field" name="username" id="username" placeholder="Username" onChange={handleUsernameChange} value={username} />
        <input type="submit" className="submit__button" value="Create Game" />
      </form>
    </div>
  )
}