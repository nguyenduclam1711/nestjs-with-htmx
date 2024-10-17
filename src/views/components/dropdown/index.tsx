import { ReactNode } from 'react';

type DropdownProps = {
  children: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'begin' | 'end';
  hoverable?: boolean;
};
const Dropdown = (props: DropdownProps) => {
  const {
    children,
    content,
    position = 'bottom',
    align = 'begin',
    hoverable = false,
  } = props;

  const getContainerClassName = () => {
    let result = 'dropdown';
    result += ` dropdown-${position}`;

    if (align === 'end') {
      result += ` dropdown-end`;
    }
    if (hoverable) {
      result += ` dropdown-hover`;
    }
    return result;
  };
  return (
    <div className={getContainerClassName()}>
      <div tabIndex={0} role="button">
        {children}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content shadow bg-base-100 rounded-box"
      >
        {content}
      </div>
    </div>
  );
};

export default Dropdown;
