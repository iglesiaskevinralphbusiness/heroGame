function Indication({ activePlayer, players, heroes}){
    const remainingHeroes = heroes.filter((hero) => hero.answered === null);

    return <div className="indication">
        <img className="logo" src={require('../assets/title.png')} />
        <div className="current-turn">
            <span className="turn">Current Turn: </span>
            <span className="name">{ players[activePlayer].name }</span>
        </div>
        <div className="remaining-cards">
            <img src={require('../assets/icon-card.png')} />
            <span>{remainingHeroes.length} / { heroes.length }</span>
        </div>
    </div>;
}

export default Indication;