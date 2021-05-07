import React from "react";
import './Track.css';

function Track(props) {
    const addTrack = () => {
        props.onAdd(props.track);
    };

    const removeTrack = () => {
        props.onRemove(props.track);
    };

    const renderAction = (isRemoval) => (
        isRemoval ?
            <button className='Track-action' onClick={removeTrack}>-</button> :
            <button className='Track-action' onClick={addTrack}>+</button>
    );

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            {renderAction(props.isRemoval)}
        </div>
    );
}

export default Track