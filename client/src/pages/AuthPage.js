import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import { useHttp } from './../hooks/http.hook';
import { useMessage } from './../hooks/message.hook';

export const AuthPage = () => {
  const { isLoading, request, error, clearError } = useHttp();
  const message = useMessage();

  const auth = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSignUp = async () => {
    try {
      const { token, userId } = await request('/api/auth/register', 'POST', { ...form });
      auth.signin(token, userId);
    } catch (e) {}
  }

  const handleSignIn = async () => {
    try {
      const { token, userId } = await request('/api/auth/login', 'POST', { ...form });
      auth.signin(token, userId);
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Short links creator</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  name="email"
                  type="text"
                  className="yellow-input"
                  value={form.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  type="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="btn yellow darken-4"
              style={{ marginRight: 10}}
            >
              Log In
            </button>

            <button
              onClick={handleSignUp}
              disabled={isLoading}
              className="btn grey lighten-1 black-text"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}