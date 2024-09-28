import React from 'react'
import Background from './components/Background'
import Foreground from './components/Foreground'

// Remove or comment out the unused import
// import background from './components/background'  


function App() {
  return (
    <div className='relative w-full h-screen bg-zinc-800 font-sf-pro-display'>

      <Background />
      <Foreground />


      
      </div>
  )
}

export default App