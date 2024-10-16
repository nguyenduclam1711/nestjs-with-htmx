import PageWrapper from 'src/views/commons/page-wrapper';
import Button from 'src/views/components/button';
import RegisterFormItems from './register-form-items';

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
        <div className="card card-bordered bg-base-100 w-96 shadow-xl">
          <div className="card-body items-center">
            <h1 className="card-title">Register</h1>
            <form
              className="flex gap-4 flex-col w-full"
              hx-post="/register"
              hx-target={`#${formItemsId}`}
            >
              <div id={formItemsId}>
                <RegisterFormItems />
              </div>
              <a className="link link-primary" href="/login">
                Back to login
              </a>
              <Button type="submit" variant="loading">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RegisterPage;
