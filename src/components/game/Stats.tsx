import { useContext } from "react";
import { AppContext } from "../../store/context";
import Timer from "./Timer";

export default function Stats() {
  const { state: { gameProgress } } = useContext(AppContext);

  return (
    <div className="bg-stone-200 inner-padding py-2 md:py-4 ">
      {gameProgress.isStarted && (<PlayingStats time={gameProgress.timePassed}/>)}
    </div>
  )
}


const PlayingStats = ({time}:{time:number}) => {
  return (
    <div className="flex">

      <Timer time={time} />
      <div className="flex justify-between">
        <span className="text-gray-500">Words</span>
        <span>{1}</span>
        </div>

      </div>
  )
}

