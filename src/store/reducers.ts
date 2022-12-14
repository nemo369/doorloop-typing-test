import { GameProgress } from "../types/store.type";
import { Word } from "../types/word.type";
import { getWordBank } from "../utils/utils";
import { gameProgressInitialState } from "./context";
type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    }
};

export enum WordsActionType {
    SET_WORD = 'SET_WORD',
    RESET_STATE = 'RESET_STATE',
}
type WordsPayload = {
    [WordsActionType.SET_WORD]: {
        word: Word;
        index: number;
    };
    [WordsActionType.RESET_STATE]: undefined;
}

export enum GameProgressActionType {
    START_GAME = 'START_GAME',
    TYPED_WORD = 'TYPED_WORD',
    SET_TIME = 'SET_TIME',
    END_GAME = 'END_GAME',
    RESET_STATE = 'RESET_STATE',

}

type GameProgressPayload = {
    [GameProgressActionType.START_GAME]: undefined;
    [GameProgressActionType.TYPED_WORD]: {
        correctWords: number;
        wordsWithTypos: number;
    };
    [GameProgressActionType.SET_TIME]: number;
    [GameProgressActionType.END_GAME]: undefined;
    [GameProgressActionType.RESET_STATE]: undefined;
}

export type GameProgressActions = ActionMap<GameProgressPayload>[keyof ActionMap<GameProgressPayload>];
export type WordsActions = ActionMap<WordsPayload>[keyof ActionMap<WordsPayload>];

export const gameProgressReducer = (state: GameProgress, action: GameProgressActions): GameProgress => {

    switch (action.type) { // switch case is a bad practice
        case GameProgressActionType.END_GAME:
            return {
                ...state,
                isFinished: true,
            };
        case GameProgressActionType.SET_TIME:
            return {
                ...state,
                timePassed: action.payload,
            };
        case GameProgressActionType.TYPED_WORD:
            return {
                ...state,
                currentWordIndex: state.currentWordIndex + 1,
                wordsTyped: state.wordsTyped + 1,
                correctWords: state.correctWords + action.payload.correctWords,
                wordsWithTypos: state.wordsWithTypos + action.payload.wordsWithTypos,
            };
        case GameProgressActionType.START_GAME:
            return { ...state, isStarted: true, startTime: new Date() };
        case GameProgressActionType.RESET_STATE:
            return { ...gameProgressInitialState};
        default:
            return state;
    }
}
export const wordsReducer = (state: Word[], action: WordsActions): Word[] => {
    switch (action.type) { // switch case is a bad practice
        case WordsActionType.SET_WORD:
            const { index, word } = action.payload;
            return [...state.slice(0, index), word, ...state.slice(index + 1)];
            case WordsActionType.RESET_STATE:
                return getWordBank();
        default:
            return state;
    }
}
