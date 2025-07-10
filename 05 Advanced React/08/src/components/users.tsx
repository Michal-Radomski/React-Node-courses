import React, { useEffect } from "react";
import styled from "styled-components";

import { fetchUser } from "../api/userApi";
import LazyLoader from "./lazy-loader";
import { useApi } from "../api/hooks/useApi";

const useFetchUsers = () => {
  const {
    data: users,
    exec: initFetchUsers,
    status: fetchUsersStatus,
    isIdle: isFetchUsersStatusIdle,
    isPending: isFetchUsersStatusPending,
    isError: isFetchUsersStatusError,
    isSuccess: isFetchUsersStatusSuccess,
  } = useApi(() => fetchUser().then((response) => response.data));

  return {
    users,
    fetchUsersStatus,
    initFetchUsers,
    isFetchUsersStatusIdle,
    isFetchUsersStatusPending,
    isFetchUsersStatusError,
    isFetchUsersStatusSuccess,
  };
};

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 2xl;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const ContentContainer = styled.div`
  width: 50%;
`;

const UserName = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.h3`
  font-size: 1rem;
  color: #555555;
`;

const FetchButton = styled.button`
  margin-top: 1rem;
  background-color: #0053b3;
  color: #ffffff;
  padding: 1rem;
`;

function Users(): JSX.Element {
  const { users, initFetchUsers, isFetchUsersStatusIdle, isFetchUsersStatusPending, isFetchUsersStatusSuccess } =
    useFetchUsers();

  useEffect(() => {
    initFetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Container>
        <FetchButton onClick={initFetchUsers}>
          <LazyLoader show={isFetchUsersStatusPending} delay={500} default="Fetch Users" />
        </FetchButton>
        <FlexContainer>
          <ContentContainer>
            {isFetchUsersStatusIdle ? <p>Welcome</p> : null}
            {isFetchUsersStatusSuccess
              ? users.map((user: ObjectI, index: number) => (
                  <React.Fragment key={index}>
                    <UserName>{user.name as string}</UserName>
                    <UserEmail>{user.email as string}</UserEmail>
                  </React.Fragment>
                ))
              : null}
          </ContentContainer>
        </FlexContainer>
      </Container>
    </React.Fragment>
  );
}

export default Users;
