"use client";

import { ConceptType, conceptTranslation } from "@/app/components/Maps";

type InputSelectProps = {
  label: string;
  id: string;
  values: string[];
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const InputSelect = ({
  label,
  id,
  values,
  placeholder,
  onChange,
}: InputSelectProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <p className="text-xs mt-1 text-gray-600">
        ※ vivid（default） … 超現実的で、ドラマチックな画像
        <br /> ※ natural … あまり現実的ではない、より自然な画像
      </p>

      <div className="relative">
        <div className="before:absolute h-10 before:right-4 before:top-3.5 my-auto before:w-2 before:h-2 before:border-gray-700 before:border-b-2 before:border-r-2 before:rotate-45">
          <select
            id="style"
            className="appearance-none mt-1 h-10 px-4 bg-gray-100  text-gray-900 rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm sm:leading-6"
            onChange={onChange}
          >
            {values.map((value, index) => (
              <option value={value} key={index}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
