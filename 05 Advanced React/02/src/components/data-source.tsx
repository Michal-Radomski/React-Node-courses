import React from "react";

interface DataSourceProps {
  getData: () => void; // function prop, optional with default
  resourceName: string; // required string prop
  children: React.ReactNode; // children prop, usually ReactNode
}

export const DataSource = ({ getData, resourceName, children }: DataSourceProps): JSX.Element => {
  const [resource, setResource] = React.useState<Any | null>(null);

  React.useEffect(() => {
    (async () => {
      const data = (await getData()) as unknown as Any;
      setResource(data);
    })();
  }, [getData]);

  return (
    <React.Fragment>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { [resourceName]: resource });
        }
        return child;
      })}
    </React.Fragment>
  );
};
