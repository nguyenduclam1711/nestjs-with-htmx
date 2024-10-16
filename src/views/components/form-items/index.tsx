import FormItem, { FormItemProps } from '../form-item';

export type FormItemsProps = {
  items: FormItemProps[];
};
const FormItems = (props: FormItemsProps) => {
  const { items } = props;
  if (items.length === 0) {
    return '';
  }
  return (
    <>
      {items.map((itemProps, index) => {
        return <FormItem key={`form-item-${index}`} {...itemProps} />;
      })}
    </>
  );
};

export default FormItems;
