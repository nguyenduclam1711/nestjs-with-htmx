import { ReactNode } from 'react';

export type FormItemProps = {
  label: string;
  className?: string;
  error?: string;
  children?: ReactNode;
};
const FormItem = (props: FormItemProps) => {
  const { label, className, error, children } = props;
  const getClassName = () => {
    let result = `form-control`;
    if (className) {
      result += ` ${className}`;
    }
    return result;
  };
  return (
    <label className={getClassName()}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      {children}
      {error && (
        <div className="label">
          <span className="label-text-alt text-red-400">{error}</span>
        </div>
      )}
    </label>
  );
};

export default FormItem;
