import React from 'react'
import { ChoiceProps } from './types'

const Choice = ({ choice, index, isSelected, onClick }: ChoiceProps) => (
  <div className="flex items-center mb-2">
    <label
      htmlFor={`choice${index}`}
      className={`cursor-pointer flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 rounded-full border-2 text-base ${isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'} mr-3`}
      onClick={onClick}
    >
      {isSelected ? '✓' : String.fromCharCode(65 + index)}
    </label>
    <span className="text-base flex-grow">{choice}</span>
    <input
      type="radio"
      id={`choice${index}`}
      name="choices"
      value={choice}
      checked={isSelected}
      onChange={() => {}}
      className="hidden"
    />
  </div>
)

export default Choice
