import Alert from 'src/views/components/alert';
import FormItems, { FormItemsProps } from 'src/views/components/form-items';
import Input, { InputProps } from 'src/views/components/input';

type RegisterFormItemsProps = {
  email?: string;
  password?: string;
  name?: string;
  error?: {
    email?: string;
    password?: string;
    name?: string;
  };
  errorMessage?: string;
};
const RegisterFormItems = (props: RegisterFormItemsProps) => {
  const { email, password, name, error, errorMessage } = props;

  const inputColor = (isError: boolean): InputProps['color'] => {
    if (isError) {
      return 'error';
    }
    return 'default';
  };

  const items: FormItemsProps['items'] = [
    {
      label: 'Email',
      children: (
        <Input
          name="email"
          defaultValue={email}
          color={inputColor(!!error?.email)}
        />
      ),
      error: error?.email,
    },
    {
      label: 'Name',
      children: (
        <Input
          name="name"
          defaultValue={name}
          color={inputColor(!!error?.name)}
        />
      ),
      error: error?.name,
    },
    {
      label: 'Password',
      children: (
        <Input
          name="password"
          defaultValue={password}
          type="password"
          color={inputColor(!!error?.password)}
        />
      ),
      error: error?.password,
    },
  ];
  return (
    <>
      <FormItems items={items} />
      {errorMessage && (
        <Alert type="error" className="mt-2">
          <span>{errorMessage}</span>
        </Alert>
      )}
    </>
  );
};

export default RegisterFormItems;
