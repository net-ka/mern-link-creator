import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttp } from './../hooks/http.hook';
import { AuthContext } from './../context/auth.context';

export const CreatePage = () => {
  const [link, setLink] = useState();
  const { request } = useHttp();

  const { token } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const handleKeyPress = async e => {
    if (e.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, { Authorization: `Bearer ${token}` });
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: 20 }}>
        <div className="input-field">
          <input
            placeholder="Insert a link"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <label htmlFor="link">Insert a link</label>
        </div>
      </div>
    </div>
  )
}