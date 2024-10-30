import { SubMenuItem } from '.';

const MenuItem = (props: SubMenuItem) => {
  const { icon, title, href, className, id, active } = props;
  const getClassName = () => {
    let result = className ?? '';
    if (active) {
      result += ` active`;
    }
    return result;
  };
  return (
    <a href={href} className={getClassName()} id={id}>
      {icon}
      {title}
    </a>
  );
};

export default MenuItem;
