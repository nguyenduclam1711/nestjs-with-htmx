import FormItems, { FormItemsProps } from 'src/views/components/form-items';
import Input, { InputProps } from 'src/views/components/input';

export type UsersSearchFormItemsProps = {
  error?: {
    email?: string;
    name?: string;
  };
  email?: string;
  name?: string;
};
const UsersSearchFormItems = (props: UsersSearchFormItemsProps) => {
  const { error, email, name } = props;

  const inputColor = (isError: boolean): InputProps['color'] => {
    if (isError) {
      return 'error';
    }
    return 'default';
  };

  const formItems: FormItemsProps['items'] = [
    {
      label: 'Name',
      children: (
        <Input
          name="name"
          color={inputColor(!!error?.name)}
          defaultValue={name}
          sizeInput="xs"
        />
      ),
      error: error?.name,
    },
    {
      label: 'Email',
      children: (
        <Input
          name="email"
          color={inputColor(!!error?.email)}
          defaultValue={email}
          sizeInput="sm"
        />
      ),
      error: error?.email,
    },
  ];
  return <FormItems items={formItems} />;
};

export default UsersSearchFormItems;
