"use client"
import React, { useEffect, useState } from 'react'
import AnswerKey from './AnswerKey'
import ProgressBar from './Timer'
import Choice from './Choice'
import { Post, UserAnswersProps } from './types'

const Question = ({ data }: UserAnswersProps) => {
  const [savedCurrentIndex, setSavedCurrentIndex] = useState(0)
  const [savedUserAnswers, setSavedUserAnswer] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(savedCurrentIndex)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [canSelectChoice, setCanSelectChoice] = useState(false)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string } | null>(savedUserAnswers)
  const [testFinished, setTestFinished] = useState(false)
  const [waitingForAnswer, setWaitingForAnswer] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Post | null>(null)
  const [choiceArray, setChoiceArray] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (currentIndex === data.length) {
      setTestFinished(true)
    } else {
      setCurrentQuestion(data[currentIndex])
      setChoiceArray(data[currentIndex].body.split('\n'))
    }
  }, [currentIndex, data])

  useEffect(() => {
    setTimeout(() => {
      setCanSelectChoice(true)
      setWaitingForAnswer(true)
    }, 10000)
  }, [currentIndex, data])

  useEffect(() => {
    setSavedCurrentIndex(Number(sessionStorage.getItem('currentIndex')) ?? 0)
    setCurrentIndex(Number(sessionStorage.getItem('currentIndex')) ?? 0)
    setUserAnswers(JSON.parse(sessionStorage.getItem('userAnswers') ?? '{}'))
    setSavedUserAnswer(JSON.parse(sessionStorage.getItem('userAnswers') ?? '{}'))
  }, [])

  const handleChoiceClick = (choice: string, index: number) => {
    if (canSelectChoice) {
      const choiceLabel = String.fromCharCode(65 + index)
      setUserAnswers((prevAnswers) => {
        const newAnswers: { [key: number]: string } | null = prevAnswers ? { ...prevAnswers } : null
        if (newAnswers) {
          newAnswers[currentQuestion!.id] = selectedChoice === choice ? '' : choiceLabel
          setSelectedChoice(selectedChoice === choice ? null : choice)
        sessionStorage.setItem('userAnswers', JSON.stringify(newAnswers))
        }
        return newAnswers
      })
    }
  }
  
  const handleCloseOnOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleModalClose()
    }
  }

  const handleNextQuestion = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % data.length)
    sessionStorage.setItem('currentIndex', (currentIndex + 1).toString())
    setSelectedChoice(null)
    setCanSelectChoice(false)
    setWaitingForAnswer(false)
  }

  const handleSubmit = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleConfirmFinish = () => {
    setIsModalOpen(false)
    setTestFinished(true)
  }

  return testFinished ? (
    <AnswerKey userAnswers={userAnswers} data={data} />
  ) : (
    currentQuestion && (
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <div className="w-full max-w-4xl">
          <ProgressBar
           key={currentIndex} 
           setCanSelectChoice={setCanSelectChoice}
            setCurrentIndex={setCurrentIndex} 
            setSelectedChoice={setSelectedChoice}
             />
        </div>
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 my-4 w-full max-w-4xl min-h-[400px]">
          <div className="flex-grow">
            {waitingForAnswer ? (
              <div className="text-gray-700 font-semibold mb-6">Your Answer Now</div>
            ) : (
              <div className="text-gray-500 mb-6">Please wait 10 seconds to reply</div>
            )}
            <h2 className="text-gray-800 text-2xl font-bold mb-4">{`${currentQuestion.id}) ${currentQuestion.title}`}</h2>
            <div className="mb-6">
              {choiceArray.map((choice, index) => (
                <Choice
                  key={index}
                  choice={choice}
                  index={index}
                  isSelected={selectedChoice === choice}
                  onClick={() => handleChoiceClick(choice, index)}
                />
              ))}
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleCloseOnOverlay}>
              <div className="bg-white rounded-lg p-8" onClick={(e) => e.stopPropagation()}>
                <p className="text-xl font-semibold">Are you sure you want to finish the test?</p>
                <p className="text-sm my-4">Your answers will be saved.</p>
                <div className="flex justify-end gap-4">
                  <button onClick={handleConfirmFinish} className="bg-green-600 text-white font-bold py-2 px-6 rounded transition duration-300">Yes</button>
                  <button onClick={handleModalClose} className="bg-red-600 text-white font-bold py-2 px-6 rounded transition duration-300">No</button>
                </div>
              </div>
            </div>
          )}
          <div className='flex justify-between mt-6'>
            {currentIndex < data.length - 1 ? (
              <button onClick={handleNextQuestion} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300">Next</button>
            ) : (
              <div className="py-2 px-6"></div>
            )}
            <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300">Finish</button>
          </div>
        </div>
      </div>
    )
  )
}

export default Question
