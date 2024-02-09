import React, { useEffect, useState } from 'react'
import { TimerProps } from './types'

const Timer = ({
  setCanSelectChoice,
  setCurrentIndex,
  setSelectedChoice,
}: TimerProps) => {
  const [timer, setTimer] = useState(30)

  useEffect(() => {
    let count = 30
    const interval = setInterval(() => {
      count--
      if (count === 0) {
        setCurrentIndex(prevIndex => prevIndex + 1)
        setSelectedChoice(null)
        setCanSelectChoice(false)
        count = 30
      }
      setTimer(count)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const progressPercentage = (timer / 30) * 100

  return (
    <>
      <div className="relative h-6 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-blue-700"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="text-lg text-black font-medium mt-2 text-right">
        {timer} seconds left
      </div>
    </>
  )
}

export default Timer
