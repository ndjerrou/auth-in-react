import { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import axios from 'axios';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let url;

    setIsLoading(true);
    if (isLogin) {
      url = 'http://localhost:9000/api/auth';
    } else {
      url = 'http://localhost:9000/api/users';
    }
    console.log('url = ', url);
    try {
      const { data: token } = await axios.post(url, {
        email,
        password,
      });
      console.log(token);
      setIsLoading(false);
      authCtx.login(token);

      history.replace('/');
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Creating an account...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
