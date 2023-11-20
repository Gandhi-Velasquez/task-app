import React, { useState } from 'react';
import CustomButton from './CustomButton';
import { DialogProps, FormData } from '../types/CommonTypes';
import InputField from './utils/InputField';
import RadioButtonGroup from './utils/RadioButtonGroup';

const types = ['DevOps', 'Front-End', 'Back-End', 'Design'];

const Dialog: React.FC<DialogProps> = ({ title, subheader, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    type: types[0],
  });

  const isSaveDisabled = !formData.title || !formData.type;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTypeChange = (selectedType: string) => {
    setFormData((prevData) => ({ ...prevData, type: selectedType }));
  };

  const onSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg border shadow-md w-96">
        <h2 className="text-lg font-semibold mb-2 pt-2">{title}</h2>
        <p className="text-sm text-gray-500 font-light mb-4">{subheader}</p>
        <form>
          <div className="ml-8 pl-4">
            <InputField label="Name" type="text" name="title" value={formData.title} onChange={handleChange} />
            <RadioButtonGroup
              options={types}
              selectedOption={formData.type}
              onChange={(selectedType) => handleTypeChange(selectedType)}
            />
          </div>
          <div className="flex justify-end pt-4">
            <CustomButton title="Cancel" onClick={onClose} />
            <CustomButton title="Save changes" onClick={onSave} disabled={isSaveDisabled} loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dialog;
