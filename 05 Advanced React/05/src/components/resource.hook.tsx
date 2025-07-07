import React from "react";
import axios from "axios";

export const useResource = (resourceUrl: string): Any => {
  const [resource, setResource] = React.useState<Any | null>(null);

  React.useEffect(() => {
    (async () => {
      const response = await axios.get(resourceUrl);
      setResource(response.data);
    })();
  }, [resourceUrl]);

  return resource as Any;
};
