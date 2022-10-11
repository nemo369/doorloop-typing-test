import { Dispatch, createContext, useReducer, ReactNode, useContext } from 'react';
import { GameProgress, State } from '../types/store.type';
import { Word } from '../types/word.type';
import { getWordBank } from '../utils/utils';
import { GameProgressActions, gameProgressReducer, WordsActions, wordsReducer } from './reducers';


export const gameProgressInitialState: GameProgress = {
    isStarted: false,
    isFinished: false,
    startTime: null,
    endTime: null,
    currentWordIndex: 0,
    correctWords: 0,
    wordsWithTypos: 0,
    wordsTyped: 0,
    timePassed: 0,
}

const initialState: State = {
    words: getWordBank(),
    gameProgress: {
       ...gameProgressInitialState
    }
}


const AppContext = createContext<{
    state: State;
    dispatch: Dispatch<GameProgressActions | WordsActions>;
}>({
    state: initialState,
    dispatch: () => null
});
const useAppContext = () => useContext(AppContext);

const mainReducer = ({ gameProgress, words} : State, action:GameProgressActions | WordsActions) => ({
    gameProgress: gameProgressReducer(gameProgress, action as GameProgressActions), // TODO: fix this "as" type assertion
    words: wordsReducer(words, action as WordsActions)
});

const AppWrapper = ({ children } :{ children: ReactNode}) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppWrapper, useAppContext };