import PageWrapper from 'src/views/commons/page-wrapper';
import Button from 'src/views/components/button';
import RegisterFormItems from './register-form-items';
import Card from 'src/views/components/card';
import Link from 'src/views/components/link';

const RegisterPage = () => {
  const formItemsId = 'register-form-items';
  return (
    <PageWrapper
      title="Register"
      scripts={[
        {
          src: 'register-page/index.js',
          type: 'module',
        },
      ]}
    >
      <div className="flex justify-center items-center mt-10">
        <Card title="Register" bodyClassName="items-center" className="w-96">
          <form
            className="flex gap-4 flex-col w-full"
            hx-post="/register"
            hx-target={`#${formItemsId}`}
          >
            <div id={formItemsId}>
              <RegisterFormItems />
            </div>
            <Link href="/login" variant="primary">
              Go to login
            </Link>
            <Button type="submit" variant="primary" loadingButton>
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default RegisterPage;
