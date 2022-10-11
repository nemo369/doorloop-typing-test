import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import GameEnd from './components/game/GameEnd';
import Stats from './components/game/Stats';
import TypingInput from './components/game/TypingInput';
import WordBank from './components/game/WordBank';


export default function Board() {
    return (
        <Paper elevation={1} className='board flex flex-col' component="section" sx={{  border: '1px dashed #ffe3ef' }}>
            <Stats />
            <GameEnd/>
            <WordBank />
            <TypingInput />
        </Paper>
    )
}
