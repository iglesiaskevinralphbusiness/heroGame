import CloseButton from 'react-bootstrap/CloseButton';
import { useState } from 'react';

function Screen({ players, start, add, del, mechanics }){
    const [name, setName] = useState('');

    const handleClickAdd = () => {
        add(name);
        setName('');
    }

    return <div className="screen">
        <div className="col-left">
            <p className="player-lbl">Players ({ players.length })</p>
            <ul className="players-list">
                {
                    players.map((player, index) => {
                        return <li key={index}>
                            <span className="avatar"></span>
                            <span className="name">{ player.name }</span>
                            <span className="close"><CloseButton aria-label="Hide" variant="white" onClick={() => del(player.id)} /></span>
                        </li>
                    })
                }
            </ul>
        </div>
        <div className="col-right">
           <img src={require('../assets/title.png')} className="title" />
           <div className="button-default" onClick={() => start()}>Start</div>
           <div className="game-mechanincs" onClick={() => mechanics()}>Game Mechanics &gt;</div>
           <div className="add">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                 />
                <div className="button-add" onClick={() => handleClickAdd()}></div>
           </div>
        </div>
    </div>
}

export default Screen;