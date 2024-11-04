import Alert from 'src/views/components/alert';

type DeleteModalErrorAlertProps = {
  errorMessage: string;
};
const DeleteModalErrorAlert = (props: DeleteModalErrorAlertProps) => {
  const { errorMessage } = props;
  return (
    <Alert type="error" className="mb-2">
      {errorMessage}
    </Alert>
  );
};

export default DeleteModalErrorAlert;
