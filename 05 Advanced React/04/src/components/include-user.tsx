import React from "react";
import axios from "axios";

type UserComponentProps = {
  user: User;
};

export const includeUser = (Component: React.ComponentType<UserComponentProps>, userId: string) => {
  return (): JSX.Element => {
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
      (async (): Promise<void> => {
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
      })();
    }, []);

    return <React.Fragment>{user ? <Component user={user} /> : null}</React.Fragment>;
  };
};
