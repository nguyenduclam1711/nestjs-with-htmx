import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'loading';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  active?: boolean;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    variant = 'default',
    className,
    size = 'md',
    active = false,
    disabled = false,
    ...restProps
  } = props;

  const getClassName = () => {
    let result = 'btn';
    if (className) {
      result += ` ${className}`;
    }
    if (variant === 'loading') {
      result += ` loading-btn`;
    }
    if (size) {
      result += ` btn-${size}`;
    }
    if (active) {
      result += ` btn-active`;
    }
    if (disabled) {
      result += ` btn-disabled`;
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
      {variant === 'loading' && <span className="loading loading-spinner" />}
      {restProps.children}
    </button>
  );
};
export default Button;
