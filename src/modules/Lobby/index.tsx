import Image from 'next/image'
import { useEffect, useState } from 'react'

import Typography from '@/common/components/base/Typography'

import Navbar from './components/Navbar'

const LobbyPage = () => {
  const [count, setCount] = useState(0)
  const [on, setOn] = useState(false)
  const [spacePressed, setSpacePressed] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode && !spacePressed) {
        // Space key
        setSpacePressed(true)
        setOn(true)
        setCount((prev) => prev + 1)
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.keyCode) {
        // Space key
        setSpacePressed(false)
        setOn(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [spacePressed])

  return (
    <div className="flex flex-col min-h-screen relative w-full">
      <div className="flex absolute top-0 left-0 right-0 h-full items-center justify-center">
        <Image src="/popcat/background.png" fill alt="background" className="object-cover pointer-events-none" />
      </div>
      <Typography
        className="absolute text-white !text-[90px] left-1/2 top-24 transform -translate-x-1/2 z-[20]"
        variant="h1"
      >
        {count.toLocaleString()}
      </Typography>
      <Image
        src={on ? '/popcat/on-cat.png' : '/popcat/off-cat.png'}
        width={500}
        height={300}
        alt="background"
        className="object-contain absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none"
      />
      <div
        className="flex w-full h-full absolute top-0 left-0 z-[10]"
        onMouseDown={() => {
          setOn(true)
          setCount((prev) => prev + 1)
        }}
        onMouseUp={() => setOn(false)}
        onMouseLeave={() => setOn(false)}
      />

      <Navbar />
    </div>
  )
}

export default LobbyPage
