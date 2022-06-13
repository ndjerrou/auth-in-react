import classes from './ProfileForm.module.css';

import { useRef } from 'react';

const ProfileForm = () => {
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const password = passwordRef.current.value;
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' passwordRef />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
