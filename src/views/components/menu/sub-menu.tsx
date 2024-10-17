import { SubMenuItems } from '.';
import MenuItem from './menu-item';

type SubMenuProps = {
  items: SubMenuItems;
};
const SubMenu = (props: SubMenuProps) => {
  const { items } = props;

  if (items.length === 0) {
    return null;
  }
  return (
    <ul>
      {items.map((menuItem, index) => {
        return (
          <li key={`sub-menu-${index}`}>
            <MenuItem {...menuItem} />
          </li>
        );
      })}
    </ul>
  );
};

export default SubMenu;
