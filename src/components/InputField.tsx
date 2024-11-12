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
      'max-w-130 h-16 relative text-left text-ellipsis w-full black text-base ',
      {
        ['mb-5']: props.hint || (fieldTouched && fieldError),
      },
      className,
    );

    const inputClass = cn(
      'peer flex h-16 w-full max-w-130 rounded-md bg-white-50 border text-black \
    border-solid border-grey-100 pl-5 pr-9 pt-3.5 text-base \
    shadow-sm outline-none placeholder-transparent \
    disabled:cursor-not-allowed disabled:opacity-50 hide-spinner ',
      {
        ['text-2xl']: type === 'password',
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
          className='absolute left-5 top-1 text-xs text-black peer-focus:top-1 peer-focus:text-sm peer-focus:text-xs
          peer-focus:text-black peer-placeholder-shown:top-[45%] peer-placeholder-shown:text-base peer-placeholder-shown:text-black pointer-events-none w-[80%] transition-all'
          htmlFor={name}
        >
          {placeholder}
        </label>

        {type === 'password' && (
          <button
            type='button'
            className={`absolute h-6 w-6  right-5 top-[45%] text-grey-400`}
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

        <span className='absolute bottom-0 left-0 right-0 h-px ml-5 mr-5 bg-black border-0' />

        {props.hint && !(fieldTouched && fieldError) ? (
          <p className='pt-1 mt-1 ml-4 text-xs text-grey-300'>{props.hint}</p>
        ) : (
          <p className='flex pt-1 mt-1 ml-4 text-xs text-red-600 gap-x-2'>
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
