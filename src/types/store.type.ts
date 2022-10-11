import { Word } from "./word.type";

export interface State {
    gameProgress: GameProgress;
    words: Word[];

}

export interface GameProgress{
    isStarted: boolean;
    isFinished: boolean;
    startTime: Date | null;
    endTime: Date | null;
    currentWordIndex: number;
    correctWords: number;
    wordsWithTypos: number;
    wordsTyped: number;
    timePassed: number; // in miliseconds
    // wordsPerMinute: number;
    // accuracy: number;

}