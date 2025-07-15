import React from "react";

const useStateObject = <T,>(initial: T) => {
  const [value, set] = React.useState(initial);

  return { value, set };
};

interface ProductListProps<T> {
  rows: T[];
  renderRow: (row: T) => React.ReactNode;
}

export const ProductList = <T,>(props: ProductListProps<T>): JSX.Element => {
  return (
    <ul>
      {props.rows.map((row: T, index: number) => (
        <React.Fragment key={index}>{props.renderRow(row)}</React.Fragment>
      ))}
    </ul>
  );
};

const products = [
  {
    id: 1,
    title: "product",
  },
];

const Exercises = (): JSX.Element => {
  const example = useStateObject<{ name: string }>({ name: "CodeLicks" });
  console.log({ example });

  return (
    <React.Fragment>
      <div>
        <ProductList rows={products} renderRow={(row) => <li>{row.title}</li>} />
        <ProductList
          rows={products}
          renderRow={(row) => {
            return <li>{row.id}</li>;
          }}
        ></ProductList>
      </div>
    </React.Fragment>
  );
};

export default Exercises;
