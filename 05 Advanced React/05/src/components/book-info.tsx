import React from "react";
import { useResource } from "./resource.hook";

export const BookInfo = ({ url }: { url: string }): JSX.Element => {
  const book = useResource(url) as Book;

  const { name, price, title, pages } = book || {};

  return book ? (
    <React.Fragment>
      <h3>{name}</h3>
      <p>{price}</p>
      <h3>Title: {title}</h3>
      <p>Number of Pages: {pages}</p>
    </React.Fragment>
  ) : (
    <h1>Loading</h1>
  );
};
