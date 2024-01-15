"use client";

type InputTextProps = {
  label: string;
  id: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputText = ({
  label,
  id,
  placeholder,
  onChange,
}: InputTextProps) => {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className="mt-1 px-4 h-10 block w-full rounded-full border-0 bg-gray-100 text-gray-900 focus:ring-4 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};
