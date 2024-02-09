import { useRouter } from "next/navigation" 
import { UserAnswersProps } from "./types"

const AnswerKey = ({ userAnswers, data }: UserAnswersProps) => {
  const router = useRouter() 
  const goBack = () => {
    router.back()
    sessionStorage.clear()
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Answer Key</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tl-lg">
                  Question
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tr-lg">
                  Your Answer
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {data.map((question) => (
                <tr key={question.id}>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
                    {question.id}.
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
                   {userAnswers && userAnswers[question.id] || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-6">
          <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md" onClick={goBack}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default AnswerKey
