import '../Register/Login_Register.css';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
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
};

export default Login;
