import Alert from 'src/views/components/alert';
import FormItems, { FormItemsProps } from 'src/views/components/form-items';
import Input, { InputProps } from 'src/views/components/input';

type LoginFormItemsProps = {
  error?: {
    email?: string;
    password?: string;
  };
  errorMessage?: string;
  email?: string;
  password?: string;
};
const LoginFormItems = (props: LoginFormItemsProps) => {
  const { error, errorMessage, email = '', password = '' } = props;

  const inputColor = (isError: boolean): InputProps['color'] => {
    if (isError) {
      return 'error';
    }
    return 'default';
  };

  const formItems: FormItemsProps['items'] = [
    {
      label: 'Email',
      children: (
        <Input
          name="email"
          color={inputColor(!!error?.email)}
          defaultValue={email}
        />
      ),
      error: error?.email,
    },
    {
      label: 'Password',
      children: (
        <Input
          name="password"
          type="password"
          color={inputColor(!!error?.password)}
          defaultValue={password}
        />
      ),
      error: error?.password,
    },
  ];

  return (
    <>
      <FormItems items={formItems} />
      {errorMessage && (
        <Alert type="error" className="mt-2">
          <span>{errorMessage}</span>
        </Alert>
      )}
    </>
  );
};

export default LoginFormItems;
