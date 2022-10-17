import { useState } from 'react';

function CardModal({ hero, close, point, heroOpened, next }){
    const [correct, setCorrect] = useState(null);
    const [rewardTime, setRewardTime] = useState(false);
    const [rewards, setRewards] = useState([
        { points: 2, active: false, opened: false },
        { points: 4, active: false, opened: false },
        { points: 8, active: false, opened: false },
    ]);

    const getSource = (name) => {
        try{
            return require('../assets/heroes/' + name + '.png');
        }
        catch(err){
            return require('../assets/heroes/default.png');
        }
    }

    const getBackground = () => {
        const val = Math.floor(Math.random() * 4) + 1;
        return correct ? require('../assets/heroes-bg/' + val + '.png') : null;
    }

    const handleClickCorrect = (e) => {
        if(correct === null){
            e.stopPropagation();
            setCorrect(true);
            heroOpened();
            setTimeout(() => {
                setRewards(shuffle(rewards));
                setRewardTime(true);
            }, 3000);
        }
    }
    const handleClickWrong = (e) => {
        e.stopPropagation();
        if(correct === null){
            setCorrect(false);
            setTimeout(() => {
                close(false);
            }, 3000);
        }
    }

    const getTreassureStatus = (reward) => {
        if(reward.active && reward.opened){
            return 'opened-mine';
        } else if(!reward.active && reward.opened){
            return 'opened';
        } else {
            return 'closed';
        }
    }

    const openTreasure = (selected) => {
        const data = rewards.map((reward) => {
            const active = reward.points === selected.points ? true : false;
            if(active){
                point(reward.points);
                setTimeout(() => {
                    next();
                    close(false);
                }, 3000);
            }
            return {
                points: reward.points,
                active,
                opened: true,
            }
        });
        setRewards(data);
    }

    const shuffle = (array) => {
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
        return array;
    }

    if(rewardTime){
        return <div className="reward-modal">
            <img className="title" src={require('../assets/choose-reward.png')} />
            <div className="reward-container">
                {
                    rewards.map((reward) => {
                        return <div className={"box " + getTreassureStatus(reward)} onClick={() => openTreasure(reward)}>
                            <div className="coin">{ reward.points}<span>points</span></div>
                        </div>;
                    })
                }
            </div>
        </div>;
    }


    return <div className={"card-modal " + (correct ? 'correct' : '') } onClick={(e) => { handleClickWrong(e) }}>
        { correct === null ? <img className="logo" src={require('../assets/title.png')} /> : null }
        { correct === true ? <Correctcomp /> : null }
        { correct === false ? <Wongcomp /> : null }
        
        <div className="card-container">
            <div className="card-block"
                style={{  
                    backgroundImage: "url(" + getBackground() + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                onClick={(e) => { handleClickCorrect(e) }}
            >
                <img src={getSource(hero.name)} className={ correct === true ? null : 'opa-' + hero.opacityLevel} />
                { correct === true ? <div className="hero-name">
                    { hero.name }
                </div> : null }
            </div>
        </div>
    </div>
}

const Correctcomp = () => {
    return <>
        <img className="confetti" src={require('../assets/confetti.gif')} />
        <h2 className="correct">CORRECT!</h2>
    </>
}

const Wongcomp = () => {
    return <h2 className="wrong">WRONG!</h2>;
}

export default CardModal;