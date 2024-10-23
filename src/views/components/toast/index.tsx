import Alert, { AlertProps } from '../alert';

export type ToastProps = {
  // horizontal align
  align?: 'start' | 'center' | 'end';
  // vertial align
  position?: 'top' | 'middle' | 'bottom';
  id?: string;
  alertProps: AlertProps;
  className?: string;
};
const Toast = (props: ToastProps) => {
  const { align = 'end', position = 'top', id, className, alertProps } = props;
  const getClassName = () => {
    let result = `toast toast-${align} toast-${position}`;
    if (className) {
      result += ` ${className}`;
    }
    return result;
  };
  return (
    <div id={id} className={getClassName()}>
      <Alert {...alertProps} />
    </div>
  );
};

export default Toast;
