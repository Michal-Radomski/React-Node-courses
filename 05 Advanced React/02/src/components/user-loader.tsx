import React from "react";
import axios from "axios";

export const UserLoader = ({ userId, children }: { userId: string; children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    (async (): Promise<void> => {
      const response = await axios.get(`/api/users/${userId}`);
      setUser(response.data);
    })();
  }, [userId]);

  return (
    <React.Fragment>
      {user
        ? React.Children.map(children, (child) => {
            if (React.isValidElement<{ user: User }>(child)) {
              return React.cloneElement<{ user: User }>(child, { user });
            }
            return child;
          })
        : null}
    </React.Fragment>
  );
};
