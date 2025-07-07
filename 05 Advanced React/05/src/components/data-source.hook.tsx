import React from "react";

export const useDataSource = (getData: () => Any): Any => {
  const [resource, setResource] = React.useState<Any | null>(null);

  React.useEffect(() => {
    (async () => {
      const data = await getData();
      setResource(data);
    })();
  }, [getData]);

  return resource as Any;
};
