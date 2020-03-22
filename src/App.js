import React, { useState } from "react";
import socketIOClient from "socket.io-client";

import UserForm from "./components/Form/form";
import WaitingRoom from "./components/WaitingRoom/waitingRoom";

export default function App() {
  const [currentRoom, setCurrentRoom] = useState('')
  const [players, setPlayers] = useState('')
  const ioSocketUrl = 'http://' + document.domain + ':5000';
  const socket = socketIOClient(ioSocketUrl);

  // verify our websocket connection is established
  socket.on('connect', () => console.log('Websocket connected!'));

  // message handler for the 'join_room' channel
  socket.on('join_room', msg => {
    console.log(msg);
    if (msg['room'] && msg['players']){
      setCurrentRoom(msg['room']);
      setPlayers(msg['players'])
    }
    else {
      console.log('Something went wrong');
    }
  });

  socket.on('new_player', msg => {
    if (msg['players']){
      setPlayers(msg['players'])
    }
    else {
      console.log('Something went wrong');
    }
  });

  socket.on('error', data => console.log(data));

  const createGame = (username) => {
    console.log('Creating game...');
    socket.emit('create', { number_of_players: 2, username: username });
  }

  const joinRoom = (username, roomNumber) => {
    console.log('Joining game...');
    socket.emit('join', { username: username, room: roomNumber });
  }

  return (
    <div className="container__main">
      {currentRoom && players
      ? <WaitingRoom roomNumber={currentRoom} players={players}/>
      : <UserForm joinOnClick={joinRoom} createOnClick={createGame}/>
      }
    </div>
  );
}
