import { ButtonProps } from '.';

export const MAP_BUTTON_VARIANTS_TO_CLASSNAME: Record<
  NonNullable<ButtonProps['variant']>,
  string
> = {
  neutral: 'btn-neutral',
  primary: 'btn-primary',
  info: 'btn-info',
  link: 'btn-link',
  error: 'btn-error',
  ghost: 'btn-ghost',
  accent: 'btn-accent',
  success: 'btn-success',
  warning: 'btn-warning',
  secondary: 'btn-secondary',
};

export const MAP_BUTTON_SIZES_TO_CLASSNAME: Record<
  NonNullable<ButtonProps['size']>,
  string
> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};
