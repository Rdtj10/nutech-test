import React from "react";

interface InputFieldProps {
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  error?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  disabled = false,
  name,
  placeholder,
  value,
  onChange,
  icon,
  error,
}) => {
  return (
    <div className="relative mb-4">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        disabled={disabled}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border border-gray-300 rounded px-10 py-2 focus:outline-none focus:border-red-500`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
