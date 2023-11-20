import React from 'react';
import { InputFieldProps } from '../../types/UtilsTypes';

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange }) => (
  <div className="mb-4 flex items-center">
    <label className="block text-sm font-medium text-gray-700 mr-4">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 p-2 w-full border focus:outline-none focus:border-slate-900 rounded-md"
      required
    />
  </div>
);

export default InputField;
