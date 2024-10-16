import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'loading';
}

const Button = (props: ButtonProps) => {
  const { variant = 'default', className, ...restProps } = props;

  const getClassName = () => {
    let result = 'btn';
    if (className) {
      result += ` ${className}`;
    }
    if (variant === 'loading') {
      result += ` loading-btn`;
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
