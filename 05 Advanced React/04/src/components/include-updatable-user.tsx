import React from "react";
import axios from "axios";

type UserComponentProps = {
  user: User;
  updatableUser: { [key: string]: string | number };
  changeHandler: (updates: { [key: string]: string | number }) => void;
  userPostHandler: () => Promise<void>;
  resetUserHandler: () => void;
};

export const includeUpdatableUser = (Component: React.ComponentType<UserComponentProps>, userId: string) => {
  return () => {
    const [user, setUser] = React.useState<User | null>(null);
    const [updatableUser, setUpdatableUser] = React.useState<{ [key: string]: string | number } | null>(null);

    React.useEffect(() => {
      (async () => {
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
        setUpdatableUser(response.data);
      })();
    }, []);

    const userChangeHandler = (updates: { [key: string]: string | number }) => {
      setUpdatableUser({ ...updatableUser, ...updates });
    };

    const userPostHandler = async () => {
      const response = await axios.post(`/api/users/${userId}`, {
        user: updatableUser,
      });
      setUser(response.data);
      setUpdatableUser(response.data);
    };

    const resetUserHandler = () => {
      setUpdatableUser(user as unknown as { [key: string]: string | number });
    };

    return (
      <Component
        user={user as User}
        updatableUser={updatableUser as { [key: string]: string | number }}
        changeHandler={userChangeHandler}
        userPostHandler={userPostHandler}
        resetUserHandler={resetUserHandler}
      />
    );
  };
};
