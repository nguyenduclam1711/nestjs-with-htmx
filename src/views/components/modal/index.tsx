import { ReactNode } from 'react';
import ModalCloseIcon from './modal-close-icon';
import ModalBackdrop from './modal-backdrop';
import ModalContent from './modal-content';

type ModalProps = {
  className?: string;
  children?: ReactNode;
  id: string;
  title?: string;
  contentId?: string;
};
const Modal = (props: ModalProps) => {
  const { className, children, id, title, contentId } = props;

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
        <div id={contentId}>
          <ModalContent title={title}>{children}</ModalContent>
        </div>
      </div>
      <ModalBackdrop />
    </dialog>
  );
};

export default Modal;
