import React, { useEffect, useState } from 'react'
import { GAME_DURATION } from '../../consts/gameConsts';
import { useAppContext } from '../../store/context';
import { GameProgressActionType } from '../../store/reducers';

const timeOut = 100;

export default function Timer() {
  const isTimePassed = (timePassed: number) => {
    const timeLimit = GAME_DURATION;
    return timePassed >= timeLimit;
  }

  const [rotate, setRotate] = useState(0);
  const { state: { gameProgress }, dispatch } = useAppContext();


  const calcRotate = (timePassed: number) => {
    const rotateDeg = timePassed / GAME_DURATION * 360;
    setRotate(rotateDeg - 90);
  }


  const setGameTimer = () => {
    const startDate = gameProgress.startTime ? gameProgress.startTime.getTime() : 0;
    if (gameProgress.isFinished || !gameProgress.isStarted || !startDate) {
      return;
    }
    const timePassed = Date.now() - startDate;


    if (!isTimePassed(timePassed)) {
      dispatch({ type: GameProgressActionType.SET_TIME, payload: timePassed });
      calcRotate(timePassed);
      setTimeout(() => {
        setGameTimer();
      }, timeOut);
    } else {
      dispatch({ type: GameProgressActionType.END_GAME });

    }

  }

  // console.log(time);

  useEffect(() => {
    setGameTimer();
  }, [gameProgress.isStarted])

  if (gameProgress.isFinished) {
    return <div className='border border-black bg-green rounded-full w-6 h-6 relative shadow mr-3' />
  }
  


  return (
    <div className='border border-black rounded-full w-6 h-6 relative shadow mr-3'>
      <div className="line w-1/2 h-[2px] bg-red absolute inset-0 -rotate-90  my-auto ml-auto origin-left "
        style={{

          transform: `rotate(${rotate}deg)`
        }}
      >
        {/* {gameProgress.timePassed} */}

      </div>
    </div>
  )
}
