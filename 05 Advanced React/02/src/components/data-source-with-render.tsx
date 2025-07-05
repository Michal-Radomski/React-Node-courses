import React from "react";

export const DataSourceWithRenderProps = ({
  getData,
  render,
}: {
  getData: () => void;
  render: (data: User) => React.ReactNode;
}): React.ReactNode => {
  const [resource, setResource] = React.useState<User | null>(null);

  React.useEffect(() => {
    (async (): Promise<void> => {
      const data = await getData();
      setResource(data as unknown as User);
    })();
  }, [getData]);

  return render(resource as User);
};
