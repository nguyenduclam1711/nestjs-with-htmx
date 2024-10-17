import { AnchorHTMLAttributes } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'error'
    | 'neutral';
}

const mapLinkVariantToClassName: Record<
  NonNullable<LinkProps['variant']>,
  string
> = {
  default: '',
  primary: 'link-primary',
  secondary: 'link-secondary',
  info: 'link-info',
  warning: 'link-warning',
  error: 'link-error',
  neutral: 'link-neutral',
};

const Link = (props: LinkProps) => {
  const { variant = 'default', className, ...restProps } = props;
  const getClassName = () => {
    let result = 'link';

    const variantClassName = mapLinkVariantToClassName[variant];
    if (variantClassName) {
      result += ` ${variantClassName}`;
    }
    if (className) {
      result += ` ${className}`;
    }
    return result;
  };
  return <a className={getClassName()} {...restProps} />;
};

export default Link;
