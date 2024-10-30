import { ReactNode } from 'react';

type ModalContentProps = {
  title?: string;
  children?: ReactNode;
};
const ModalContent = (props: ModalContentProps) => {
  const { children, title } = props;
  return (
    <>
      {title && <h3 className="text-lg font-bold mb-4">{title}</h3>}
      {children}
    </>
  );
};

export default ModalContent;
