import React from "react";
import axios from "axios";

type UserComponentProps = {
  user: User;
};

export const includeUpdatableUser = (Component: React.ComponentType<UserComponentProps>, userId: string) => {
  return () => {
    const [user, setUser] = React.useState<User | null>(null);
    const [updatableUser, setUpdatableUser] = React.useState<User | null>(null);

    React.useEffect(() => {
      (async () => {
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
        setUpdatableUser(response.data);
      })();
    }, []);

    const userChangeHandler = (updates: User) => {
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
      setUpdatableUser(user);
    };

    return (
      <Component
        user={user as User}
        updatableUser={updatableUser}
        changeHandler={userChangeHandler}
        userPostHandler={userPostHandler}
        resetUserHandler={resetUserHandler}
      />
    );
  };
};
