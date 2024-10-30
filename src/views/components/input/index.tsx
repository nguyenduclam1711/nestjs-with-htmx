import { InputHTMLAttributes, ReactNode } from 'react';
import { MAP_INPUT_VARIANTS_TO_CLASSNAME } from './constants';
import { MAP_BUTTON_SIZES_TO_CLASSNAME } from '../button/constants';

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
      result += ` ${MAP_BUTTON_SIZES_TO_CLASSNAME[sizeInput]}`;
    }
    const colorClassName = MAP_INPUT_VARIANTS_TO_CLASSNAME[color];
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
