import './waitingRoom.scss';

import React from "react";

export default function WaitingRoom(props){

    return (
        <div className="container__waiting">
            <h3>You are currently waiting in room {props.roomNumber}.</h3>
            <p>All players</p>
            <ul>
                {props.players.map((value, index) => {
                    return <li key={index}>{value}</li>
                })}
            </ul>
        </div>
    )
}