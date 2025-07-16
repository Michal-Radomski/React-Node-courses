import React from "react";

const ListHandler = (props: {
  items: Book[];
  keyExtractor: (arg0: Book) => number;
  renderItem: (item: Book, index: number) => JSX.Element;
}): JSX.Element => {
  const { items, keyExtractor, renderItem } = props;

  return (
    <React.Fragment>
      <div>
        {items.map((item: Book, index: number) => {
          return <div key={keyExtractor(item)}>{renderItem(item, index)}</div>;
        })}
      </div>
    </React.Fragment>
  );
};

export default ListHandler;
