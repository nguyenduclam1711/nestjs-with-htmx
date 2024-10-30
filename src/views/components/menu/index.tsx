import { ReactNode } from 'react';
import MenuItem from './menu-item';
import SubMenu from './sub-menu';

export type SubMenuItem = {
  title: string;
  href?: string;
  icon?: ReactNode;
  className?: string;
  id?: string;
  active?: boolean;
};

export type SubMenuItems = SubMenuItem[];

export type MenuItem = {
  childrens?: SubMenuItems;
} & SubMenuItem;

export type MenuProps = {
  items: MenuItem[];
  className?: string;
};

const Menu = (props: MenuProps) => {
  const { items, className } = props;
  const getMenuClassName = () => {
    let result = 'menu rounded-box';
    if (className) {
      result += ` ${className}`;
    }
    return result;
  };
  return (
    <ul className={getMenuClassName()}>
      {items.map((menuItem, index) => {
        const { childrens, ...restMenuItem } = menuItem;

        return (
          <li key={`menu-item-${index}`}>
            <MenuItem {...restMenuItem} />
            {childrens && <SubMenu items={childrens} />}
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
