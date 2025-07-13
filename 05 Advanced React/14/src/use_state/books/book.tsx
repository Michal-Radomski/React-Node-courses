import React from "react";

import "./book.scss";

type BookProps = {
  title: string;
  author?: string;
};

const Book = ({ title, author }: BookProps): JSX.Element => {
  return (
    <React.Fragment>
      <article className="book">
        {title ? <p className="book-title">{title}</p> : null}
        {author ? <p className="book-author">{author}</p> : null}
      </article>
    </React.Fragment>
  );
};

export default Book;
