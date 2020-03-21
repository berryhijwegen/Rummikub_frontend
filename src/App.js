import React from "react";
import socketIOClient from "socket.io-client";

import UserForm from "./components/Form/form";

export default function App() {
  const ioSocketUrl = 'http://' + document.domain + ':5000';
  const socket = socketIOClient(ioSocketUrl);

  // verify our websocket connection is established
  socket.on('connect', () => console.log('Websocket connected!'));

  // message handler for the 'join_room' channel
  socket.on('join_room', msg => console.log(msg));

  socket.on('error', data => console.log(data));

  const createGame = () => {
    console.log('Creating game...');
    socket.emit('create', { number_of_players: 2, username: "Game Master" });
  }

  const joinRoom = (username, roomNumber) => {
    console.log('Joining game...');
    socket.emit('join', { username: username, room: roomNumber });
  }

  return (
    <div className="container__main">
      <UserForm joinOnClick={joinRoom} createOnClick={createGame}/>
    </div>
  );
}
