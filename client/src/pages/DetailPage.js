import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useHttp } from './../hooks/http.hook';
import { AuthContext } from './../context/auth.context';

import { Loader } from './../components/Loader';
import { LinkCard } from './../components/LinkCard';

export const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState(null);

  const { isLoading, request } = useHttp();

  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, { Authorization: `Bearer ${token}`});
      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {!isLoading && link && <LinkCard link={link} />}
    </>
  )
}