"use client";

import { ConceptType, conceptTranslation } from "../Maps/Map";

type InputChipProps = {
  id: ConceptType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputChip = ({ id, onChange }: InputChipProps) => {
  return (
    <div className="inline-block">
      <input
        type="checkbox"
        id={id}
        value={id}
        className={`peer/l hidden`}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className={`bg-white text-sm px-4 py-1 rounded-full border-2 border-gray-200 peer-checked/l:bg-blue-100 peer-checked/l:font-bold peer-checked/l:border-blue-600 peer-checked/l:text-blue-600`}
      >
        {conceptTranslation[id]}
      </label>
    </div>
  );
};
