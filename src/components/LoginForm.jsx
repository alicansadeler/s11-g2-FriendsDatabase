import React, { useState } from 'react';

function LoginForm() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {};

  return (
    <div>
      <div className="loginFormMainDiv">
        <h1>LOGIN</h1>
        <p>TODO: Form buraya gelecek</p>
      </div>
    </div>
  );
}

export default LoginForm;
