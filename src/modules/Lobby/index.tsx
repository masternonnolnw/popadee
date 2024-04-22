import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

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

  const constraintsRef = useRef(null)

  return (
    <motion.div ref={constraintsRef} className="flex flex-col min-h-screen relative w-full overflow-hidden">
      {/* score board */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        whileDrag={{
          scale: 1.1,
          zIndex: 3,
        }}
        className="flex flex-col gap-2 w-[400px] absolute right-5 rounded-md p-4 top-10 z-40 bg-black bg-opacity-50"
      >
        <Typography variant="h3" className="w-full text-center text-white">
          Scoreboard
        </Typography>
        <div className="flex flex-row justify-between">
          <Typography variant="h4" className="text-white">
            Year 3
          </Typography>
          <Typography variant="h4" className="text-white">
            {(1012 + count).toLocaleString()}
          </Typography>
        </div>
        <div className="flex flex-row justify-between">
          <Typography variant="h4" className="text-white">
            Year 4
          </Typography>
          <Typography variant="h4" className="text-white">
            {(102 + count).toLocaleString()}
          </Typography>
        </div>
      </motion.div>

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
    </motion.div>
  )
}

export default LobbyPage
