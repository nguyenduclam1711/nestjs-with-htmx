import { ReactNode } from 'react';
import CheckIcon from 'src/views/icons/check-icon';
import ErrorIcon from 'src/views/icons/error-icon';
import InfoIcon from 'src/views/icons/info-icon';
import WarningIcon from 'src/views/icons/warning-icon';

export type AlertProps = {
  type?: 'default' | 'info' | 'success' | 'warning' | 'error';
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};
const Alert = (props: AlertProps) => {
  const { type = 'default', children, icon, className } = props;
  const getClassName = () => {
    let result = 'alert';

    switch (type) {
      case 'info':
        result += ' alert-info';
        break;
      case 'error':
        result += ' alert-error';
        break;
      case 'warning':
        result += ' alert-warning';
        break;
      case 'success':
        result += ' alert-success';
        break;
      default:
        break;
    }
    if (className) {
      result += ` ${className}`;
    }
    return result;
  };

  const getIcon = () => {
    if (icon) {
      return icon;
    }
    switch (type) {
      case 'default':
      case 'info':
        return <InfoIcon />;
      case 'success':
        return <CheckIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'error':
        return <ErrorIcon />;
    }
  };

  return (
    <div className={getClassName()}>
      {getIcon()}
      {children}
    </div>
  );
};

export default Alert;
