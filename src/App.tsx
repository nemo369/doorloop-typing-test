import { Container } from '@mui/material'
import Board from './Board'
import AppFooter from './components/app/AppFooter'
import AppHeader from './components/app/AppHeader'
import { AppWrapper } from './store/context'

function App() {

  return (
    <AppWrapper >
      <div className='bg-gray-50'>
        <Container maxWidth="md" className="App ">
          <AppHeader />
          <main className="app-main">
            <Board />
          </main>
          <AppFooter />
        </Container>
      </div>
    </AppWrapper>
  )
}

export default App
