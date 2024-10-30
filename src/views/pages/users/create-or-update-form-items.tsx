import FormItems, { FormItemsProps } from 'src/views/components/form-items';
import Input, { InputProps } from 'src/views/components/input';

export type UsersCreateOrUpdateFormItemsProps = {
  name?: string;
  email?: string;
  error?: {
    name?: string;
    email?: string;
  };
};

const UsersCreateOrUpdateFormItems = (
  props: UsersCreateOrUpdateFormItemsProps,
) => {
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
        />
      ),
      error: error?.email,
    },
  ];
  return <FormItems items={formItems} />;
};

export default UsersCreateOrUpdateFormItems;
