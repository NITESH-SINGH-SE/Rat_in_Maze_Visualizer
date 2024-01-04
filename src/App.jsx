import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Maze from './components/Maze'

function App() {
  const [size, setSize] = useState(5);

  const changeSize = (n)=>{
    setSize(n)
  }

  return (
    <div className='bg-black h-screen w-full font-sans text-white flex flex-col align-middle'>
      <Navbar changeSize={changeSize}/>
      <Maze size={size}/>
    </div>
  )
}

export default App
