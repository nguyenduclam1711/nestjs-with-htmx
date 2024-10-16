import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'default' | 'loading';
}

const Button = (props: ButtonProps) => {
  const { buttonType = 'default', ...restProps } = props;
  return (
    <button
      {...{
        ...restProps,
        className: `btn ${restProps.className ?? ''}`,
      }}
    >
      {buttonType === 'loading' && <span className="loading loading-spinner" />}
      {restProps.children}
    </button>
  );
};
export default Button;
