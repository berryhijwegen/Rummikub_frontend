import React, { useState } from "react";
import socketIOClient from "socket.io-client";

import SocketContext from './socket-context'
import UserForm from "./components/Form/form";
import WaitingRoom from "./components/WaitingRoom/waitingRoom";

const ioSocketUrl = 'http://' + document.domain + ':5000';
const socket = socketIOClient(ioSocketUrl);

export default function App(props) {
  const [currentRoom, setCurrentRoom] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [players, setPlayers] = useState('');
  const [username, setUsername] = useState('');

  // verify our websocket connection is established
  socket.on('connect', () => console.log('Websocket connected!'));

  // message handler for the 'join_room' channel
  socket.on('join_room', data => {
    if (data['room'] && data['max_players'] && data['players']){
      setCurrentRoom(data['room']);
      setMaxPlayers(data['max_players']);
      setUsername(data['own_username']);
      setPlayers(data['players'])
    }
    else {
      console.log('Something went wrong');
    }
  });

  socket.on('new_player', data => {
    if (data['players']){
      setPlayers(data['players'])
    }
    else {
      console.log('Something went wrong');
    }
  });

  socket.on('error', data => console.log(data.error));

  const createGame = (maxPlayers, username) => {
    console.log('Creating game...');
    socket.emit('create', { max_players: maxPlayers, username: username });
  }

  const joinRoom = (username, roomNumber) => {
    console.log('Joining game...');
    socket.emit('join', { username: username, room: roomNumber });
  }

  return (
    <SocketContext.Provider value={socket}>
      <div className="container__main">
        {currentRoom && players
        ? <WaitingRoom roomNumber={currentRoom} players={players} maxPlayers={maxPlayers} username={username}  socket={socket}/>
        : <UserForm joinOnClick={joinRoom} createOnClick={createGame} socket={socket}/>
        }
      </div>
    </SocketContext.Provider>
  );
}
