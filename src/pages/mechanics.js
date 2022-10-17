function Mechanics({ setScreen }){
    return <>
        <div className="mechanics">
            <div className="back" onClick={() => setScreen('start-screen')}>&lt; BACK TO GAME</div>
            <img  src={require('../assets/mechanics/1.png')} />
            <img  src={require('../assets/mechanics/2.png')} />
            <img  src={require('../assets/mechanics/3.png')} />
            <img  src={require('../assets/mechanics/4.png')} />
        </div>
    </>
}

export default Mechanics;