import { ReactNode } from 'react';
import ModalCloseIcon from './modal-close-icon';
import ModalBackdrop from './modal-backdrop';

type ModalProps = {
  className?: string;
  children: ReactNode;
  id: string;
  title?: string;
};
const Modal = (props: ModalProps) => {
  const { className, children, id, title } = props;

  const getClassName = () => {
    let result = `modal`;
    if (className) {
      result += ` ${className}`;
    }
    return result;
  };

  return (
    <dialog className={getClassName()} id={id}>
      <div className="modal-box">
        <ModalCloseIcon />
        {title && <h3 className="text-lg font-bold mb-4">{title}</h3>}
        {children}
      </div>
      <ModalBackdrop />
    </dialog>
  );
};

export default Modal;
