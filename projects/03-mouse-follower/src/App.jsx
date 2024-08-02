import { useEffect, useState } from 'react'
import './App.css'

const FollowMouse = () => {
  const [enabled, setEnable] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
    
    useEffect(() => {
      console.log('hola', { enabled })
  
      const handleMove = (event) => {
        const { clientX, clientY } = event
        console.log('handleMove', { clientX, clientY })
        setPosition({ x: clientX, y: clientY })
      }
      if (enabled) {
  
        window.addEventListener('pointermove', handleMove)
      }
      // cleanup
      return () => {
        window.removeEventListener('pointermove', handleMove)
      }
    }, [enabled])

    useEffect(() => {
      document.body.classList.toggle('no-cursor', enabled)

      return () => {
        document.body.classList.remove('no-cursor')
      }
    },[enabled] )
  
    return(
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={() => setEnable(!enabled)} >
        {enabled ? 'Desactivar' : 'Activar'}
      </button>
    </>
    )
  }


function App() {
  return (
    <main>
      <FollowMouse/>
    </main>
  )
}

export default App
