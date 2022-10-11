import { TextField } from "@mui/material";
import { useContext, useRef } from "react";
import { AppContext } from "../../store/context";
import { GameProgressActionType, WordsActionType } from "../../store/reducers";
import { isSpaceKey } from "../../utils/utils";


export default function () {
  const { state, dispatch } = useContext(AppContext);
  if(state.gameProgress.isFinished) {
    return null
    }
  const inputRef = useRef<HTMLInputElement>(null);
  const setGameStarted = () => {
    
    if (state.gameProgress.isStarted) {
      return;
    }
    dispatch({ type: GameProgressActionType.START_GAME });
  
  }

  const addWord = (newWord: string) => {
    const isCorrect = newWord === state.words[state.gameProgress.currentWordIndex].word;
    dispatch({
      type: GameProgressActionType.TYPED_WORD, payload: {
        correctWords: !isCorrect ? 0 : 1,
        wordsWithTypos: isCorrect ? 0 : 1
      }
    });
    dispatch({
      type: WordsActionType.SET_WORD, payload: {
        word: {
          ...state.words[state.gameProgress.currentWordIndex],
          isCorrect,
          wasDisplayed: true,
        },
        index: state.gameProgress.currentWordIndex,
      }
    });
  }

  const keyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentWord = inputRef.current?.value;
    setGameStarted();
    if ((isSpaceKey(e.key) ||
      e.code == "Space" // e.keyCode == 32
    ) && currentWord
    ) {
      addWord(currentWord.trim());
      inputRef.current!.value = "";
    }

  }


  return (
    <div className="bg-gray-200 inner-padding py-2 md:py-4 mt-auto">
      <TextField
        inputRef={inputRef}
        onKeyUp={keyPressHandler}
        fullWidth autoComplete="off" autoCorrect="off"
        className="pt-2" label="Fast Typing over here.." variant="outlined"
      />

    </div>
  )
}
