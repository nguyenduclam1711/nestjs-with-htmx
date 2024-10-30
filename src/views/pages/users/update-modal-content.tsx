import ModalContent from 'src/views/components/modal/modal-content';
import UsersCreateOrUpdateFormItems, {
  UsersCreateOrUpdateFormItemsProps,
} from './create-or-update-form-items';
import { USERS_UPDATE_FORM_ITEMS_ID } from './constants';
import Button from 'src/views/components/button';

type UpdateModalContentProps = {
  formItemsProps: UsersCreateOrUpdateFormItemsProps;
  userId: number;
};
const UpdateModalContent = (props: UpdateModalContentProps) => {
  const { formItemsProps, userId } = props;
  const { name, email, error } = formItemsProps;
  return (
    <ModalContent title={`${name} - ${email}`}>
      <form
        hx-put={`/users/update/${userId}`}
        hx-target={`#${USERS_UPDATE_FORM_ITEMS_ID}`}
        hx-swap="innerHTML"
      >
        <div id={USERS_UPDATE_FORM_ITEMS_ID}>
          <UsersCreateOrUpdateFormItems
            name={name}
            email={email}
            error={error}
          />
        </div>
        <Button
          type="submit"
          loadingButton
          variant="secondary"
          className="mt-4 float-right"
        >
          Update
        </Button>
      </form>
    </ModalContent>
  );
};

export default UpdateModalContent;
