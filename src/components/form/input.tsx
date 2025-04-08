import React from 'react';
import SelectInput from './select-input';
import RadioCardInput, { RadioCardOption } from './radio-card-input';
import cn from '@/utils/cn'; // Import the cn utility

type ExtendedInputType = React.HTMLInputTypeAttribute | 'select' | 'radioCard' | 'textarea';

interface InputProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> {
  type?: ExtendedInputType;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  children?: React.ReactNode;
  options?: Array<{ value: string; label: string; description?: string; count?: number }>;
  multiple?: boolean;
  searchable?: boolean;
  optional?: boolean;
  rows?: number;
  cols?: number;
}

export default function Input(props: InputProps) {
  const {
    label,
    description,
    error,
    children,
    type = 'text',
    options,
    multiple = false,
    searchable = false,
    optional = false,
    rows = 3,
    cols,
    ...restProps
  } = props;

  // Validate id and name
  if (restProps.id && !restProps.name) {
    restProps.name = restProps.id;
  } else if (restProps.name && !restProps.id) {
    restProps.id = restProps.name;
  }

  if (!restProps.placeholder && typeof children === 'string') {
    restProps.placeholder = children;
  } else if (!restProps.placeholder && typeof label === 'string') {
    restProps.placeholder = label;
  }

  // Define base class names
  const baseInputClassName = 'flex h-9 w-full rounded-md border border-neutral-300 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-800 placeholder:text-neutral-400 focus-visible:border-violet-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';
  const baseTextareaClassName = 'flex min-h-[80px] w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-neutral-400 focus-visible:border-violet-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';

  // Use cn to conditionally add custom classes
  const inputClassName = cn(baseInputClassName, restProps.className);
  const textareaInputClassName = cn(baseTextareaClassName, restProps.className);

  // Create handler for select onChange that converts from select to input event
  const handleCustomSelectChange = (value: string | string[], syntheticEvent?: React.SyntheticEvent) => {
    if (restProps.onChange && syntheticEvent) {
      restProps.onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Create handler for radio card onChange
  const handleRadioCardChange = (value: string, syntheticEvent: React.ChangeEvent<HTMLInputElement>) => {
    if (restProps.onChange) {
      restProps.onChange(syntheticEvent);
    }
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (restProps.onChange) {
      restProps.onChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Render different input types
  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={restProps.id}
          name={restProps.name}
          value={restProps.value as string}
          defaultValue={restProps.defaultValue as string}
          placeholder={restProps.placeholder}
          disabled={restProps.disabled}
          required={restProps.required}
          className={textareaInputClassName}
          onChange={handleTextareaChange}
          onBlur={restProps.onBlur as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
          autoFocus={restProps.autoFocus}
          rows={rows}
          cols={cols}
        />
      );
    }

    if (type === 'radioCard' && options) {
      return (
        <RadioCardInput
          id={restProps.id}
          name={restProps.name}
          options={options as RadioCardOption[]}
          value={restProps.value as string}
          defaultValue={restProps.defaultValue as string}
          disabled={restProps.disabled}
          required={restProps.required}
          className={restProps.className}
          onChange={handleRadioCardChange}
          onBlur={restProps.onBlur}
        />
      );
    }

    if (type === 'select' && options) {
      return (
        <SelectInput
          id={restProps.id}
          name={restProps.name}
          options={options}
          value={restProps.value as string | string[]}
          defaultValue={restProps.defaultValue as string | string[]}
          placeholder={restProps.placeholder}
          multiple={multiple}
          searchable={searchable}
          disabled={restProps.disabled}
          required={restProps.required}
          className={restProps.className}
          onChange={handleCustomSelectChange}
          onBlur={restProps.onBlur}
        />
      );
    }

    return <input type={type as React.HTMLInputTypeAttribute} {...restProps} className={inputClassName} />;
  };

  return (
    <div className='flex flex-col gap-2'>
      {(children || label) && (
        <label
          htmlFor={restProps.id}
          className="flex items-center gap-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {children || label}
          {(optional && !restProps.required) && (<span className='text-xs text-neutral-500'>(optional)</span>)}
        </label>
      )}
      {renderInput()}
      {(error || description) && (
        <p className={cn('text-[0.8rem]', error ? 'text-red-500' : 'text-neutral-500')}>
          {error || description}
        </p>
      )}
    </div>
  );
}