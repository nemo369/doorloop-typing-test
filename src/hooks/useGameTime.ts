import { useContext, useState } from "react";
import { GAME_DURATION } from "../consts/gameConsts";
import { AppContext, useAppContext } from "../store/context";
import { GameProgressActionType } from "../store/reducers";
import { GameProgress } from "../types/store.type";


const isTimePassed = (timePassed: number) => {
    const timeLimit = GAME_DURATION;
    return timePassed >= timeLimit;
}
export const useGameTime = () => {
    const timeOut = 100;
    const {  dispatch } = useAppContext();
    const setGameTimer = ( startDate:number) => {
        const startTime = Date.now() - startDate;
        
        if(!isTimePassed(startTime)) {
            const time = new Date().getTime() - startTime;
            dispatch({ type: GameProgressActionType.SET_TIME, payload: time });
            setTimeout(() => {
                setGameTimer(startDate);
            }, timeOut);
        } else{
            dispatch({ type: GameProgressActionType.END_GAME});

        }

    }

    return {
        setGameTimer,
    }
};