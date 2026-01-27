import React from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError | string;
}

export const FormInput = React.forwardRef<
  HTMLInputElement,
  FormInputProps
>(({ label, error, className = "", id, ...props }, ref) => {
  const inputId =
    id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        ref={ref}
        className={`
          w-full rounded-md border px-3 py-2 text-sm
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          transition-colors duration-200
          focus:outline-none
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-black dark:focus:ring-white"
          }
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
});

FormInput.displayName = "FormInput";
