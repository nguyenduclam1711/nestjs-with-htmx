import Toast from '../components/toast';
import { AlertProps } from '../components/alert';

type PageToastProps = {
  type: AlertProps['type'];
  message: string;
};
const PageToast = (props: PageToastProps) => {
  const { message, type } = props;
  return (
    <Toast
      id="page-toast"
      alertProps={{
        children: message,
        type,
      }}
    />
  );
};

export default PageToast;
