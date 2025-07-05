import React from "react";
import axios from "axios";

export const CurrentUserLoader = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    (async (): Promise<void> => {
      const response = await axios.get("/api/current-user");
      setUser(response.data);
    })();
  }, []);

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
