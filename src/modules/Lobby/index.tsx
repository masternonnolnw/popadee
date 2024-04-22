import axios from 'axios'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import Typography from '@/common/components/base/Typography'
import { BASE_URL, SOCKET_URL } from '@/common/env'
import userStore from '@/common/stores/user/user-store'

import Navbar from './components/Navbar'
import ScoreboardCount from './components/ScoreboardCount'

const LobbyPage = () => {
  const [latestScoreAddCount, setLatestScoreAddCount] = useState(0)
  const [latestScore, setLatestScore] = useState(0)
  const [count, setCount] = useState(0)
  const [on, setOn] = useState(false)
  const [spacePressed, setSpacePressed] = useState(false)

  const [scoreboard, setScoreboard] = useState<
    {
      year: string
      score: number
    }[]
  >([])

  const audio = new Audio('/popcat/pop-cat.mp3')

  const user = userStore((state) => state.user)

  // dashboardSocket
  useEffect(() => {
    const dashboardSocket = new WebSocket(SOCKET_URL)
    dashboardSocket.onopen = () => {
      console.log('dashboard socket connected')
    }
    dashboardSocket.onmessage = (event) => {
      console.log('dashboard socket message', event)
      const data: {
        year: string
        score: number
      }[] = JSON.parse(event.data)
      setScoreboard(data)
      const ownYearScore = data.find((score) => score.year.includes(String(user.username).slice(0, 2)))
      if (ownYearScore) {
        setLatestScoreAddCount(ownYearScore.score)
      }
      console.log(data)
      console.log(user.year)
      console.log(ownYearScore)
    }

    return () => {
      dashboardSocket.close()
    }
  }, [user, user.year])

  const [init, setInit] = useState(false)

  // create function that run every 5 seconds to update score
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!user || !user.username) return

      const diffScore = count - latestScore
      console.log(diffScore, count, latestScore)

      setLatestScore(count)

      if (diffScore === 0) return
      await axios.post(
        `${BASE_URL}/update-click`,
        {
          score: diffScore,
        },
        {
          headers: {
            student_id: user.username,
          },
        },
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [user, user.username, count, latestScore])

  useEffect(() => {
    const fetchScore = async () => {
      if (!user || !user.username) return

      if (init) return
      const response = await axios.post(`${BASE_URL}/login`, {
        student_id: user.username,
        email: user.email,
      })
      setCount(response.data.score)
      setLatestScore(response.data.score)
      setLatestScoreAddCount(response.data.score)

      const scoreboardResponse = await axios.get(`${BASE_URL}/scoreboard`)
      setScoreboard(scoreboardResponse.data)

      setInit(true)
    }

    fetchScore()
  }, [user, user.username])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode && !spacePressed) {
        // Space key
        setSpacePressed(true)
        setOn(true)
        setCount((prev) => prev + 1)
        audio.play()
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.keyCode) {
        // Space key
        setSpacePressed(false)
        setOn(false)
      }
    }

    const handleTouchDown = () => {
      setOn(true)
      setCount((prev) => prev + 1)
      audio.play()
    }

    const handleTouchUp = () => {
      setOn(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // on mobile click
    window.addEventListener('touchstart', handleTouchDown)
    window.addEventListener('touchend', handleTouchUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('touchstart', handleTouchDown)
      window.removeEventListener('touchend', handleTouchUp)
    }
  }, [spacePressed])

  const constraintsRef = useRef(null)

  // set interval to add score to adashboard by 5 for all years every 5 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setScoreboard((prev) =>
  //       prev.map((score) => ({
  //         ...score,
  //         score: score.score + 5,
  //       })),
  //     )
  //   }, 5000)

  //   return () => clearInterval(interval)
  // }, [])

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
        {scoreboard
          .sort((a, b) => b.score - a.score)
          .map((score, index) => (
            <ScoreboardCount
              key={score.year}
              score={score}
              index={index}
              addingScoreToOwnYear={count - latestScoreAddCount}
            />
          ))}
        {/* {scoreboard.map((score, index) => {
          return (
            <div key={index} className="flex flex-row justify-between">
              <Typography variant="h4" className="text-white">
                {score.year}
              </Typography>
              <Typography variant="h4" className="text-white">
                {(
                  score.score + Number(score.year.includes(String(user.year)) ? count - latestScoreAddCount : 0)
                ).toLocaleString()}
              </Typography>
            </div>
          )
        })} */}
      </motion.div>

      <div className="flex absolute top-0 left-0 right-0 h-full items-center justify-center">
        <Image
          src="/popcat/background.png"
          fill
          alt="background"
          className="object-cover pointer-events-none"
          {...{ inert: '' }}
        />
      </div>
      <Typography
        className="absolute text-white !text-[90px] left-1/2 top-24 transform -translate-x-1/2 z-[20]"
        variant="h1"
        {...{ inert: '' }}
      >
        {count.toLocaleString()}
      </Typography>
      <Image
        // src={on ? '/popcat/on-cat.png' : '/popcat/off-cat.png'}
        src={on ? '/popcat/cat-on-2.png' : '/popcat/cat-off.png'}
        width={1460}
        height={300}
        alt="background"
        className="object-contain absolute bottom-[-850px] left-1/2 transform -translate-x-1/2 pointer-events-none"
        {...{ inert: '' }}
      />
      <div
        className="flex w-full h-full absolute top-0 left-0 z-[10]"
        onMouseDown={() => {
          setOn(true)
          setCount((prev) => prev + 1)
          audio.play()
        }}
        onMouseUp={() => setOn(false)}
        onMouseLeave={() => setOn(false)}
      />

      <Navbar />
    </motion.div>
  )
}

export default LobbyPage
