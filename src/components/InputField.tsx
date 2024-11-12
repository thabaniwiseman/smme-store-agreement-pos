import * as React from 'react';
import { FieldInputProps, FormikContextType, getIn } from 'formik';
import { cn } from '../lib/utils';


type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
  type: 'text' | 'number' | 'email' | 'url' | 'tel' | 'password';
  inputMode: 'text' | 'tel' | 'url' | 'none' | 'email' | 'numeric';
  field: FieldInputProps<string>;
  form: FormikContextType<string>;
  hint?: string;
};

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, inputMode, name, field, form, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const fieldTouched = React.useMemo(
      (): boolean => getIn(form?.touched, field.name),
      [form?.touched, field.name],
    );
    const fieldError = React.useMemo(
      (): string => getIn(form?.errors, field.name),
      [form?.errors, field.name],
    );

    const containerClass = cn(
      'ns-max-w-130 ns-h-16 ns-relative ns-text-left ns-text-ellipsis ns-w-full ns-black ns-text-base ',
      {
        ['ns-mb-5']: props.hint || (fieldTouched && fieldError),
      },
      className,
    );

    const inputClass = cn(
      'ns-peer ns-flex ns-h-16 ns-w-full ns-max-w-130 ns-rounded-md ns-bg-white-50 ns-border ns-text-black \
    ns-border-solid ns-border-grey-100 ns-pl-5 ns-pr-9 ns-pt-3.5 ns-text-base \
    ns-shadow-sm ns-outline-none ns-placeholder-transparent \
    disabled:cursor-not-allowed disabled:opacity-50 hide-spinner ',
      {
        ['ns-text-2xl']: type === 'password',
      },
    );

    return (
      <div className={containerClass}>
        <input
          ref={ref}
          className={inputClass}
          type={type === 'password' && showPassword ? 'text' : type}
          inputMode={inputMode}
          placeholder={placeholder}
          {...field}
          {...props}
        />
        <label
          className='ns-absolute ns-left-5 ns-top-1 ns-text-xs ns-text-black peer-focus:ns-top-1 peer-focus:text-sm peer-focus:ns-text-xs
          peer-focus:ns-text-black peer-placeholder-shown:ns-top-[45%] peer-placeholder-shown:ns-text-base peer-placeholder-shown:ns-text-black ns-pointer-events-none ns-w-[80%] ns-transition-all'
          htmlFor={name}
        >
          {placeholder}
        </label>

        {type === 'password' && (
          <button
            type='button'
            className={`ns-absolute ns-h-6 ns-w-6  ns-right-5 ns-top-[45%] ns-text-grey-400`}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <svg
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                ></path>
              </svg>
            ) : (
              <svg
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                ></path>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                ></path>
              </svg>
            )}
          </button>
        )}

        <span className='ns-absolute ns-left-0 ns-right-0 ns-bottom-0 ns-h-px ns-ml-5 ns-mr-5 ns-border-0 ns-bg-black' />

        {props.hint && !(fieldTouched && fieldError) ? (
          <p className='ns-text-xs ns-text-grey-300 ns-ml-4 ns-mt-1 ns-pt-1'>{props.hint}</p>
        ) : (
          <p className='ns-text-xs ns-text-red-600 ns-ml-4 ns-mt-1 ns-pt-1 ns-flex ns-gap-x-2'>
            {fieldTouched && fieldError && (
              <>
                <svg
                  width='13'
                  height='14'
                  viewBox='0 0 13 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M6.5 0.5C10.0899 0.5 13 3.41015 13 7C13 10.5899 10.0899 13.5 6.5 13.5C2.91015 13.5 0 10.5899 0 7C0 3.41015 2.91015 0.5 6.5 0.5ZM7.10938 7.40625C7.10938 7.7428 6.83655 8.01562 6.5 8.01562C6.16345 8.01562 5.89062 7.7428 5.89062 7.40625V3.75C5.89062 3.41345 6.16345 3.14062 6.5 3.14062C6.83655 3.14062 7.10938 3.41345 7.10938 3.75V7.40625ZM6.5 9.03125C6.05127 9.03125 5.6875 9.39502 5.6875 9.84375C5.6875 10.2925 6.05127 10.6562 6.5 10.6562C6.94873 10.6562 7.3125 10.2925 7.3125 9.84375C7.3125 9.39502 6.94873 9.03125 6.5 9.03125Z'
                    fill='#E60000'
                  />
                </svg>
                <span>{fieldError}</span>
              </>
            )}
          </p>
        )}
      </div>
    );
  },
);

export { InputField };
