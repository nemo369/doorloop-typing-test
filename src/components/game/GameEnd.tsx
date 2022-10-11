import { Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { GAME_DURATION } from '../../consts/gameConsts';
import { useAppContext } from '../../store/context';
import { GameProgressActionType } from '../../store/reducers';

export default function GameEnd() {
    const { state, dispatch } = useAppContext();

    const reSetState = () => {
        dispatch({ type: GameProgressActionType.RESET_STATE });
    }

    const calcWpm = () => {
        const { gameProgress: { wordsTyped, timePassed } } = state;
        const timeInMinutes = timePassed / GAME_DURATION;
        return Math.round(wordsTyped / timeInMinutes);
    }

    const calcAccuracy = () => {
        const { gameProgress: { correctWords, wordsWithTypos } } = state;
        const totalWords = correctWords + wordsWithTypos;
        return Math.round((correctWords / totalWords) * 100);
    }
    if (!state.gameProgress.isFinished) {
        return null
    }
    return (
        <div className='text-center mt-6 max-w-sm mx-auto'><p>
            <Typography variant='h2' component='span'> 
            Game Over!
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
