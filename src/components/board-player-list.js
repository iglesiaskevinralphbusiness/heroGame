function BoardPlayerList({ players, activePlayer, setPlayer, shuffle, shuffleEnable }){
    return <>
        { shuffleEnable ? <div class="button-shuffle" onClick={() => shuffle()}></div> : null }
        <ul className="players-list">
            {
                players.map((player, index) => {
                    return <li key={index} className={index === activePlayer ? 'active' : null } onClick={()=> { setPlayer(index) }}>
                        <span className="name">{ player.name }</span>
                        <span className="score">{ player.points }</span>
                    </li>
                })
            }
        </ul>
    </>
}

export default BoardPlayerList;