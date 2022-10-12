import { useContext, useRef } from 'react';
import { AppContext } from '../../store/context';
import { Word } from '../../types/word.type';
import { isBoolean } from '../../utils/utils';

export default function WordBank() {
  const {state}= useContext(AppContext);

  return (
    <ol className='inner-padding flex flex-wrap gap-x-1.5 gap-y-1 overflow-y-auto max-h-[270px] md:max-h-[300px] pr-1 pt-2'>
        {state.words.map((word, index) => (
            <li key={index}><WordCmp word={word} isCurrent={index === state.gameProgress.currentWordIndex}/></li>
        ))}
    </ol>
  )
}
const WordCmp = ({word, isCurrent}:{word:Word, isCurrent:boolean}) => {
    const elRef = useRef<HTMLDivElement>()

    const scrollToView = () => {
        if(!elRef.current){
            return;
        }
        elRef.current.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
    }
    if(isCurrent){
        scrollToView();
    }
    return (
        <div
        ref={elRef}
        className={
            `py-2 px-1 rounded-md flex items-center gap-x-1 bg-stone-50 
            ${isBoolean(word.isCorrect) && word.isCorrect ? 'text-green' : ''}
            ${isBoolean(word.isCorrect) && !word.isCorrect ? 'text-red' : ''}
             ${isCurrent ? 'bg-green' : ''}`

        }>
            {word.word}
        </div>
    )
}