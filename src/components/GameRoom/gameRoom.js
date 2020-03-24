import './gameRoom.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; 
import React, { useState, useEffect } from 'react';

export default function GameRoom(props) {
    useEffect(() => {

    })

    const onDragEnd = result => {

    }


    return (
        <DragDropContext>
            <div className='container__game'>
                <div className='table'>

                </div>
                <Droppable droppableId={'droppable1'} direction={"horizontal"}>
                    {(provided) => (
                        <div className='rack' 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {props.stones.map((stone, index) => {
                                return (
                                    <Draggable draggableId={'draggable' + index} index={index} key={index}>
                                        {(provided) => (
                                            <div 
                                                className='stone' 
                                                key={index} 
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <div className='square' style={{color: stone[1]}}>
                                                    {stone[0]}
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                    
                </Droppable>
            </div>
        </DragDropContext>
    )
}