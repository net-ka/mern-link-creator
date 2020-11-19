import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { AuthContext } from './../context/auth.context';

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = e => {
    e.preventDefault();
    auth.signout();
    history.push('/');
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-3" style={{ padding: '0 10px' }}>
        <span className="brand-logo">Short Links Creator</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to='/create'>Create</NavLink></li>
          <li><NavLink to='/links'>Links</NavLink></li>
          <li><a href="/" onClick={handleLogout}>Log Out</a></li>
        </ul>
      </div>
    </nav>
  )
}