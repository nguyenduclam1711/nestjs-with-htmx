import { ButtonHTMLAttributes } from 'react';
import {
  MAP_BUTTON_SIZES_TO_CLASSNAME,
  MAP_BUTTON_VARIANTS_TO_CLASSNAME,
} from './constants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'ghost'
    | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  outline?: boolean;
  active?: boolean;
  disabled?: boolean;
  loadingButton?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    variant,
    className,
    size = 'md',
    active = false,
    disabled = false,
    loadingButton: isLoadingButton = false,
    outline = false,
    ...restProps
  } = props;

  const getClassName = () => {
    let result = 'btn';
    if (variant) {
      result += ` ${MAP_BUTTON_VARIANTS_TO_CLASSNAME[variant]}`;
    }
    if (outline) {
      result += ` btn-outline`;
    }
    if (isLoadingButton) {
      result += ` loading-btn`;
    }
    if (size) {
      result += ` ${MAP_BUTTON_SIZES_TO_CLASSNAME[size]}`;
    }
    if (active) {
      result += ` btn-active`;
    }
    if (disabled) {
      result += ` btn-disabled`;
    }
    if (className) {
      result += ` ${className}`;
    }
    return result;
  };

  return (
    <button
      {...{
        ...restProps,
        className: getClassName(),
      }}
    >
      {isLoadingButton && <span className="loading loading-spinner" />}
      {restProps.children}
    </button>
  );
};
export default Button;
