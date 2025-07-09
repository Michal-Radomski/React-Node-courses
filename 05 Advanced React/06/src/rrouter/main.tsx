import React from "react";
import { useLoaderData, Await } from "react-router";

import { MainContainer, MainHeading } from "./styled-elements";

const Main = (): JSX.Element => {
  const { promise } = useLoaderData() as { promise: unknown };

  return (
    <React.Fragment>
      <MainContainer>
        <MainHeading>
          Main -{" "}
          <React.Suspense fallback="Fetching...">
            <Await resolve={promise}>{(data) => <strong>{data}</strong>}</Await>
          </React.Suspense>
        </MainHeading>
      </MainContainer>
    </React.Fragment>
  );
};

export default Main;
