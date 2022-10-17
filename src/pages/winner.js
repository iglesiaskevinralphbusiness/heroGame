function Winner({ players }){
    const getRankings = players.sort((a,b) => b.points - a.points);

    return <div className="winner">
        <div className="winner-container">
            <img className="confetti" src={require('../assets/confetti.gif')} />
            <div className="first">{ getRankings[0].name } <span>{ getRankings[0].points } points</span></div>
            <div className="second">{ getRankings[1].name } <span>{ getRankings[1].points } points</span></div>
            <div className="third">{ getRankings[2].name } <span>{ getRankings[2].points } points</span></div>

            <ul>
                {
                    getRankings.slice(3).map((rank, index) => {
                        return <li key={'rank' + index}>{ rank.name } ({ rank.points} points)</li>
                    })
                }
            </ul>
        </div>
    </div>;
}

export default Winner;