import { SubMenuItem } from '.';

const MenuItem = (props: SubMenuItem) => {
  const { icon, title, href, className, id } = props;
  return (
    <a href={href} className={className} id={id}>
      {icon}
      {title}
    </a>
  );
};

export default MenuItem;
