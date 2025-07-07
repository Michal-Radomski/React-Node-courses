import React from "react";
import axios from "axios";

export const useCurrentUser = (): User => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    (async () => {
      const response = await axios.get("/api/current-user");
      setUser(response.data);
    })();
  }, []);

  return user as User;
};
