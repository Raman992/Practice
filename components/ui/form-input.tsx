import React from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError | string;
  register?: any;
  name?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, register, name, className = "", ...props }, ref) => {
    const inputId = name || label?.toLowerCase().replace(/\s+/g, "-");

    const inputProps = register && name ? register(name) : { ref };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={`
            w-full rounded-md border 
            ${error 
              ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
              : "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-black dark:focus:ring-white"
            }
            bg-white dark:bg-gray-800 
            px-3 py-2 text-sm 
            text-gray-900 dark:text-white 
            focus:outline-none
            transition-colors duration-200
            ${className}
          `}
          {...inputProps}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">
            {typeof error === "string" ? error : error?.message}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
