import Button from 'src/views/components/button';
import LoginFormItems from './login-form-items';
import PageWrapper from 'src/views/commons/page-wrapper';
import Card from 'src/views/components/card';
import Link from 'src/views/components/link';

const LoginPage = () => {
  const formItemsId = 'login-form-items';
  return (
    <PageWrapper
      title="Login"
      scripts={[
        {
          src: 'login-page/index.js',
          type: 'module',
        },
      ]}
    >
      <div className="flex justify-center items-center mt-10">
        <Card title="Login" bodyClassName="items-center" className="w-96">
          <form
            className="flex gap-4 flex-col w-full"
            hx-post="/login"
            hx-target={`#${formItemsId}`}
          >
            <div id={formItemsId}>
              <LoginFormItems />
            </div>
            <Link variant="primary" href="/register">
              Register
            </Link>
            <Button type="submit">Submit</Button>
          </form>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
