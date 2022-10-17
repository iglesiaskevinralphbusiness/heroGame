import BoardPlayerList from '../components/board-player-list';
import Indication from '../components/indication';
import CardModal from '../components/card-modal';
import { useState } from 'react';

function Board({ activePlayer, activeCard, players, heroes, setActiveCard, nextPlayer, setPoints, setHeroOpened, setPlayer, handleSetTotalWrong, shuffle, shuffleEnable, setShuffleEnable }){
    const [activeModal, setActiveModal] = useState(false);

    const getSource = (name) => {
        try{
            return require('../assets/heroes/' + name + '.png');
        }
        catch(err){
            return require('../assets/heroes/default.png');
        }
    }

    const handleSelectCard = (id) => {
        if(heroes[id].answered === null){
            setActiveModal(true);
            setActiveCard(id);
            setShuffleEnable(false);
        }
    }
    const handleWrongAnswer = () => {
        handleSetTotalWrong();
        setActiveModal(false);
        nextPlayer();
    }

    return <div className="board">
        <div className="col-left">
            <BoardPlayerList players={players} activePlayer={activePlayer} setPlayer={setPlayer} shuffle={shuffle} shuffleEnable={shuffleEnable} />
        </div>
        <div className="col-right">
            { activeModal ? <CardModal hero={heroes[activeCard]} close={handleWrongAnswer} point={setPoints} heroOpened={setHeroOpened} next={nextPlayer} /> : null }
            <Indication heroes={heroes} activePlayer={activePlayer} players={players} />
            <div className="cards">
                <ul>
                    {
                        heroes.map((hero, index) => {
                            return <li key={'hero' + index} onClick={() => handleSelectCard(index) } className={hero.answered !== null ? 'opened' : null }>
                                <div className="card-block">
                                    <span className="numbering">{ hero.id }</span>
                                    <img src={getSource(hero.name)} className={'opa-' + hero.opacityLevel} />
                                </div>
                            </li>;
                        })
                    }
                </ul>
            </div>
        </div>

    </div>

}

export default Board;