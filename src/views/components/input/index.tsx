import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'icon-input';
  suffixIcon?: ReactNode;
  prefixIcon?: ReactNode;
  bordered?: boolean;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  sizeInput?: 'xs' | 'sm' | 'md' | 'lg';
}

const mapInputColorClass: Record<NonNullable<InputProps['color']>, string> = {
  default: '',
  primary: 'input-primary',
  secondary: 'input-secondary',
  accent: 'input-accent',
  info: 'input-info',
  success: 'input-success',
  warning: 'input-warning',
  error: 'input-error',
};

const Input = (props: InputProps) => {
  const {
    variant = 'default',
    bordered = true,
    className,
    suffixIcon,
    prefixIcon,
    color = 'default',
    sizeInput = 'md',
    ...restProps
  } = props;

  const getInputClassName = () => {
    let result = 'input w-full';

    if (bordered) {
      result += ' input-bordered';
    }
    if (className) {
      result += ` ${className}`;
    }
    if (sizeInput) {
      result += ` input-${sizeInput} max-w-${sizeInput}`;
    }
    const colorClassName = mapInputColorClass[color];
    if (colorClassName) {
      result += ` ${colorClassName}`;
    }
    return result;
  };

  if (variant === 'icon-input') {
    return (
      <label className={getInputClassName()}>
        {prefixIcon}
        <input {...restProps} className="grow" />
        {suffixIcon}
      </label>
    );
  }
  return <input {...restProps} className={getInputClassName()} />;
};

export default Input;
