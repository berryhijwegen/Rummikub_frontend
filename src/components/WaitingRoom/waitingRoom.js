import './waitingRoom.scss';

import React, { useState } from "react";

export default function WaitingRoom(props){
    const [countDown, setCountDown] = useState('');

    props.socket.on('countdown', data => {
        console.log(data);
        setCountDown(data['seconds_left'])
    });
    
    props.socket.on('cancel_start', data => {
        console.log(data); 
        setCountDown('');
    })
        
    props.socket.on('start', data => {
        console.log(data); 
    })


    return (
        <div className="container__waiting">
            <h3>You are currently waiting in room {props.roomNumber}.</h3>
            {countDown ? <h3>Game starts in {countDown} seconds!</h3> : null}
            <h4>({props.players.length}/{props.maxPlayers})</h4>
            <p>All players</p>
            <ul>
                {props.players.map((value, index) => {
                    return <li className={props.username === value ? 'bolded' : null} key={index}>{value}</li>
                })}
            </ul>
        </div>
    )
}