import React, { useState, useContext, useCallback, useEffect } from 'react';

import { AuthContext } from './../context/auth.context';
import { useHttp } from './../hooks/http.hook';

import { Loader } from './../components/Loader';
import { LinkList } from './../components/LinkList';

export const LinksPage = () => {
  const [links, setLinks] = useState([]);

  const {isLoading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const getLinks = useCallback(async () => {
    try {
      const fetched = await request(`/api/link`, 'GET', null, { Authorization: `Bearer ${token}`});
      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {!isLoading && <LinkList links={links} />}
    </>
  )
}