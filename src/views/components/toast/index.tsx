import Alert, { AlertProps } from '../alert';
import {
  MAP_TOAST_ALIGN_TO_CLASSNAMES,
  MAP_TOAST_POSITION_TO_CLASSNAMES,
} from './constants';

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
    let result = `toast ${MAP_TOAST_ALIGN_TO_CLASSNAMES[align]} ${MAP_TOAST_POSITION_TO_CLASSNAMES[position]}`;
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
