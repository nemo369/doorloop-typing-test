import { Alert, Typography } from '@mui/material'
import React from 'react'

function AppHeader() {
  return (
    <header className="app-header flex flex-col items-center justify-between">
      <Typography component="h1" variant="subtitle1" gutterBottom className='capitalize'>
        Welcome to Typing Speed Test
        <span className='hidden sm:inline text-xs text-black/70'>
          &nbsp;(Doorloop home assignment)

        </span>
      </Typography>
      <div className='hidden md:block'>

      <Alert severity="info" >Can your fingers type fast inef for
        <a href="https://doorloop.com" className='text-red ' target="_blank"> DooLoop?</a>
        <br />
        Do the one-minute typing test to find out! Press the space bar after each word. At the end, you'll get your typing speed in CPM and WPM. Good luck!
      </Alert>
      </div>

    </header>
  )
}

export default AppHeader