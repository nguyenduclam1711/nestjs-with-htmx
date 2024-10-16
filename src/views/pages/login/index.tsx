import Button from 'src/views/components/button';
import LoginFormItems from './login-form-items';

const LoginPage = () => {
  const formItemsId = 'login-form-items';
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="card card-bordered bg-base-100 w-96 shadow-xl">
        <div className="card-body items-center">
          <h1 className="card-title">Login</h1>
          <form
            className="flex gap-4 flex-col w-full"
            hx-post="/login"
            hx-target={`#${formItemsId}`}
          >
            <div id={formItemsId}>
              <LoginFormItems />
            </div>
            <a className="link link-primary" href="/register">
              Register
            </a>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
