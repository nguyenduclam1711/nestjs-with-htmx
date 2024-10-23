import { ReactNode } from 'react';

type NavbarProps = {
  startContent?: ReactNode;
  centerContent?: ReactNode;
  endContent?: ReactNode;
  className?: string;
};
const Navbar = (props: NavbarProps) => {
  const { startContent, centerContent, endContent, className } = props;

  const getClassName = () => {
    let result = 'navbar shadow-xl rounded-box';
    if (className) {
      result += ` ${className}`;
    }
    return result;
  };

  return (
    <div className={getClassName()}>
      {startContent && <div className="navbar-start">{startContent}</div>}
      {centerContent && <div className="navbar-center">{centerContent}</div>}
      {endContent && <div className="navbar-end">{endContent}</div>}
    </div>
  );
};

export default Navbar;
