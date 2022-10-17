import './App.scss';
import './scss/scroll.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import Screen from './pages/screen';
import Board from './pages/board';
import Winner from './pages/winner';
import Mechanics from './pages/mechanics';
import { PARTICIPANTS, HEROES } from './constant';

function App() {

  const [screen, setScreen] = useState('start-screen');
  const [activePlayer, setActivePlayer] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [players, setPlayers] = useState(PARTICIPANTS);
  const [heroes, setHeroes] = useState(HEROES);
  const [shuffleEnable, setShuffleEnable] = useState(true);

  const handleAddPlayer = name => {
    const datas = [...players,{
      id: new Date().getTime(),
      name,
      avatar: '',
      points: 0,
      opacityLevel: 0,
    }];
    setPlayers(datas);
  }

  const handleDeletePlayer = id => {
    const datas = players.filter((player) => player.id !== id);
    setPlayers(datas);
  }

  const handleMoveToNextPlayer = () => {
    const total = players.length - 1;
    const remainingHeroes = heroes.filter((hero) => hero.answered === null);

    if(remainingHeroes.length <= 0){
      setScreen('winner');
    } else if(activePlayer === total){
      setActivePlayer(0);
    } else {
      setActivePlayer(activePlayer + 1);
    }
  }
  
  const handleSetPoints = (points) => {
    const playersData = [...players];
    playersData[activePlayer].points = playersData[activePlayer].points + points;
    setPlayers(playersData);
  }

  const handleSetHeroOpened = () => {
    const heroesData = [...heroes];
    heroesData[activeCard].answered = players[activePlayer].name;
    setHeroes(heroesData);
  }

  const handeSetManualActivePlayer = (index) => {
    setActivePlayer(index);
  }

  const handleSetTotalWrong = () => {
    const data = [...heroes];
    if(data[activeCard].opacityLevel < 8){
      data[activeCard].opacityLevel = data[activeCard].opacityLevel + 1;
      setHeroes(data);
    }
  }

  const shuffle = () => {
    var array = [...players];
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    setPlayers(array);
}
  
  return (
    <div className="main">
      { screen === 'start-screen' ? <Screen
        players={players}
        start={() => setScreen('board')}
        add={handleAddPlayer}
        del={handleDeletePlayer}
        mechanics={() => setScreen('mechanics')}
      /> : null }
      { screen === 'board' ? <Board
        activePlayer={activePlayer}
        activeCard={activeCard}
        players={players}
        heroes={heroes}
        setActiveCard={setActiveCard}
        nextPlayer={handleMoveToNextPlayer}
        setPoints={handleSetPoints}
        setHeroOpened={handleSetHeroOpened}
        setPlayer={handeSetManualActivePlayer}
        handleSetTotalWrong={handleSetTotalWrong}
        shuffle={shuffle}
        shuffleEnable={shuffleEnable}
        setShuffleEnable={setShuffleEnable}
      /> : null }
      { screen === 'winner' ? <Winner
        players={players}
      /> : null }
      { screen === 'mechanics' ? <Mechanics setScreen={setScreen} /> : null }
    </div>
  );
}


export default App;
