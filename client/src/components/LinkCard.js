import React from 'react';

export const LinkCard = ({ link }) => {

  const { to, from, clicks, date } = link;

  return (
    <>
     <h2>Link</h2>
     <p>Your link: <a href={to} target="_blank" rel="noopener noreferrer">{to}</a></p>
     <p>Link from: <a href={from} target="_blank" rel="noopener noreferrer">{from}</a></p>
     <p>Clicks: {clicks}</p>
     <p>Clicks: {new Date(date).toLocaleDateString()}</p>
    </>
  )
}