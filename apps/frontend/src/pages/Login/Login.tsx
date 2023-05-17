import Spinner from '../../components/Spinner';
import '../Login_Register.css';
import { useLogin } from '../../features/auth/useLogin';
import LoginForm from './LoginForm';

function Login() {
  const { isLoading } = useLogin();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          Welcome Back<span>!</span>
        </h1>
        <p>{`Write what's on your mind :)`}</p>
      </section>
      <LoginForm />
    </>
  );
}

export default Login;
