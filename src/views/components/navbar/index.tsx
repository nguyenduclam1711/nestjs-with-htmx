import { ReactNode } from 'react';

type NavbarProps = {
  startContent?: ReactNode;
  centerContent?: ReactNode;
  endContent?: ReactNode;
};
const Navbar = (props: NavbarProps) => {
  const { startContent, centerContent, endContent } = props;

  return (
    <div className="navbar shadow-xl rounded-box">
      {startContent && <div className="navbar-start">{startContent}</div>}
      {centerContent && <div className="navbar-center">{centerContent}</div>}
      {endContent && <div className="navbar-end">{endContent}</div>}
    </div>
  );
};

export default Navbar;
