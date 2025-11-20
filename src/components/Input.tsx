import { InputHTMLAttributes, ReactNode, useId, useMemo, useState } from 'react';
import './Input.css';

type InputStatus = 'default' | 'error';
type InputSize = 's' | 'm' | 'l';

type BaseProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export interface InputProps extends BaseProps {
  label?: string;
  description?: string;
  status?: InputStatus;
  size?: InputSize;
  read?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export function Input({
  label,
  description,
  status = 'default',
  size = 'm',
  disabled,
  read = false,
  prefix,
  suffix,
  value,
  defaultValue,
  onChange,
  id,
  placeholder,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    (defaultValue as string | undefined) ?? ''
  );
  const [isFocused, setIsFocused] = useState(false);

  const currentValue = useMemo(() => {
    if (value !== undefined) return value as string;
    return uncontrolledValue;
  }, [uncontrolledValue, value]);

  const isFilled = useMemo(() => {
    if (currentValue === undefined || currentValue === null) return false;
    return `${currentValue}`.length > 0;
  }, [currentValue]);

  const rootClass = [
    'dk-input',
    `dk-input--size-${size}`,
    status === 'error' ? 'dk-input--error' : '',
    disabled ? 'dk-input--disabled' : '',
    read ? 'dk-input--read' : '',
    prefix ? 'dk-input--has-prefix' : '',
    suffix ? 'dk-input--has-suffix' : '',
    label ? 'dk-input--floating' : '',
    isFilled || isFocused ? 'dk-input--active' : '',
    isFocused ? 'dk-input--focused' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const descriptionId = description ? `${inputId}-description` : undefined;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || read) return;
    onChange?.(event);
    if (value === undefined) {
      setUncontrolledValue(event.target.value);
    }
  };

  const renderField = () => {
    if (read) {
      return (
        <div
          className="dk-input__field dk-input__field--read"
          id={inputId}
          aria-describedby={descriptionId}
          aria-readonly="true"
        >
          {currentValue || placeholder || ''}
        </div>
      );
    }

    return (
      <input
        id={inputId}
        className="dk-input__field"
        value={currentValue}
        disabled={disabled}
        readOnly={read}
        aria-invalid={status === 'error'}
        aria-describedby={descriptionId}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    );
  };

  return (
    <div className={rootClass}>
      <div className="dk-input__control">
        {label ? (
          <label className="dk-input__label" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
        {renderField()}
        {prefix ? (
          <div className="dk-input__icon dk-input__icon--prefix" aria-hidden>
            {prefix}
          </div>
        ) : null}
        {suffix ? (
          <div className="dk-input__icon dk-input__icon--suffix" aria-hidden>
            {suffix}
          </div>
        ) : null}
      </div>

      {description ? (
        <div className="dk-input__description" id={descriptionId}>
          {description}
        </div>
      ) : null}
    </div>
  );
}

export default Input;
