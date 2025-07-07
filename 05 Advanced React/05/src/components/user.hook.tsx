import React from "react";
import axios from "axios";

export const useUser = (userId: string): User => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/users/${userId}`);
      setUser(response.data);
    })();
  }, [userId]);

  return user as User;
};
