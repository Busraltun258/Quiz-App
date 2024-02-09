"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const StartExamCard = () => {
    const router = useRouter()
    const startTest = () => {
        sessionStorage.removeItem('currentIndex')
        sessionStorage.removeItem('userAnswers')
        router.push('/test-questions')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="max-w-4xl p-6 border border-gray-200 rounded-xl bg-white shadow-xl text-center mx-4 max-h-[800px] w-[1000px]">
                <div className="flex justify-center mb-8">
                    <Image
                        src="/images/question.png"
                        alt="Exam Image"
                        width={128}
                        height={128}
                        layout="intrinsic"
                    />
                </div>
                <h2 className="text-2xl font-bold mb-6">Are You Ready To Start The Exam?</h2>
                <p className="mb-8 text-gray-600">You can test your knowledge by starting this quiz.</p>
                <button 
                    onClick={startTest}
                    className="inline-block w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                    Start
                </button>
            </div>
        </div>
    )
}

export default StartExamCard
