import React from "react";
import axios from "axios";

export const ResourceLoader = ({
  resourceUrl,
  resourceName,
  children,
}: {
  resourceUrl: string;
  resourceName: string;
  children: React.ReactNode;
}): JSX.Element => {
  const [resource, setResource] = React.useState<Any | null>(null);

  React.useEffect(() => {
    (async () => {
      const response = await axios.get(resourceUrl);
      setResource(response.data);
    })();
  }, [resourceUrl]);

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
