import { ReactNode } from 'react';
import {
  MAP_DROPDOWN_ALIGNS_CLASSNAME,
  MAP_DROPDOWN_POSITIONS_CLASSNAME,
} from './constants';

export type DropdownProps = {
  children: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'begin' | 'end';
  hoverable?: boolean;
  contentClassName?: string;
};
const Dropdown = (props: DropdownProps) => {
  const {
    children,
    content,
    position = 'bottom',
    align = 'begin',
    hoverable = false,
    contentClassName,
  } = props;

  const getContainerClassName = () => {
    let result = 'dropdown';
    result += ` ${MAP_DROPDOWN_POSITIONS_CLASSNAME[position]}`;
    result += ` ${MAP_DROPDOWN_ALIGNS_CLASSNAME[align]}`;

    if (hoverable) {
      result += ' dropdown-hover';
    }
    return result;
  };

  const getContentClassName = () => {
    let res = 'dropdown-content shadow-lg bg-white rounded-box z-10';
    if (contentClassName) {
      res += ` ${contentClassName}`;
    }
    return res;
  };

  return (
    <div className={getContainerClassName()}>
      <div tabIndex={0} role="button">
        {children}
      </div>
      <div tabIndex={0} className={getContentClassName()}>
        {content}
      </div>
    </div>
  );
};

export default Dropdown;
