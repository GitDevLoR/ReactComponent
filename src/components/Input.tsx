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
  const [isFocused, setFocused] = useState(false);

  const currentValue = useMemo(() => {
    if (value !== undefined) return value as string;
    return uncontrolledValue;
  }, [uncontrolledValue, value]);

  const showFloatingLabel = Boolean(
    label && (isFocused || currentValue || placeholder)
  );

  const rootClass = [
    'dk-input',
    `dk-input--size-${size}`,
    status === 'error' ? 'dk-input--error' : '',
    disabled ? 'dk-input--disabled' : '',
    read ? 'dk-input--read' : '',
    showFloatingLabel ? 'dk-input--floating' : '',
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

  return (
    <div className={rootClass}>
      <div className="dk-input__control">
        {prefix ? <div className="dk-input__prefix">{prefix}</div> : null}
        <div className="dk-input__field-wrapper">
          {label ? (
            <label className="dk-input__label" htmlFor={inputId}>
              {label}
            </label>
          ) : null}
          <input
            id={inputId}
            className="dk-input__field"
            value={currentValue}
            disabled={disabled}
            readOnly={read}
            aria-invalid={status === 'error'}
            aria-describedby={descriptionId}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handleChange}
            {...rest}
          />
          {placeholder ? (
            <span className="dk-input__placeholder-shadow" aria-hidden>
              {placeholder}
            </span>
          ) : null}
        </div>
        {suffix ? <div className="dk-input__suffix">{suffix}</div> : null}
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
