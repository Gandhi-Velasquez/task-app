import React from 'react';
import { RadioButtonGroupProps } from '../../types/UtilsTypes';

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, selectedOption, onChange }) => (
  <div className="mb-4 flex">
    <label className="block text-sm font-medium text-gray-700 mr-12">Type</label>
    <div className="mt-1 grid grid-cols-2 gap-4">
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <div className="relative">
            <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
              {selectedOption === option && <div className="w-2 h-2 rounded-full bg-slate-900"></div>}
            </div>
            <input
              type="radio"
              name="type"
              value={option}
              checked={selectedOption === option}
              onChange={() => onChange(option)}
              className="absolute -inset-full opacity-0 cursor-pointer"
            />
          </div>
          <span className="text-sm">{option}</span>
        </div>
      ))}
    </div>
  </div>
);

export default RadioButtonGroup;
