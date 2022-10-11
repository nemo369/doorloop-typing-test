import { WORDS } from "../consts/gameConsts";
import { Word } from "../types/word.type";

export const getWordBank = ():Word[]=> {
    return shuffle(WORDS).map((word, index) => ({
        word,
        isCorrect: null,
        wasDisplayed: false,
        isCurrent: false,
    }))
};

export const isBoolean = (value: any): value is boolean => {
    return typeof value === 'boolean';
}

export const shuffle = <T>(array: T[]) => {
    return array.sort(() => Math.random() - 0.5);
}

export const isLetterKey = (key: string): boolean => {
    return key.length === 1 && !!key.match(/[a-z]/i);
}

export const isSpaceKey = (key: string): boolean => {
    return key === ' ';
}