import { ToastProps } from '.';

export const MAP_TOAST_ALIGN_TO_CLASSNAMES: Record<
  NonNullable<ToastProps['align']>,
  string
> = {
  start: 'toast-start',
  end: 'toast-end',
  center: 'toast-center',
};

export const MAP_TOAST_POSITION_TO_CLASSNAMES: Record<
  NonNullable<ToastProps['position']>,
  string
> = {
  top: 'toast-top',
  bottom: 'toast-bottom',
  middle: 'toast-middle',
};
