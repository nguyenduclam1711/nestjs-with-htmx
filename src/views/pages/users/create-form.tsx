import Button from 'src/views/components/button';
import { USERS_CREATE_FORM_ITEMS_ID } from './constants';

const UsersCreateForm = () => {
  return (
    <form
      hx-post="/users"
      hx-target={`#${USERS_CREATE_FORM_ITEMS_ID}`}
      hx-swap="innerHTML"
    >
      <div id={USERS_CREATE_FORM_ITEMS_ID}></div>
      <Button type="submit" className="mt-2 float-right" variant="loading">
        Submit
      </Button>
    </form>
  );
};

export default UsersCreateForm;
