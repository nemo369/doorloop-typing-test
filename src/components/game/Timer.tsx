import React, { useEffect, useState } from 'react'
import { GAME_DURATION } from '../../consts/gameConsts';

export default function Timer({time}:{time:number}) {
  
  const [rotate, setRotate] = useState(0);
  console.log(time);
  
  useEffect(() => {
      const timePassed = Date.now() - time;
      const timeInPrecent = timePassed / GAME_DURATION / 1000;
      const rotateDeg = 360 * timeInPrecent;
      console.log(timeInPrecent);
      console.log(rotateDeg);
        setRotate(rotateDeg);
    }, [time])
    

  return (
<div className='border border-black rounded-full w-6 h-6 relative'>
    <div className="line w-1/2 h-px bg-black absolute inset-0 -rotate-90  my-auto ml-auto origin-left"
    style={{
       
        transform: `rotate(${rotate}deg)`
      }}
    ></div>
</div>
  )
}
