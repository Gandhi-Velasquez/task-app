import React from 'react';

type LabelProps = {
  priority: number;
  type: string;
}

const Label: React.FC<LabelProps> = ({ priority, type }) => {
  const chipClasses: Record<string, string> = {
    '1': 'border border-red-100 bg-red-100 text-red-400',
    '2': 'border border-yellow-100 bg-yellow-100 text-yellow-400',
    '3': 'border border-emerald-100 bg-emerald-100 text-emerald-400',
  };

  const chipStyle = chipClasses[priority?.toString()] || chipClasses['3'];

  return (
    <p className={`mb-1 text-sm px-1 rounded-sm inline-block ${chipStyle}`}>
      {type}
    </p>
  );
};

export default Label;
