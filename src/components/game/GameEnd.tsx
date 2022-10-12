import { Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { GAME_DURATION, WORDS } from '../../consts/gameConsts';
import { useAppContext } from '../../store/context';
import { GameProgressActionType } from '../../store/reducers';

export default function GameEnd() {
    const { state, dispatch } = useAppContext();

    const reSetState = () => {
        dispatch({ type: GameProgressActionType.RESET_STATE });
    }

    const calcWpm = () => {
        const { gameProgress: { correctWords, timePassed } } = state;
        const timeInMinutes = timePassed / GAME_DURATION;
        return Math.round(correctWords / timeInMinutes);
    }

    const calcAccuracy = () => {
        const { gameProgress: { wordsWithTypos, wordsTyped } } = state;
        return Math.round((wordsWithTypos / wordsTyped) * 100);
    }
    if (!state.gameProgress.isFinished) {
        return null
    }

    const getText = () => {
        const wpm = calcWpm();
        console.log(wpm/ WORDS.length);
        
        let text = ``;
        if(wpm/ WORDS.length < 0.3){
            text += `You need to practice more.`
        }
        if(wpm/ WORDS.length > 0.3 && wpm/ WORDS.length < 0.4){
            text += `You are doing good.`}
        if(wpm/ WORDS.length > 0.4){
            text += `You are a pro. you can work at DoorLoop as a developer.`}
     
        return text;
    }
    return (
        <div className='text-center mt-6 max-w-sm mx-auto'><p>
            <Typography variant='h2' component='div'> 
            Game Over!
            </Typography>
            <Typography variant='h6' component='div'>
            {getText()}
            </Typography>
            <Typography variant='subtitle1' component='ul' className='flex flex-col justify-start items-start list-disc space-y-2' > 
                <li>Words Per Minute {calcWpm()}</li>
                <li>Accuracy: {calcAccuracy()}% </li>
                <li>Correct words: {state.gameProgress.correctWords}</li>
                <li>Words with typos: {state.gameProgress.wordsWithTypos}</li>
                <li>Time passed: {state.gameProgress.timePassed}</li>

            </Typography>
        </p>
        <div  className='mt-6'>

            <Button onClick={reSetState} variant='contained'>
                Play Again!
            </Button>
        </div>
        </div>
    )
}
