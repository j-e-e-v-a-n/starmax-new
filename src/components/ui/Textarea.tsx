import React, { useId } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  required,
  className = '',
  rows = 4,
  id,
  ...props
}) => {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const errorId = `${textareaId}-error`;

  return (
    <div className="w-full">
      <label
        htmlFor={textareaId}
        className="block text-[13px] font-semibold text-navy mb-1.5"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      <textarea
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`w-full px-3.5 py-3 text-[15px] bg-white text-navy rounded-[2px] border transition-colors duration-150 placeholder:text-muted/60 focus:outline-none focus:ring-0 focus:border-blue resize-y ${
          error
            ? 'border-red-400'
            : 'border-rule hover:border-muted'
        } ${className}`}
        {...props}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-red-600 font-medium">
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-muted">{helperText}</p>
      ) : null}
    </div>
  );
};
