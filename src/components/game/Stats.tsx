import { useContext } from "react";
import { AppContext } from "../../store/context";
import Timer from "./Timer";
export default function Stats() {
  const { state: { gameProgress } } = useContext(AppContext);

  return (
    <div className="bg-stone-200 inner-padding py-2 md:py-4 ">
      {gameProgress.isStarted && (<PlayingStats
        correct={gameProgress.correctWords}
        typos={gameProgress.wordsWithTypos}

        typed={gameProgress.wordsTyped}

      />)}
    </div>
  )
}

import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AutofpsSelectIcon from '@mui/icons-material/AutofpsSelect';
import DangerousIcon from '@mui/icons-material/Dangerous';
const PlayingStats = ({ typed, correct, typos }: { typed: number, correct: number, typos: number }) => {
  return (
    <div className="flex  gap-x-3 md:gap-x-6 divide-x divide-white items-center tabular-nums">

      <Timer />
      <div className="flex items-center leading-none pl-2 justify-between gap-x-1 text-xl ml-4 md:ml-10">
        <span className="text-gray-500"><AutofpsSelectIcon /></span>
        <span>{correct}</span>
      </div>

      <div className="flex items-center leading-none pl-2 justify-between text-red gap-x-1 text-xl">
        <span className="text-gray-500"><DangerousIcon /></span>
        <span>{typos}</span>
      </div>
      <div className="flex items-center leading-none pl-2 justify-between text-green  gap-x-1 text-xl">
        <span className="text-gray-500"><SpellcheckIcon /></span>
        <span>{correct}</span>
      </div>

    </div>
  )
}

